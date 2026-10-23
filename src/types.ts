export type TabId = 'conditions' | 'representations' | 'structures' | 'quiz' | 'prompt';

export interface AlgorithmCondition {
  id: string;
  name: string;
  english: string;
  summary: string;
  explanation: string;
  goodExample: string;
  badExample: string;
  iconName: string;
}

export interface InspectionCase {
  id: number;
  situation: string;
  description: string;
  violatedCondition: '입력' | '출력' | '명확성' | '유한성' | '수행가능성' | '적합';
  explanation: string;
}

export interface FlowchartSymbol {
  id: string;
  shapeName: string;
  meaning: string;
  role: string;
  example: string;
  svgShape: 'oval' | 'rect' | 'rhombus' | 'parallelogram';
}

export interface QuizQuestion {
  id: number;
  category: '조건' | '표현' | '구조';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint: string;
}
