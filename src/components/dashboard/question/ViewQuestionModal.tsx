"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@/types/q.type";

interface ViewQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

export default function ViewQuestionModal({
  open,
  onOpenChange,
  question,
}: ViewQuestionModalProps) {
  if (!question) return null;

  const categories = ["MATRIC", "INTERMEDIATE", "BACHELOR"];
  const subjects = ["Biology", "Chemistry", "Physics", "Mathematics"];
  const units = ["1", "2", "3", "4", "5"];
  const chapters = ["1", "2", "3", "4", "5"];
  const sections = ["1", "2", "3", "4", "5"];
  const questionTypes = ["Easy", "Medium", "Hard"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-green-700 text-white border-green-600">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-white">
            View Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white font-medium">Category</Label>
              <Select defaultValue={question.category}>
                <SelectTrigger className="bg-white text-black border-gray-300 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white font-medium">Subject</Label>
              <Select defaultValue={question.subject}>
                <SelectTrigger className="bg-white text-black border-gray-300 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white font-medium">Unit</Label>
              <Select defaultValue={question.unit}>
                <SelectTrigger className="bg-white text-black border-gray-300 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white font-medium">Chapter</Label>
              <Select defaultValue={question.chapter}>
                <SelectTrigger className="bg-white text-black border-gray-300 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter} value={chapter}>
                      {chapter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white font-medium">Section</Label>
              <Select defaultValue={question.section}>
                <SelectTrigger className="bg-white text-black border-gray-300 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white font-medium">Question Type</Label>
              <Select defaultValue={question.type}>
                <SelectTrigger className="bg-white text-black border-gray-300 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-white font-medium">Write Question</Label>
            <Textarea
              value={question.question}
              className="bg-white text-black border-gray-300 min-h-[80px] mt-2"
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white font-medium">Option 1</Label>
              <div className="relative">
                <Input
                  value={question.options.option1}
                  className="bg-white text-black border-gray-300 mt-2 pr-10"
                  readOnly
                />
                {question.options.correctAnswer === "option1" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-white font-medium">Option 2</Label>
              <div className="relative">
                <Input
                  value={question.options.option2}
                  className="bg-white text-black border-gray-300 mt-2 pr-10"
                  readOnly
                />
                {question.options.correctAnswer === "option2" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-white font-medium">Option 3</Label>
              <div className="relative">
                <Input
                  value={question.options.option3}
                  className="bg-white text-black border-gray-300 mt-2 pr-10"
                  readOnly
                />
                {question.options.correctAnswer === "option3" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-white font-medium">Option 4</Label>
              <div className="relative">
                <Input
                  value={question.options.option4}
                  className="bg-white text-black border-gray-300 mt-2 pr-10"
                  readOnly
                />
                {question.options.correctAnswer === "option4" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <Button
              className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
