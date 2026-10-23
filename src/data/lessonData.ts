import { AlgorithmCondition, InspectionCase, FlowchartSymbol, QuizQuestion } from '../types';

export const ALGORITHM_CONDITIONS: AlgorithmCondition[] = [
  {
    id: 'input',
    name: '입력',
    english: 'Input',
    summary: '0개 이상의 외부 입력이 존재해야 함',
    explanation: '알고리즘을 실행하기 위해 외부에서 주어지는 자료입니다. 입력이 전혀 없을 수도 있습니다(0개 이상, 예: 현재 시간 출력 알고리즘).',
    goodExample: '두 정수 a와 b를 사용자에게 입력받는다.',
    badExample: '필요한 재료나 데이터가 무엇인지 전혀 정의되지 않음',
    iconName: 'LogIn',
  },
  {
    id: 'output',
    name: '출력',
    english: 'Output',
    summary: '반드시 1개 이상의 명확한 결과가 도출되어야 함',
    explanation: '알고리즘이 끝난 후에는 사용자에게 전달되거나 저장되는 유의미한 결과물이 최소 1개 이상 반드시 나와야 합니다.',
    goodExample: '두 수의 덧셈 결과인 15를 화면에 출력한다.',
    badExample: '연산은 열심히 수행했으나 아무런 결과물이나 화면 출력이 없음',
    iconName: 'LogOut',
  },
  {
    id: 'definiteness',
    name: '명확성',
    english: 'Definiteness',
    summary: '각 단계의 지시가 모호하지 않고 명확해야 함',
    explanation: '명령어의 의미가 명확하여 사람이나 컴퓨터마다 서로 다르게 해석하는 일이 없어야 합니다.',
    goodExample: '물 550ml를 넣고 100℃가 될 때까지 끓인다.',
    badExample: '물을 적당히 붓고 맛있어질 때까지 알아서 끓인다.',
    iconName: 'Compass',
  },
  {
    id: 'finiteness',
    name: '유한성',
    english: 'Finiteness',
    summary: '한정된 단계를 거친 후 반드시 종료되어야 함',
    explanation: '알고리즘은 영원히 멈추지 않는 무한 루프(Infinite Loop)에 빠지면 안 되며, 유한한 횟수의 단계를 거쳐 반드시 끝이 나야 합니다.',
    goodExample: '카운트다운을 10부터 1까지 출력한 후 종료한다.',
    badExample: '1부터 1씩 무한히 더하며 끝나는 탈출 조건이 없다.',
    iconName: 'Clock',
  },
  {
    id: 'effectiveness',
    name: '수행 가능성',
    english: 'Effectiveness',
    summary: '현실적으로 직접 실행 가능한 연산이어야 함',
    explanation: '모든 연산은 컴퓨터가 하드웨어적으로 실행할 수 있거나, 사람이 종이와 펜으로 충분히 계산해 낼 수 있는 현실적인 명령이어야 합니다.',
    goodExample: '입력된 숫자를 2로 나누어 나머지를 구한다.',
    badExample: '어제 날씨를 맑음으로 바꾸거나, 어떤 수를 0으로 나눈다.',
    iconName: 'CheckCircle2',
  },
];

export const INSPECTION_CASES: InspectionCase[] = [
  {
    id: 1,
    situation: '라면 조리법 레시피',
    description: '냄비에 물을 적당히 붓고, 물이 맛있게 끓으면 면을 넣은 뒤 먹기 좋은 상태가 될 때까지 기다린다.',
    violatedCondition: '명확성',
    explanation: '"적당히", "맛있게", "먹기 좋은 상태"는 사람마다 기준이 달라 컴퓨터가 판단할 수 없습니다. "물 500ml", "끓는점 100℃", "4분간 끓이기"와 같이 구체적 수치로 명확하게 표현해야 합니다.',
  },
  {
    id: 2,
    situation: '숫자 카운트 프로그램',
    description: '변수 count = 1로 시작하여, 화면에 count를 출력하고 count = count + 1을 끝없이 계속 반복한다.',
    violatedCondition: '유한성',
    explanation: '종료 조건(예: count가 100이 되면 멈춤)이 없으므로 프로그램이 영원히 끝나지 않는 무한 루프에 빠집니다. 알고리즘은 유한한 단계 후 종료되어야 합니다.',
  },
  {
    id: 3,
    situation: '시간 여행 로봇 명령',
    description: '로봇에게 타임머신 가속기를 켜고 500년 전 과거로 이동하여 세종대왕의 모습을 촬영해 오라고 명령한다.',
    violatedCondition: '수행가능성',
    explanation: '과거로 시간 여행을 하는 것은 현재 과학 법칙이나 컴퓨터 하드웨어 기술로 실제로 수행할 수 없는 불가능한 명령입니다.',
  },
  {
    id: 4,
    situation: '고장 난 자판기',
    description: '1000원 지폐를 넣고 콜라 버튼을 눌렀는데, 음료가 나오지도 않고 거스름돈도 없으며 화면 안내도 전혀 없다.',
    violatedCondition: '출력',
    explanation: '입력(돈과 버튼 선택)은 있었으나, 알고리즘 처리 후 사용자에게 반환되는 유의미한 결과(음료 또는 잔액 반환)가 1개도 존재하지 않습니다.',
  },
  {
    id: 5,
    situation: '스마트 보행 신호등',
    description: '보행자 신호가 초록색이면 보행 음성을 켜고 파란불 잔여 시간을 안내하며, 빨간색이면 정지 신호를 유지한다.',
    violatedCondition: '적합',
    explanation: '외부 입력(신호 상태)이 있고, 명확한 결과(음성 및 불빛 안내)가 나오며, 규칙이 명확하고 종료 시점이 분명하여 5대 조건을 완벽히 충족합니다.',
  },
];

