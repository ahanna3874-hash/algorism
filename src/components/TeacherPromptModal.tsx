import React, { useState } from 'react';
import { TEACHER_BUILD_PROMPT } from '../data/teacherPrompt';
import { Copy, Check, X, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

interface TeacherPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherPromptModal: React.FC<TeacherPromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEACHER_BUILD_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                AI Studio Build 전용 요청문 (Prompt)
              </h3>
              <p className="text-xs text-slate-500">
                새 프로젝트에 그대로 복사하여 붙여 넣을 수 있는 완성형 교육용 프롬프트입니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>학생 개인정보(PII) 미수집 원칙이 엄격히 반영된 안전한 수업용 명세서입니다.</span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-2xs shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>복사되었습니다!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>요청문 복사하기</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed max-h-[50vh]">
            <pre className="whitespace-pre-wrap">{TEACHER_BUILD_PROMPT}</pre>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-800 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> 교사 팁 (수업 활용 가이드):
            </strong>
            <p>
              • 크롬북 또는 태블릿 실습 환경에서 학생들에게 URL만 배포하면 즉시 실습을 진행할 수 있습니다.
            </p>
            <p>
              • 퀴즈 완료 후 발급되는 '탐구 인증서'를 캡처하여 구글 클래스룸 또는 패들렛 과제로 제출받으면 평가 기록이 편리합니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
