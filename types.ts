export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export enum FossilType {
  FISH = 'Peixes',
  INSECT = 'Insetos',
  PLANT = 'Plantas',
  REPTILE = 'Répteis',
  MAMMAL = 'Mamíferos'
}