export const FLOWCHART_SYMBOLS: FlowchartSymbol[] = [
  {
    id: 'terminal',
    shapeName: '단말 (타원 / 둥근 사각형)',
    meaning: '시작 및 종료',
    role: '알고리즘이 어디서 시작되고 어디서 끝나는지를 표시합니다.',
    example: '시작, 끝, 종료',
    svgShape: 'oval',
  },
  {
    id: 'process',
    shapeName: '처리 (직사각형)',
    meaning: '연산 및 명령 처리',
    role: '값의 대입, 계산, 데이터 변환 등 일반적인 작업을 수행합니다.',
    example: '합계 = 합계 + 숫자, 전진하기',
    svgShape: 'rect',
  },
  {
    id: 'decision',
    shapeName: '판단 (마름모)',
    meaning: '조건 비교 및 분기',
    role: '조건식을 검사하여 결과(참/거짓 또는 예/아니오)에 따라 흐름을 나눕니다.',
    example: '점수 >= 80 ? , 장애물이 있는가?',
    svgShape: 'rhombus',
  },
  {
    id: 'io',
    shapeName: '입출력 (평행사변형)',
    meaning: '자료의 입력과 출력',
    role: '키보드로 데이터를 입력받거나 모니터/프린터로 결과를 출력합니다.',
    example: '나이 입력받기, "합격" 출력하기',
    svgShape: 'parallelogram',
  },
];

