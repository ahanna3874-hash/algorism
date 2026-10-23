import React, { useState, useEffect, useRef } from 'react';
import {
  GitCommit,
  GitFork,
  Repeat,
  Play,
  Pause,
  RotateCcw,
  StepForward,
  CheckCircle2,
  Sparkles,
  Bot,
  Flame,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface Module3Props {
  onComplete: () => void;
  onNextTab: () => void;
}

type Direction = 'up' | 'down' | 'left' | 'right';

interface Position {
  x: number;
  y: number;
}

interface RobotState {
  x: number;
  y: number;
  dir: Direction;
}

type MissionType = 'sequence' | 'selection' | 'iteration';

export const Module3Structures: React.FC<Module3Props> = ({ onComplete, onNextTab }) => {
  const [activeMission, setActiveMission] = useState<MissionType>('sequence');

  // Simulation State
  const [robot, setRobot] = useState<RobotState>({ x: 0, y: 2, dir: 'right' });
  const [dusts, setDusts] = useState<Position[]>([]);
  const [walls, setWalls] = useState<Position[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [speedMs, setSpeedMs] = useState<number>(650);

  // Completed missions tracker
  const [completedMissions, setCompletedMissions] = useState<Record<MissionType, boolean>>({
    sequence: false,
    selection: false,
    iteration: false,
  });

  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Setup mission environment
  const setupMission = (type: MissionType) => {
    setIsPlaying(false);
    setIsFinished(false);
    setCurrentLineIndex(-1);

    if (type === 'sequence') {
      setRobot({ x: 0, y: 2, dir: 'right' });
      setDusts([{ x: 3, y: 2 }]);
      setWalls([]);
      setLogs(['[순차 구조 준비 완료] 명령어가 위에서 아래로 차례차례 1회씩 실행됩니다.']);
    } else if (type === 'selection') {
      setRobot({ x: 1, y: 2, dir: 'right' });
      // Wall directly in front at (2, 2)
      setWalls([{ x: 2, y: 2 }]);
      setDusts([{ x: 1, y: 3 }]);
      setLogs(['[선택 구조 준비 완료] 만약(if) 전방에 벽이 있으면 회전하고, 없으면 직진합니다.']);
    } else if (type === 'iteration') {
      setRobot({ x: 0, y: 2, dir: 'right' });
      // 4 dusts in a row
      setDusts([
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
      ]);
      setWalls([]);
      setLogs(['[반복 구조 준비 완료] 먼지 4개를 수거하기 위해 "4회 반복하기" 루프를 실행합니다.']);
    }
  };

  useEffect(() => {
    setupMission(activeMission);
  }, [activeMission]);

  // Code scripts for each mission
  const missionCodes: Record<MissionType, { title: string; lines: string[]; explanation: string }> = {
    sequence: {
      title: '순차 구조 (Sequence)',
      lines: [
        '1. 앞으로 1칸 이동()',
        '2. 앞으로 1칸 이동()',
        '3. 앞으로 1칸 이동()',
        '4. 먼지 흡입_청소()',
        '5. 작업 완료_종료()',
      ],
      explanation: '명령어가 작성된 순서대로 위에서 아래로 차례대로 하나씩 빠짐없이 실행됩니다.',
    },
    selection: {
      title: '선택 구조 (Selection)',
      lines: [
        '1. 전방_센서_감지()',
        '2. 만약 (앞에_벽이_있는가? == 참) 이면:',
        '3.     우측(아래쪽)으로_회전_및_1칸_이동()',
        '4. 그렇지_않으면:',
        '5.     앞으로_직진_1칸()',
        '6. 바닥 먼지_청소() 및 종료',
      ],
      explanation: '조건(앞에 벽이 있는가?)을 검사하여 참이면 회전 경로를, 거짓이면 직진 경로를 선택합니다.',
    },
    iteration: {
      title: '반복 구조 (Iteration)',
      lines: [
        '1. 반복문 시작: 4회 반복하기 (i = 1 부터 4 까지)',
        '2.     [반복 실행] 앞으로 1칸 전진()',
        '3.     [반복 실행] 현재 위치 먼지 흡입()',
        '4. 반복문 종료',
        '5. 모든 청소 완료 및 대기 모드',
      ],
      explanation: '같은 작업을 번거롭게 여러 줄 쓰지 않고, "4회 반복" 블록 하나로 일괄 처리합니다.',
    },
  };

  // Step runner logic
  const executeStep = () => {
    if (isFinished) return;

    if (activeMission === 'sequence') {
      const nextIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);

      if (nextIndex === 0) {
        setRobot((prev) => ({ ...prev, x: 1 }));
        setLogs((prev) => ['[1단계] 로봇이 앞으로 1칸 이동했습니다 (좌표 1, 2)', ...prev]);
      } else if (nextIndex === 1) {
        setRobot((prev) => ({ ...prev, x: 2 }));
        setLogs((prev) => ['[2단계] 로봇이 앞으로 1칸 이동했습니다 (좌표 2, 2)', ...prev]);
      } else if (nextIndex === 2) {
        setRobot((prev) => ({ ...prev, x: 3 }));
        setLogs((prev) => ['[3단계] 로봇이 앞으로 1칸 이동하여 먼지 위치에 도착했습니다 (좌표 3, 2)', ...prev]);
      } else if (nextIndex === 3) {
        setDusts([]);
        setLogs((prev) => ['[4단계] 슈욱! 먼지를 깨끗하게 흡입 청소했습니다.', ...prev]);
      } else if (nextIndex >= 4) {
        setIsFinished(true);
        setIsPlaying(false);
        setLogs((prev) => ['[5단계 완료] 순차 구조 미션 성공! 위에서 아래로 완벽히 실행되었습니다.', ...prev]);
        markMissionDone('sequence');
      }
    } else if (activeMission === 'selection') {
      const nextIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);

      if (nextIndex === 0) {
        setLogs((prev) => ['[센서 감지] 로봇 전방 센서가 앞쪽 (2, 2)를 탐색합니다...', ...prev]);
      } else if (nextIndex === 1) {
        setLogs((prev) => ['[조건 검사] 앞에 장애물(벽)이 있는가? -> [참 (True)] 감지!', ...prev]);
      } else if (nextIndex === 2) {
        // Turn and move down
        setRobot({ x: 1, y: 3, dir: 'down' });
        setLogs((prev) => ['[조건 참 분기 실행] 벽을 회피하여 아래쪽으로 방향 전환 및 이동했습니다.', ...prev]);
      } else if (nextIndex === 3 || nextIndex === 4) {
        setLogs((prev) => ['[조건 거짓 분기 생략] 조건이 참이었으므로 "그렇지 않으면" 블록은 건너뜁니다.', ...prev]);
      } else if (nextIndex >= 5) {
        setDusts([]);
        setIsFinished(true);
        setIsPlaying(false);
        setLogs((prev) => ['[청소 완료] 선택 구조 성공! if-else 분기로 벽을 피하고 먼지를 청소했습니다.', ...prev]);
        markMissionDone('selection');
      }
    } else if (activeMission === 'iteration') {
      const nextIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);

      // We have 4 iteration cycles
      if (nextIndex === 0) {
        setLogs((prev) => ['[반복문 진입] 4회 반복 카운터를 초기화합니다 (count = 1/4)', ...prev]);
      } else if (nextIndex === 1) {
        setRobot((prev) => ({ ...prev, x: 1 }));
        setDusts((prev) => prev.filter((d) => !(d.x === 1 && d.y === 2)));
        setLogs((prev) => ['[반복 1회차] 1칸 전진 후 먼지 #1 수거 완료', ...prev]);
      } else if (nextIndex === 2) {
        setRobot((prev) => ({ ...prev, x: 2 }));
        setDusts((prev) => prev.filter((d) => !(d.x === 2 && d.y === 2)));
        setLogs((prev) => ['[반복 2회차] 1칸 전진 후 먼지 #2 수거 완료', ...prev]);
      } else if (nextIndex === 3) {
        setRobot((prev) => ({ ...prev, x: 3 }));
        setDusts((prev) => prev.filter((d) => !(d.x === 3 && d.y === 2)));
        setLogs((prev) => ['[반복 3회차] 1칸 전진 후 먼지 #3 수거 완료', ...prev]);
      } else if (nextIndex === 4) {
        setRobot((prev) => ({ ...prev, x: 4 }));
        setDusts((prev) => prev.filter((d) => !(d.x === 4 && d.y === 2)));
        setIsFinished(true);
        setIsPlaying(false);
        setLogs((prev) => ['[반복 4회차 종료] 4회 반복 완료 후 루프를 탈출했습니다! 모든 먼지 제거 성공.', ...prev]);
        markMissionDone('iteration');
      }
    }
  };

  const markMissionDone = (m: MissionType) => {
    setCompletedMissions((prev) => {
      const updated = { ...prev, [m]: true };
      if (updated.sequence && updated.selection && updated.iteration) {
        onComplete();
      }
      return updated;
    });
  };

  // Auto-play loop
  useEffect(() => {
    if (isPlaying && !isFinished) {
      stepTimerRef.current = setTimeout(() => {
        executeStep();
      }, speedMs);
    }
    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, [isPlaying, isFinished, currentLineIndex, speedMs]);

  return (
    <div className="space-y-8 pb-12">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
            3단계 · 핵심 제어 구조
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            알고리즘의 3대 제어 구조 비주얼 시뮬레이터
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            세상의 모든 컴퓨터 프로그램과 알고리즘은 단 3가지 기본 제어 구조인 <strong>순차(Sequence), 선택(Selection), 반복(Iteration)</strong>의 조합으로 이루어져 있습니다.
            로봇 청소기 시뮬레이터로 각 구조가 어떻게 작동하는지 직접 조작하며 확인해 보세요.
          </p>
        </div>

        {/* 3 Structure Mission Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <button
            onClick={() => setActiveMission('sequence')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeMission === 'sequence'
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-slate-900 text-sm">1. 순차 구조</span>
              </div>
              {completedMissions.sequence && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <p className="text-xs text-slate-600 mt-2">
              위에서 아래로 차례차례 순서대로 실행되는 가장 기본적 구조
            </p>
          </button>

          <button
            onClick={() => setActiveMission('selection')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeMission === 'selection'
                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitFork className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-slate-900 text-sm">2. 선택 구조 (if-else)</span>
              </div>
              {completedMissions.selection && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <p className="text-xs text-slate-600 mt-2">
              조건의 참/거짓에 따라 서로 다른 명령 경로를 선택하는 구조
            </p>
          </button>

          <button
            onClick={() => setActiveMission('iteration')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeMission === 'iteration'
                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-slate-900 text-sm">3. 반복 구조 (Loop)</span>
              </div>
              {completedMissions.iteration && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <p className="text-xs text-slate-600 mt-2">
              정해진 횟수나 조건을 만족할 때까지 동일 명령을 되풀이하는 구조
            </p>
          </button>
        </div>
      </div>

      {/* Simulator Workspace: Code on Left, 5x5 Grid on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code & Control Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {missionCodes[activeMission].title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  실행 중인 명령어 블록이 하이라이트됩니다.
                </p>
              </div>
              <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-700">
                {activeMission}
              </span>
            </div>

            {/* Code Block Viewer */}
            <div className="mt-4 space-y-1.5 font-mono text-xs">
              {missionCodes[activeMission].lines.map((line, idx) => {
                const isCurrent = idx === currentLineIndex;
                const isPassed = idx < currentLineIndex;

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border transition-all ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-bold border-indigo-700 shadow-xs scale-102 ring-2 ring-indigo-200'
                        : isPassed
                        ? 'bg-indigo-50/70 text-indigo-950 border-indigo-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{line}</span>
                      {isCurrent && <span className="text-[10px] font-sans bg-white/20 px-1.5 py-0.5 rounded">실행 중</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              💡 {missionCodes[activeMission].explanation}
            </p>
          </div>

          {/* Controls */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={isFinished}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors shadow-xs"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? '일시정지' : '자동 실행'}</span>
              </button>

              <button
                onClick={executeStep}
                disabled={isPlaying || isFinished}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg disabled:opacity-40 transition-colors"
                title="한 줄씩 실행"
              >
                <StepForward className="w-4 h-4 text-indigo-600" />
                <span>한 단계씩 (Step)</span>
              </button>

              <button
                onClick={() => setupMission(activeMission)}
                className="p-2.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg text-xs"
                title="처음으로 리셋"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>실행 속도:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSpeedMs(900)}
                  className={`px-2 py-0.5 rounded ${speedMs === 900 ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-500'}`}
                >
                  느림
                </button>
                <button
                  onClick={() => setSpeedMs(650)}
                  className={`px-2 py-0.5 rounded ${speedMs === 650 ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-500'}`}
                >
                  보통
                </button>
                <button
                  onClick={() => setSpeedMs(300)}
                  className={`px-2 py-0.5 rounded ${speedMs === 300 ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-500'}`}
                >
                  빠름
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5x5 Grid Simulation Arena (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">로봇 청소기 방 탐험 그리드 (5x5)</h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> 로봇
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> 먼지 ({dusts.length})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 inline-block" /> 벽(장애물)
                </span>
              </div>
            </div>

            {/* 5x5 Grid Arena */}
            <div className="mt-6 flex justify-center">
              <div className="grid grid-cols-5 gap-2 p-3 bg-slate-100 rounded-2xl border border-slate-200">
                {Array.from({ length: 5 }).map((_, y) =>
                  Array.from({ length: 5 }).map((_, x) => {
                    const isRobot = robot.x === x && robot.y === y;
                    const hasDust = dusts.some((d) => d.x === x && d.y === y);
                    const hasWall = walls.some((w) => w.x === x && w.y === y);

                    return (
                      <div
                        key={`${x}-${y}`}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center relative transition-all ${
                          hasWall
                            ? 'bg-slate-800 text-white shadow-xs'
                            : isRobot
                            ? 'bg-indigo-600 text-white shadow-md ring-4 ring-indigo-200'
                            : 'bg-white border border-slate-200/80 hover:bg-slate-50'
                        }`}
                      >
                        {/* Robot Icon */}
                        {isRobot && (
                          <div className="flex flex-col items-center">
                            <Bot className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                            <span className="text-[9px] font-mono leading-none mt-0.5">
                              {robot.dir === 'right' ? '▶' : robot.dir === 'down' ? '▼' : '▲'}
                            </span>
                          </div>
                        )}

                        {/* Dust Icon */}
                        {!isRobot && hasDust && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 animate-bounce">
                            <span className="text-xs">🧹</span>
                          </div>
                        )}

                        {/* Wall Icon */}
                        {hasWall && (
                          <div className="flex flex-col items-center text-slate-300">
                            <ShieldAlert className="w-4 h-4 text-rose-400" />
                            <span className="text-[10px] font-bold">벽</span>
                          </div>
                        )}

                        {/* Grid Coordinate */}
                        <span className="absolute bottom-1 right-1 text-[8px] text-slate-300 font-mono">
                          {x},{y}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Live Action Logs */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700 block mb-1">
              실시간 동작 콘솔 로그:
            </span>
            <div className="h-20 overflow-y-auto bg-slate-900 text-slate-200 p-2.5 rounded-xl font-mono text-xs space-y-1">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-snug">
                  <span className="text-indigo-400">&gt; </span>
                  {log}
                </div>
              ))}
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
          <span>4단계: 형성평가 퀴즈 및 탐구 인증서 발급</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
