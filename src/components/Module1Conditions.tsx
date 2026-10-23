import React, { useState, useEffect } from 'react';
import { ALGORITHM_CONDITIONS, INSPECTION_CASES } from '../data/lessonData';
import {
  LogIn,
  LogOut,
  Compass,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

interface Module1Props {
  onComplete: () => void;
  onNextTab: () => void;
}

export const Module1Conditions: React.FC<Module1Props> = ({ onComplete, onNextTab }) => {
  const [selectedConditionId, setSelectedConditionId] = useState<string>('definiteness');

  // Inspection mini-game states
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [inspectionScore, setInspectionScore] = useState<number>(0);

  // Infinite loop simulator states
  const [hasExitCondition, setHasExitCondition] = useState<boolean>(true);
  const [loopCount, setLoopCount] = useState<number>(0);
  const [isLoopRunning, setIsLoopRunning] = useState<boolean>(false);
  const [loopTerminated, setLoopTerminated] = useState<boolean>(false);

  const icons: Record<string, React.ReactNode> = {
    LogIn: <LogIn className="w-5 h-5" />,
    LogOut: <LogOut className="w-5 h-5" />,
    Compass: <Compass className="w-5 h-5" />,
    Clock: <Clock className="w-5 h-5" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
  };

  const currentCase = INSPECTION_CASES[currentCaseIndex];
  const isCaseAnswered = userAnswers[currentCase.id] !== undefined;

  const handleSelectAnswer = (conditionName: string) => {
    if (isCaseAnswered) return;
    const isCorrect = conditionName === currentCase.violatedCondition;
    setUserAnswers((prev) => ({ ...prev, [currentCase.id]: conditionName }));
    setShowExplanation(true);
    if (isCorrect) {
      setInspectionScore((prev) => prev + 1);
    }

    // Check if finished all
    if (Object.keys(userAnswers).length + 1 >= INSPECTION_CASES.length) {
      onComplete();
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < INSPECTION_CASES.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex((prev) => prev - 1);
      setShowExplanation(true);
    }
  };

  // Loop simulation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoopRunning) {
      timer = setInterval(() => {
        setLoopCount((prev) => {
          if (hasExitCondition && prev >= 5) {
            setIsLoopRunning(false);
            setLoopTerminated(true);
            return prev;
          }
          if (!hasExitCondition && prev >= 30) {
            // Safety cap for browser UI
            setIsLoopRunning(false);
            setLoopTerminated(false);
            return prev;
          }
          return prev + 1;
        });
      }, 180);
    }
    return () => clearInterval(timer);
  }, [isLoopRunning, hasExitCondition]);

  const startLoopSimulation = () => {
    setLoopCount(0);
    setLoopTerminated(false);
    setIsLoopRunning(true);
  };

  const resetLoopSimulation = () => {
    setIsLoopRunning(false);
    setLoopCount(0);
    setLoopTerminated(false);
  };

  const activeCondition = ALGORITHM_CONDITIONS.find((c) => c.id === selectedConditionId)!;

  return (
    <div className="space-y-8 pb-12">
      {/* Intro Hero Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
            1단계 · 기초 개념 탐구
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            알고리즘의 개념과 5대 조건
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            알고리즘(Algorithm)이란 <strong>어떤 문제를 해결하거나 목표를 달성하기 위해 잘 정의된 일련의 절차와 단계</strong>를 뜻합니다.
            컴퓨터가 올바르게 실행하려면 반드시 <strong>입력, 출력, 명확성, 유한성, 수행 가능성</strong>이라는 5가지 조건을 만족해야 합니다.
          </p>
        </div>

        {/* 5 Conditions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
          {ALGORITHM_CONDITIONS.map((cond) => {
            const isSelected = selectedConditionId === cond.id;
            return (
              <button
                key={cond.id}
                onClick={() => setSelectedConditionId(cond.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 shadow-xs ring-2 ring-indigo-200'
                    : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {icons[cond.iconName]}
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-slate-900 text-base">{cond.name}</h3>
                  <span className="text-xs text-slate-600 font-mono">{cond.english}</span>
                </div>
                <p className="text-xs text-slate-700 mt-1.5 leading-snug">{cond.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Condition Detail Box */}
        <div className="mt-5 p-5 bg-indigo-50/60 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="font-bold text-indigo-900 text-base">
              {activeCondition.name} ({activeCondition.english}) 자세히 알아보기
            </h4>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            {activeCondition.explanation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold mb-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>좋은 예시 (올바른 알고리즘)</span>
              </div>
              <p className="text-emerald-950">{activeCondition.goodExample}</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-rose-800 font-semibold mb-1">
                <X className="w-4 h-4 text-rose-600" />
                <span>위배된 예시 (잘못된 알고리즘)</span>
              </div>
              <p className="text-rose-950">{activeCondition.badExample}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity 1: Algorithm Inspector Game */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-amber-600 tracking-wider uppercase">
              실습 활동 1 · 판별 게임
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              알고리즘 감별소: 어떤 조건이 빠졌을까요?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              제시된 상황을 읽고 위배된 알고리즘의 조건을 찾아보세요.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700">
            <span>진행 상황:</span>
            <span className="font-bold text-indigo-600">
              {currentCaseIndex + 1} / {INSPECTION_CASES.length}
            </span>
            <span className="text-slate-300">|</span>
            <span>정답: {inspectionScore}개</span>
          </div>
        </div>

        {/* Current Case Presentation */}
        <div className="mt-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
              상황 #{currentCase.id}: {currentCase.situation}
            </span>
            <blockquote className="text-base sm:text-lg font-medium text-slate-800 mt-3 p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs">
              "{currentCase.description}"
            </blockquote>
          </div>

          {/* Option buttons */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-slate-700 mb-2">
              👉 이 명령어는 어떤 조건을 위배했나요? (하나를 선택하세요)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {(['입력', '출력', '명확성', '유한성', '수행가능성', '적합'] as const).map((opt) => {
                const isSelected = userAnswers[currentCase.id] === opt;
                const isCorrect = currentCase.violatedCondition === opt;
                let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                if (isCaseAnswered) {
                  if (isSelected && isCorrect) {
                    btnStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold ring-2 ring-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-600 border-rose-600 text-white font-bold';
                  } else if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200 bg-slate-100 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isCaseAnswered}
                    className={`p-3 rounded-lg border text-xs sm:text-sm transition-all text-center ${btnStyle}`}
                  >
                    {opt === '적합' ? '조건 모두 만족 (적합)' : `${opt} 위반`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Teacher Note */}
          {showExplanation && (
            <div
              className={`mt-4 p-4 rounded-xl border text-sm leading-relaxed ${
                userAnswers[currentCase.id] === currentCase.violatedCondition
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {userAnswers[currentCase.id] === currentCase.violatedCondition ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>정답입니다! 훌륭해요.</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>
                      아쉬워요! 정답은 [{currentCase.violatedCondition === '적합' ? '조건 모두 만족' : `${currentCase.violatedCondition} 위반`}] 입니다.
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1">{currentCase.explanation}</p>
            </div>
          )}

          {/* Navigation between cases */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={handlePrevCase}
              disabled={currentCaseIndex === 0}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
            >
              이전 문제
            </button>
            {currentCaseIndex < INSPECTION_CASES.length - 1 ? (
              <button
                onClick={handleNextCase}
                disabled={!isCaseAnswered}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <span>다음 문제 풀기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded">
                판별 활동을 모두 완료했습니다!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Activity 2: Infinite Loop Sandbox */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-rose-600 tracking-wider uppercase">
            실습 활동 2 · 시뮬레이터
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            유한성(Finiteness) 체감기: 무한 루프 탈출 실험
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            알고리즘은 언제나 언젠가 끝나는 '탈출 조건'이 있어야 합니다. 종료 조건이 없으면 컴퓨터는 멈추지 않습니다!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Controls & Code logic */}
          <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-xs">
              <span>virtual_program.py</span>
              <span className="text-indigo-400 font-sans">반복 실행 로직</span>
            </div>
            <pre className="mt-3 leading-relaxed">
{`count = 0
while True:
    count = count + 1
    print("현재 작업 횟수:", count)`}
              {hasExitCondition ? (
                <span className="text-emerald-400 font-bold block mt-1">
{`    if count >= 5:
        print("✅ 탈출 조건 만족! 프로그램 종료")
        break`}
                </span>
              ) : (
                <span className="text-rose-400 font-bold block mt-1">
{`    # ⚠️ 탈출 조건이 없음! (무한 반복)`}
                </span>
              )}
            </pre>

            {/* Toggle Switch */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-sans">
              <span className="text-xs text-slate-300">탈출 조건(count &gt;= 5 종료) 장착:</span>
              <button
                onClick={() => {
                  setHasExitCondition(!hasExitCondition);
                  resetLoopSimulation();
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  hasExitCondition ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    hasExitCondition ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Live Execution Screen */}
          <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">컴퓨터 실행 화면</span>
                {isLoopRunning && (
                  <span className="text-xs font-bold text-indigo-600 animate-pulse">
                    동작 중 (연산 수행 중...)
                  </span>
                )}
              </div>

              {/* Gauge and Counter */}
              <div className="mt-4 p-5 bg-white border border-slate-200 rounded-xl text-center">
                <span className="text-xs text-slate-500">현재 반복 실행 카운트</span>
                <div
                  className={`text-4xl font-extrabold font-mono mt-1 ${
                    loopCount >= 20 && !hasExitCondition
                      ? 'text-rose-600 animate-bounce'
                      : 'text-indigo-600'
                  }`}
                >
                  {loopCount}
                </div>

                {loopTerminated && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>유한성 충족: 5단계에서 안전하게 종료됨!</span>
                  </div>
                )}

                {!hasExitCondition && loopCount >= 30 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 text-xs font-semibold rounded-full">
                    <AlertTriangle className="w-4 h-4" />
                    <span>경고: 무한 루프 발생! (브라우저 과열 방지 강제 정지)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-6">
              <button
                onClick={startLoopSimulation}
                disabled={isLoopRunning}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>프로그램 실행해 보기</span>
              </button>
              <button
                onClick={resetLoopSimulation}
                className="px-3 py-2.5 text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-lg text-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer next button */}
      <div className="flex justify-end">
        <button
          onClick={onNextTab}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
        >
          <span>2단계: 알고리즘 표현 방법과 순서도로 이동</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