export const COMPARISON_EXAMPLES = [
  {
    id: 'traffic',
    title: '예시 1: 횡단보도 신호등 건너기',
    natural: `1. 횡단보도 앞에 멈추어 선다.
2. 보행자 신호등의 불빛을 확인한다.
3. 만약 초록불이면 좌우를 살피며 길을 건넌다.
4. 만약 빨간불이면 초록불이 켜질 때까지 기다린다.`,
    flowchartSteps: [
      { id: 1, type: 'terminal', text: '시작' },
      { id: 2, type: 'io', text: '신호등 불빛 감지 (입력)' },
      { id: 3, type: 'decision', text: '초록불인가?' },
      { id: 4, type: 'process', text: '길 건너기 (참 일 때)' },
      { id: 5, type: 'process', text: '멈춰 대기하기 (거짓 일 때)' },
      { id: 6, type: 'terminal', text: '끝' },
    ],
    pseudocode: `알고리즘 횡단보도_건너기
  입력: 신호등_색상
  만약 (신호등_색상 == "초록불") 이면
      좌우 살피고 건너기()
  그렇지_않으면
      정지선에서 대기하기()
  끝_만약
끝_알고리즘`,
    blockCode: `[만약 <(신호등) = (초록불)> 라면]
    [좌우 살피며 건너기]
[아니면]
    [멈춰 서서 기다리기]`,
  },
  {
    id: 'even_odd',
    title: '예시 2: 홀수와 짝수 판별기',
    natural: `1. 사용자에게 정수 한 개를 입력받는다.
2. 입력받은 숫자를 2로 나눈 나머지를 계산한다.
3. 나머지가 0이면 "짝수"라고 화면에 보여준다.
4. 나머지가 0이 아니면 "홀수"라고 화면에 보여준다.`,
    flowchartSteps: [
      { id: 1, type: 'terminal', text: '시작' },
      { id: 2, type: 'io', text: '정수 N 입력' },
      { id: 3, type: 'decision', text: 'N % 2 == 0 ?' },
      { id: 4, type: 'io', text: '"짝수" 출력 (참)' },
      { id: 5, type: 'io', text: '"홀수" 출력 (거짓)' },
      { id: 6, type: 'terminal', text: '끝' },
    ],
    pseudocode: `알고리즘 홀짝_판별
  입력: number
  remainder = number mod 2
  만약 (remainder == 0) 이면
      출력("짝수입니다")
  그렇지_않으면
      출력("홀수입니다")
  끝_만약
끝_알고리즘`,
    blockCode: `[정수 (N) 묻고 대답 기다리기]
[만약 <(N mod 2) = (0)> 라면]
    ["짝수입니다" 말하기]
[아니면]
    ["홀수입니다" 말하기]`,
  },
  {
    id: 'sum10',
    title: '예시 3: 1부터 5까지 더하기 (반복)',
    natural: `1. 합계를 0으로, 숫자를 1로 준비한다.
2. 합계에 현재 숫자를 더한다.
3. 숫자를 1 증가시킨다.
4. 숫자가 5 이하이면 2번으로 돌아가 계속 더한다.
5. 5를 넘어가면 최종 합계를 화면에 출력한다.`,
    flowchartSteps: [
      { id: 1, type: 'terminal', text: '시작' },
      { id: 2, type: 'process', text: '합계 = 0, i = 1' },
      { id: 3, type: 'decision', text: 'i <= 5 ?' },
      { id: 4, type: 'process', text: '합계 = 합계 + i, i = i + 1' },
      { id: 5, type: 'io', text: '합계 출력' },
      { id: 6, type: 'terminal', text: '끝' },
    ],
    pseudocode: `알고리즘 1부터5까지_합계
  sum = 0
  반복 (i = 1 부터 5 까지 1씩 증가)
      sum = sum + i
  끝_반복
  출력(sum)
끝_알고리즘`,
    blockCode: `[합계를 (0)으로 정하기]
[(5) 번 반복하기]
    [합계를 (합계 + i)로 바꾸기]
    [i를 (1) 만큼 바꾸기]
[합계 말하기]`,
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: '조건',
    question: '알고리즘의 5대 조건 중 "명령어의 의미가 모호하지 않고 명확하여 사람이나 컴퓨터마다 다르게 해석하지 않아야 한다"는 조건은 무엇인가요?',
    options: ['입력 (Input)', '명확성 (Definiteness)', '유한성 (Finiteness)', '수행 가능성 (Effectiveness)'],
    correctAnswerIndex: 1,
    hint: '레시피에서 "소금을 적당히 넣는다"처럼 해석이 갈리는 표현을 배제하는 조건입니다.',
    explanation: '명확성(Definiteness)은 모든 명령이 모호하지 않고 객관적이고 정확해야 함을 의미합니다.',
  },
  {
    id: 2,
    category: '조건',
    question: '프로그램이 종료 조건 없이 영원히 실행되어 컴퓨터가 멈추는 "무한 루프(Infinite Loop)"는 알고리즘의 어떤 조건을 위반한 것인가요?',
    options: ['출력 (Output)', '유한성 (Finiteness)', '입력 (Input)', '명확성 (Definiteness)'],
    correctAnswerIndex: 1,
    hint: '알고리즘은 정해진 유한한 단계를 거친 뒤에는 "반드시 끝나야" 합니다.',
    explanation: '유한성(Finiteness)은 알고리즘이 유한한 횟수의 단계를 거치면 반드시 끝이 나야 한다는 조건입니다.',
  },
  {
    id: 3,
    category: '표현',
    question: '순서도(Flowchart)에서 조건을 비교하여 참(예) 또는 거짓(아니오)에 따라 실행 경로를 나누는 기호는 무엇인가요?',
    options: ['타원 (단말)', '직사각형 (처리)', '마름모 (판단)', '평행사변형 (입출력)'],
    correctAnswerIndex: 2,
    hint: '신호등 색상이나 점수 조건을 따져서 갈림길을 만드는 다이아몬드 모양 기호입니다.',
    explanation: '마름모는 조건이나 기준을 검사하여 흐름을 분기시키는 "판단" 기호입니다.',
  },
  {
    id: 4,
    category: '구조',
    question: '"비가 오면 우산을 쓰고, 비가 오지 않으면 모자를 쓴다"와 같이 조건의 참/거짓에 따라 서로 다른 명령을 실행하는 제어 구조는?',
    options: ['순차 구조 (Sequence)', '선택 구조 (Selection)', '반복 구조 (Iteration)', '무작위 구조 (Random)'],
    correctAnswerIndex: 1,
    hint: '두 갈래 길 중 조건에 맞는 길을 하나 고르는(선택하는) 구조입니다.',
    explanation: '선택 구조(Selection)는 조건에 따라 다른 실행 경로를 선택하는 if-else 구조입니다.',
  },
  {
    id: 5,
    category: '구조',
    question: '"운동장 트랙 5바퀴를 돌 때까지 1바퀴 돌기를 계속한다"와 같이 특정 조건을 만족하는 동안 동일한 명령을 되풀이하는 제어 구조는?',
    options: ['순차 구조 (Sequence)', '선택 구조 (Selection)', '반복 구조 (Iteration)', '병렬 구조 (Parallel)'],
    correctAnswerIndex: 2,
    hint: '동일한 행동을 정해진 횟수만큼 "되풀이(Loop)"하는 제어 구조입니다.',
    explanation: '반복 구조(Iteration)는 특정 조건이 유지되는 동안 정해진 작업을 되풀이하여 수행하는 구조입니다.',
  },
];
