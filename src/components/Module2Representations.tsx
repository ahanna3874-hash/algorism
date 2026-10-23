import React, { useState } from 'react';
import { FLOWCHART_SYMBOLS, COMPARISON_EXAMPLES } from '../data/lessonData';
import {
  FileText,
  GitBranch,
  Code2,
  Boxes,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface Module2Props {
  onComplete: () => void;
  onNextTab: () => void;
}

export const Module2Representations: React.FC<Module2Props> = ({ onComplete, onNextTab }) => {
  // Method representation tab
  const [selectedRepType, setSelectedRepType] = useState<'natural' | 'flowchart' | 'pseudocode' | 'block'>('flowchart');
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);

  // Flowchart interactive stepper
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Symbol quiz state
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('terminal');
  const [symbolAnswers, setSymbolAnswers] = useState<Record<string, string>>({});

  const example = COMPARISON_EXAMPLES[selectedExampleIndex];

  const handleNextStep = () => {
    if (currentStepIndex < example.flowchartSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setCurrentStepIndex(0);
    }
  };

  const handleSymbolQuiz = (symbolId: string, answer: string) => {
    if (symbolAnswers[symbolId]) return;
    setSymbolAnswers((prev) => ({ ...prev, [symbolId]: answer }));
    if (answer === FLOWCHART_SYMBOLS.find((s) => s.id === symbolId)?.meaning) {
      setQuizScore((prev) => prev + 1);
    }
    if (Object.keys(symbolAnswers).length + 1 >= FLOWCHART_SYMBOLS.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
            2단계 · 표현 방법 탐구
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            알고리즘의 4가지 표현 방법과 순서도
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            알고리즘은 문제의 성격과 대상(사람 또는 컴퓨터)에 따라 <strong>자연어, 순서도, 의사코드, 프로그래밍 언어(블록/텍스트)</strong>로 표현할 수 있습니다.
            각 표현 방식의 특징을 알아보고, 정보 수업에서 가장 널리 쓰이는 <strong>순서도(Flowchart)</strong>를 완벽히 익혀봅시다.
          </p>
        </div>

        {/* 4 Methods Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">1. 자연어 (Natural)</h4>
            <p className="text-xs text-slate-600 mt-1">
              우리가 일상에서 쓰는 말과 글로 표현. 누구나 쉽게 이해하지만 의미가 모호해질 수 있음.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/70">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-2">
              <GitBranch className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-indigo-900 text-sm">2. 순서도 (Flowchart)</h4>
            <p className="text-xs text-indigo-950 mt-1">
              약속된 기호와 화살표로 시각화. 명령의 흐름과 분기를 한눈에 직관적으로 파악 가능.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">3. 의사코드 (Pseudocode)</h4>
            <p className="text-xs text-slate-600 mt-1">
              실제 프로그래밍 언어의 문법 구조를 흉내 내어 사람이 읽기 쉽게 정리한 모의 코드.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
              <Boxes className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">4. 블록 / 프로그래밍</h4>
            <p className="text-xs text-slate-600 mt-1">
              엔트리, 스크래치, 파이썬 등 컴퓨터가 직접 번역하여 실행할 수 있는 최종 소프트웨어 형태.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Multi-View Comparison Viewer */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
              실습 활동 1 · 표현 방식 비교기
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              하나의 알고리즘, 네 가지 표현 방식 비교
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              상황 예시를 고른 후 상단 탭을 눌러 같은 논리가 어떻게 표현되는지 비교해 보세요.
            </p>
          </div>

          {/* Example selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {COMPARISON_EXAMPLES.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExampleIndex(idx);
                  setCurrentStepIndex(0);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedExampleIndex === idx
                    ? 'bg-white text-indigo-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                예시 {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Example Title */}
        <div className="mt-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h4 className="font-bold text-slate-800 text-base">{example.title}</h4>
        </div>

        {/* Representation Tabs */}
        <div className="mt-4 flex items-center gap-1 border-b border-slate-200">
          <button
            onClick={() => setSelectedRepType('flowchart')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              selectedRepType === 'flowchart'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>순서도 (Flowchart)</span>
          </button>
          <button
            onClick={() => setSelectedRepType('natural')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              selectedRepType === 'natural'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>자연어 (일상 표현)</span>
          </button>
          <button
            onClick={() => setSelectedRepType('pseudocode')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              selectedRepType === 'pseudocode'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>의사코드 (Pseudocode)</span>
          </button>
          <button
            onClick={() => setSelectedRepType('block')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              selectedRepType === 'block'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>블록 코드 (엔트리/스크래치 형태)</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-4">
          {selectedRepType === 'natural' && (
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase">자연어 설명문</span>
              <pre className="mt-2 text-sm text-slate-800 font-sans leading-relaxed whitespace-pre-wrap">
                {example.natural}
              </pre>
              <div className="mt-4 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                💡 <strong>교사의 팁:</strong> 누구나 쉽게 읽을 수 있지만, 문장이 길어지면 어떤 명령이 먼저 실행되는지 혼동이 올 수 있습니다.
              </div>
            </div>
          )}

          {selectedRepType === 'flowchart' && (
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold text-indigo-700">
                  인터랙티브 순서도 시뮬레이터 (단계별 진행)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-xs"
                  >
                    <span>다음 단계 실행 ({currentStepIndex + 1}/{example.flowchartSteps.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentStepIndex(0)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg text-xs"
                    title="처음으로"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Vertical Flowchart Steps */}
              <div className="flex flex-col items-center gap-2 max-w-md mx-auto py-4">
                {example.flowchartSteps.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  const isPassed = idx < currentStepIndex;

                  let shapeClass = '';
                  let labelType = '';

                  if (step.type === 'terminal') {
                    shapeClass = 'rounded-full px-6 py-2.5';
                    labelType = '단말 (시작/끝)';
                  } else if (step.type === 'decision') {
                    shapeClass = 'transform rotate-45 w-28 h-28 flex items-center justify-center p-2';
                    labelType = '판단 (조건식)';
                  } else if (step.type === 'io') {
                    shapeClass = 'skew-x-[-12deg] rounded-md px-5 py-2.5';
                    labelType = '입출력';
                  } else {
                    shapeClass = 'rounded-md px-5 py-2.5';
                    labelType = '처리 (연산)';
                  }

                  return (
                    <React.Fragment key={step.id}>
                      {idx > 0 && (
                        <div className="flex flex-col items-center text-slate-300">
                          <div className={`w-0.5 h-4 ${isPassed ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                          <div
                            className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                              isPassed ? 'border-t-indigo-600' : 'border-t-slate-300'
                            }`}
                          />
                        </div>
                      )}

                      <div
                        className={`transition-all duration-300 text-center flex flex-col items-center justify-center ${
                          step.type === 'decision' ? 'my-2' : ''
                        }`}
                      >
                        <div
                          className={`text-xs sm:text-sm font-semibold transition-all border ${shapeClass} ${
                            isCurrent
                              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md scale-105 ring-4 ring-indigo-200'
                              : isPassed
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                              : 'bg-white border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className={step.type === 'decision' ? '-rotate-45' : ''}>
                            {step.type === 'io' ? (
                              <span className="inline-block skew-x-[12deg]">{step.text}</span>
                            ) : (
                              <span>{step.text}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 font-mono">
                          {labelType}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {selectedRepType === 'pseudocode' && (
            <div className="p-5 bg-slate-900 rounded-xl text-slate-200 font-mono text-xs sm:text-sm">
              <span className="text-xs text-indigo-400 font-sans block mb-2 font-semibold">
                의사코드 (프로그래밍 언어의 구조적 표현)
              </span>
              <pre className="leading-relaxed whitespace-pre-wrap">{example.pseudocode}</pre>
            </div>
          )}

          {selectedRepType === 'block' && (
            <div className="p-5 bg-amber-50/50 border border-amber-200 rounded-xl">
              <span className="text-xs font-semibold text-amber-800 uppercase block mb-3">
                블록 코딩 (블록 쌓기 형태)
              </span>
              <div className="space-y-2 max-w-md">
                {example.blockCode.split('\n').map((line, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-amber-500 text-white font-mono text-xs font-bold rounded-lg shadow-xs border-l-4 border-amber-700"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Symbol Quiz & Mastery Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
              실습 활동 2 · 기호 마스터
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              순서도 필수 기호 4종 매칭 퀴즈
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              순서도 기호의 생김새와 각각의 역할을 정확히 연결해 보세요.
            </p>
          </div>
          <div className="text-xs font-medium bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg">
            맞힌 기호: {quizScore} / {FLOWCHART_SYMBOLS.length}
          </div>
        </div>

        {/* 4 Symbols Interactive Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {FLOWCHART_SYMBOLS.map((sym) => {
            const hasAnswered = symbolAnswers[sym.id] !== undefined;
            const isCorrect = symbolAnswers[sym.id] === sym.meaning;

            return (
              <div
                key={sym.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-900 text-sm">{sym.shapeName}</span>
                    {hasAnswered && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold ${
                          isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {isCorrect ? '정답' : '오답'}
                      </span>
                    )}
                  </div>

                  {/* SVG Shape Graphic */}
                  <div className="h-16 flex items-center justify-center bg-white rounded-lg border border-slate-200 p-2 my-2">
                    {sym.svgShape === 'oval' && (
                      <div className="w-32 h-10 border-2 border-indigo-600 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-semibold text-indigo-700">
                        단말 기호
                      </div>
                    )}
                    {sym.svgShape === 'rect' && (
                      <div className="w-32 h-10 border-2 border-indigo-600 rounded-md bg-indigo-50 flex items-center justify-center text-xs font-semibold text-indigo-700">
                        처리 기호
                      </div>
                    )}
                    {sym.svgShape === 'rhombus' && (
                      <div className="w-12 h-12 border-2 border-indigo-600 bg-indigo-50 rotate-45 flex items-center justify-center text-[10px] font-semibold text-indigo-700">
                        <span className="-rotate-45">판단</span>
                      </div>
                    )}
                    {sym.svgShape === 'parallelogram' && (
                      <div className="w-32 h-10 border-2 border-indigo-600 bg-indigo-50 -skew-x-12 flex items-center justify-center text-xs font-semibold text-indigo-700">
                        <span className="skew-x-12">입출력 기호</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2">{sym.role}</p>
                </div>

                {/* Options selector */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
                    이 기호의 의미는 무엇일까요?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['시작 및 종료', '연산 및 명령 처리', '조건 비교 및 분기', '자료의 입력과 출력'].map(
                      (choice) => (
                        <button
                          key={choice}
                          onClick={() => handleSymbolQuiz(sym.id, choice)}
                          disabled={hasAnswered}
                          className={`text-xs p-2 rounded-lg border text-left transition-all ${
                            hasAnswered
                              ? choice === sym.meaning
                                ? 'bg-emerald-600 text-white font-bold border-emerald-600'
                                : symbolAnswers[sym.id] === choice
                                ? 'bg-rose-500 text-white border-rose-500'
                                : 'bg-slate-100 text-slate-400 border-slate-200 opacity-50'
                              : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {choice}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer next button */}
      <div className="flex justify-end">
        <button
          onClick={onNextTab}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
        >
          <span>3단계: 알고리즘 3대 제어 구조 시뮬레이터로 이동</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
