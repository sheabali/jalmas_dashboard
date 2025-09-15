import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Question } from "@/types/q.type";
import { Eye, Plus } from "lucide-react";

interface QuestionsTableProps {
  questions: Question[];
  onViewQuestion: (question: Question) => void;
  onAddQuestion: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    category: string;
    subject: string;
    unit: string;
    chapter: string;
    section: string;
    type: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export default function QuestionsTable({
  questions,
  onViewQuestion,
  onAddQuestion,
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
}: QuestionsTableProps) {
  const categories = ["All", "MATRIC", "INTERMEDIATE", "BACHELOR"];
  const subjects = ["All", "Biology", "Chemistry", "Physics", "Mathematics"];
  const units = ["All", "1", "2", "3", "4", "5"];
  const chapters = ["All", "1", "2", "3", "4", "5"];
  const sections = ["All", "1", "2", "3", "4", "5"];
  const types = ["All", "Easy", "Medium", "Hard"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Questions</h1>
          <Button
            onClick={onAddQuestion}
            className="ml-4 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-80"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select
          value={filters.category}
          onValueChange={(value) => onFilterChange("category", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.subject}
          onValueChange={(value) => onFilterChange("subject", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.unit}
          onValueChange={(value) => onFilterChange("unit", value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.chapter}
          onValueChange={(value) => onFilterChange("chapter", value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Chapter" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.section}
          onValueChange={(value) => onFilterChange("section", value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange("type", value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="px-4 overflow-x-auto">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>Q. No</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.questionNo}</TableCell>
                <TableCell className="max-w-[400px] break-words">
                  {q.question}
                </TableCell>
                <TableCell>{q.category}</TableCell>
                <TableCell>{q.subject}</TableCell>
                <TableCell>{q.unit}</TableCell>
                <TableCell>{q.chapter}</TableCell>
                <TableCell>{q.section}</TableCell>
                <TableCell>{q.type}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewQuestion(q)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
