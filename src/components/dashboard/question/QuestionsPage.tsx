"use client";

import { Question, QuestionFormData } from "@/types/q.type";
import { useMemo, useState } from "react";
import AddQuestionModal from "./modal";
import QuestionsTable from "./QuestionsTable";
import ViewQuestionModal from "./ViewQuestionModal";

const sampleQuestions: Question[] = [
  {
    id: "1",
    questionNo: "01",
    question: "When you receive a new project, you prefer to the country?",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option4",
    },
  },
  {
    id: "2",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  {
    id: "2",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  {
    id: "2",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  {
    id: "3",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  {
    id: "4",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  {
    id: "5",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  {
    id: "6",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  {
    id: "7",
    questionNo: "02",
    question: "When you receive a new project, you prefer to.....",
    category: "MATRIC",
    subject: "Biology",
    unit: "01",
    chapter: "01",
    section: "01",
    type: "Easy",
    options: {
      option1: "ASCSEF",
      option2: "ASCSEF",
      option3: "ASCSEF",
      option4: "ABCSEF",
      correctAnswer: "option1",
    },
  },
  // ... add other questions
];

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    subject: "All",
    unit: "All",
    chapter: "All",
    section: "All",
    type: "All",
  });

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch = question.question
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        filters.category === "All" || question.category === filters.category;
      const matchesSubject =
        filters.subject === "All" || question.subject === filters.subject;
      const matchesUnit =
        filters.unit === "All" || question.unit === filters.unit;
      const matchesChapter =
        filters.chapter === "All" || question.chapter === filters.chapter;
      const matchesSection =
        filters.section === "All" || question.section === filters.section;
      const matchesType =
        filters.type === "All" || question.type === filters.type;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubject &&
        matchesUnit &&
        matchesChapter &&
        matchesSection &&
        matchesType
      );
    });
  }, [questions, searchTerm, filters]);

  const handleAddQuestion = (data: QuestionFormData) => {
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      questionNo: String(questions.length + 1).padStart(2, "0"),
      question: data.question,
      category: data.category,
      subject: data.subject,
      unit: data.unit,
      chapter: data.chapter,
      section: data.section,
      type: data.questionType,
      options: {
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        correctAnswer: data.correctAnswer,
      },
    };

    setQuestions([...questions, newQuestion]);
  };

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setShowViewModal(true);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <QuestionsTable
        questions={filteredQuestions}
        onViewQuestion={handleViewQuestion}
        onAddQuestion={() => setShowAddModal(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <AddQuestionModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddQuestion}
      />

      <ViewQuestionModal
        open={showViewModal}
        onOpenChange={setShowViewModal}
        question={selectedQuestion}
      />
    </div>
  );
}
