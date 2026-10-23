import React from 'react';
import { TabId } from '../types';
import { Compass, BookOpen, GitFork, Award, ShieldCheck, FileText, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  progressPercent: number;
  onReset: () => void;
  onOpenPromptModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progressPercent,
  onReset,
  onOpenPromptModal,
}) => {
  const tabs = [
    { id: 'conditions' as TabId, label: '1. 알고리즘 5대 조건', icon: Compass },
    { id: 'representations' as TabId, label: '2. 표현 방법 & 순서도', icon: BookOpen },
    { id: 'structures' as TabId, label: '3. 3대 제어 구조', icon: GitFork },
    { id: 'quiz' as TabId, label: '4. 퀴즈 & 탐구 인증서', icon: Award },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar info line */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs">
              중학교 정보과 수업 실습도구
            </span>
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>학생 개인정보 안심 (서버 저장 없음 · 익명 진행)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPromptModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              title="AI Studio Build에 사용할 수 있는 완성형 요청문 보기"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>교사용 Build 요청문 보기 / 복사</span>
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-slate-800 rounded transition-colors"
              title="진행 상태 초기화"
            >
              <RotateCcw className="w-3 h-3" />
              <span>학습 초기화</span>
            </button>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                알고리즘 탐구실 <span className="text-sm font-normal text-slate-500">Algorithm Lab</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                조건(Condition) · 표현(Representation) · 구조(Control Structure)
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Learning Progress Bar */}
        <div className="pb-2">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>나의 학습 진도율</span>
            <span className="font-semibold text-indigo-600">{progressPercent}% 완료</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
