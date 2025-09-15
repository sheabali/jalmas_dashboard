export interface Question {
  id: string;
  questionNo: string;
  question: string;
  category: string;
  subject: string;
  unit: string;
  chapter: string;
  section: string;
  type: string;
  options: {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: string;
  };
}

export interface QuestionFormData {
  category: string;
  subject: string;
  unit: string;
  chapter: string;
  section: string;
  questionType: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
}
