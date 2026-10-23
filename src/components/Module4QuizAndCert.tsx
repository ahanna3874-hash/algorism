import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/lessonData';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Printer,
  ShieldCheck,
  Sparkles,
  Medal,
  Share2,
} from 'lucide-react';

interface Module4Props {
  onComplete: () => void;
}

export const Module4QuizAndCert: React.FC<Module4Props> = ({ onComplete }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [studentNickname, setStudentNickname] = useState<string>('정보 탐구자');

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const toggleHint = (questionId: number) => {
    setShowHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Calculate score
  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => userAnswers[q.id] === q.correctAnswerIndex
  ).length;
  const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);
    onComplete();
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowHints({});
    setIsQuizSubmitted(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDateStr = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="space-y-8 pb-16">
      {/* Quiz Introduction */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs print:hidden">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
            4단계 · 형성평가 & 학습 확인
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            알고리즘 마스터 도전 퀴즈 & 탐구 인증서
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            1단계(조건), 2단계(표현 방법), 3단계(제어 구조)에서 탐구한 핵심 내용을 확인하는 5문항 퀴즈입니다.
            퀴즈를 완료하면 교사 제출용 <strong>알고리즘 탐구 인증서</strong>가 발급됩니다.
          </p>
        </div>

        {/* Safe Privacy notice */}
        <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>개인정보 안심 안내:</strong> 본 테스트는 로그인이나 개인정보를 서버에 저장하지 않습니다.
            원하는 별명(닉네임)을 적고 인증서를 캡처하여 과제로 제출하세요!
          </span>
        </div>
      </div>

      {/* 5 Questions Section */}
      <div className="space-y-4 print:hidden">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const isCorrect = userAnswers[q.id] === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                isQuizSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded">
                      {q.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                      {q.question}
                    </h3>
                  </div>
                </div>

                {isQuizSubmitted && (
                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 정답
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> 오답
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[q.id] === optIdx;
                  let optStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                  if (isQuizSubmitted) {
                    if (optIdx === q.correctAnswerIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                    } else {
                      optStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-200';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isQuizSubmitted}
                      className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all ${optStyle}`}
                    >
                      <span className="font-semibold text-slate-600 mr-2">
                        {optIdx + 1}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Hint toggle & Explanation */}
              <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <button
                  onClick={() => toggleHint(q.id)}
                  className="text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHints[q.id] ? '힌트 닫기' : '힌트 보기'}</span>
                </button>
                {isQuizSubmitted && (
                  <span className="text-slate-700 text-xs">{q.explanation}</span>
                )}
              </div>

              {showHints[q.id] && (
                <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                  💡 <strong>힌트:</strong> {q.hint}
                </div>
              )}
            </div>
          );
        })}

        {/* Submit Bar */}
        {!isQuizSubmitted ? (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              {allAnswered
                ? '모든 문항에 답변했습니다! 이제 제출하여 채점 결과를 확인하세요.'
                : `현재 ${Object.keys(userAnswers).length} / ${QUIZ_QUESTIONS.length} 문항에 응답했습니다.`}
            </span>
            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 disabled:opacity-40 transition-colors shadow-xs"
            >
              퀴즈 제출 및 인증서 발급받기
            </button>
          </div>
        ) : (
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 flex items-center justify-between">
            <span className="text-sm font-bold text-indigo-950">
              총 5문제 중 {correctCount}문제를 맞혀 {score}점을 획득했습니다!
            </span>
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              <RotateCcw className="w-3 h-3" />
              <span>퀴즈 다시 풀기</span>
            </button>
          </div>
        )}
      </div>

      {/* Certificate Section (Shown when submitted) */}
      {isQuizSubmitted && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-indigo-500/80 shadow-lg relative overflow-hidden">
          {/* Subtle Decorative Pattern */}
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-indigo-100/50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-44 h-44 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />

          {/* Certificate Inner Frame */}
          <div className="border border-indigo-200 rounded-2xl p-6 sm:p-8 relative bg-linear-to-b from-white to-slate-50/50 text-center">
            {/* Header Badge */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md mb-4">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold tracking-widest text-indigo-700 uppercase">
              CERTIFICATE OF COMPLETION
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              알고리즘 마스터 탐구 인증서
            </h3>

            {/* Student Nickname Input (No personal data, purely display) */}
            <div className="my-6 max-w-sm mx-auto">
              <label className="text-xs text-slate-600 block mb-1">
                인증서에 표기할 이름 / 닉네임 (자유롭게 입력):
              </label>
              <input
                type="text"
                value={studentNickname}
                onChange={(e) => setStudentNickname(e.target.value)}
                maxLength={20}
                className="w-full text-center text-lg sm:text-xl font-bold text-indigo-900 border-b-2 border-indigo-500 focus:outline-hidden bg-transparent py-1"
                placeholder="예: 2학년 3반 정보왕"
              />
            </div>

            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              위 학생은 중학교 정보 교육과정 <strong>[문제 해결과 프로그래밍]</strong> 단원의
              알고리즘 5대 조건, 표현 방법(순서도), 3대 제어 구조(순차·선택·반복) 탐구 과정을
              성실히 이수하였음을 증명합니다.
            </p>

            {/* Badges Earned */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 max-w-lg mx-auto text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-indigo-600 font-bold block">5대 조건 탐구</span>
                <span className="text-slate-600">입력·출력·명확·유한·수행</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-amber-600 font-bold block">표현 방법 마스터</span>
                <span className="text-slate-600">자연어·순서도·의사·블록</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-emerald-600 font-bold block">3대 제어 구조</span>
                <span className="text-slate-600">순차·선택·반복 시뮬레이션</span>
              </div>
            </div>

            {/* Score & Issue Details */}
            <div className="flex flex-col sm:flex-row items-center justify-around py-4 border-t border-b border-indigo-100 max-w-md mx-auto text-xs sm:text-sm text-slate-600 gap-2">
              <div>
                <span>평가 점수: </span>
                <strong className="text-indigo-600 text-base">{score}점</strong>
              </div>
              <div className="hidden sm:block text-slate-300">|</div>
              <div>
                <span>발급 일자: </span>
                <strong>{currentDateStr}</strong>
              </div>
            </div>

            {/* Sign and Seal */}
            <div className="mt-6 flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold">
              <Medal className="w-5 h-5 text-indigo-600" />
              <span>알고리즘 탐구실 (Algorithm Lab) 교육팀</span>
            </div>
          </div>

          {/* Action buttons (Print / Save) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>인증서 인쇄 또는 PDF로 저장</span>
            </button>
            <div className="text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
              📸 <strong>과제 제출 팁:</strong> 이 화면을 캡처하여 구글 클래스룸이나 패들렛에 업로드하세요!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
