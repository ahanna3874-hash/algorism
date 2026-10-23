/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabId } from './types';
import { Navbar } from './components/Navbar';
import { Module1Conditions } from './components/Module1Conditions';
import { Module2Representations } from './components/Module2Representations';
import { Module3Structures } from './components/Module3Structures';
import { Module4QuizAndCert } from './components/Module4QuizAndCert';
import { TeacherPromptModal } from './components/TeacherPromptModal';
import { FileText, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('conditions');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);

  // Completion statuses
  const [completedModules, setCompletedModules] = useState<{
    conditions: boolean;
    representations: boolean;
    structures: boolean;
    quiz: boolean;
  }>(() => {
    try {
      const saved = localStorage.getItem('algorithm_lab_completed');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      conditions: false,
      representations: false,
      structures: false,
      quiz: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('algorithm_lab_completed', JSON.stringify(completedModules));
    } catch {
      // ignore
    }
  }, [completedModules]);

  const markModuleComplete = (key: keyof typeof completedModules) => {
    setCompletedModules((prev) => ({ ...prev, [key]: true }));
  };

  const handleReset = () => {
    if (window.confirm('학습 진도와 퀴즈 기록을 초기화하시겠습니까?')) {
      const resetState = {
        conditions: false,
        representations: false,
        structures: false,
        quiz: false,
      };
      setCompletedModules(resetState);
      localStorage.removeItem('algorithm_lab_completed');
      setActiveTab('conditions');
    }
  };

  const completedCount = Object.values(completedModules).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 4) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progressPercent={progressPercent}
        onReset={handleReset}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Module Render */}
        {activeTab === 'conditions' && (
          <Module1Conditions
            onComplete={() => markModuleComplete('conditions')}
            onNextTab={() => setActiveTab('representations')}
          />
        )}

        {activeTab === 'representations' && (
          <Module2Representations
            onComplete={() => markModuleComplete('representations')}
            onNextTab={() => setActiveTab('structures')}
          />
        )}

        {activeTab === 'structures' && (
          <Module3Structures
            onComplete={() => markModuleComplete('structures')}
            onNextTab={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'quiz' && (
          <Module4QuizAndCert
            onComplete={() => markModuleComplete('quiz')}
          />
        )}
      </main>

      {/* Bottom Footer (Discreet, Anti-slop) */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">알고리즘 탐구실 (Algorithm Lab)</span>
            <span>·</span>
            <span>중학교 정보과 2022 개정 교육과정 연계</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPromptModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-medium underline"
            >
              Build 요청문(프롬프트) 원문 보기
            </button>
            <div className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>학생 개인정보 100% 미수집 보호</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Teacher Prompt Modal */}
      <TeacherPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
