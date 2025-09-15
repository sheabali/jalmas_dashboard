"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QuestionFormData } from "@/types/q.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subject: z.string().min(1, "Subject is required"),
  unit: z.string().min(1, "Unit is required"),
  chapter: z.string().min(1, "Chapter is required"),
  section: z.string().min(1, "Section is required"),
  questionType: z.string().min(1, "Question type is required"),
  question: z.string().min(1, "Question is required"),
  option1: z.string().min(1, "Option 1 is required"),
  option2: z.string().min(1, "Option 2 is required"),
  option3: z.string().min(1, "Option 3 is required"),
  option4: z.string().min(1, "Option 4 is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

interface AddQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: QuestionFormData) => void;
}

export default function AddQuestionModal({
  open,
  onOpenChange,
  onSubmit,
}: AddQuestionModalProps) {
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subject: "",
      unit: "",
      chapter: "",
      section: "",
      questionType: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
    },
  });

  const handleSubmit = (data: QuestionFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

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
            Add New Question
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white text-black border-gray-300">
                          <SelectValue placeholder="Select Here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Subject
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white text-black border-gray-300">
                          <SelectValue placeholder="Select Here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Unit
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white text-black border-gray-300">
                          <SelectValue placeholder="Select Here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chapter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Chapter
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white text-black border-gray-300">
                          <SelectValue placeholder="Select Here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {chapters.map((chapter) => (
                          <SelectItem key={chapter} value={chapter}>
                            {chapter}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Section
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white text-black border-gray-300">
                          <SelectValue placeholder="Select Here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sections.map((section) => (
                          <SelectItem key={section} value={section}>
                            {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Question Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white text-black border-gray-300">
                          <SelectValue placeholder="Select Here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {questionTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">
                    Write Question
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write Here"
                      className="bg-white text-black border-gray-300 min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="option1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Option 1
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write Here"
                        className="bg-white text-black border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="option2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Option 2
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write Here"
                        className="bg-white text-black border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="option3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Option 3
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write Here"
                        className="bg-white text-black border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="option4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Option 4
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write Here"
                        className="bg-white text-black border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-white font-medium">
                    Correct Answer
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option1"
                          id="r1"
                          className="border-white text-white"
                        />
                        <Label htmlFor="r1" className="text-white">
                          Option 1
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option2"
                          id="r2"
                          className="border-white text-white"
                        />
                        <Label htmlFor="r2" className="text-white">
                          Option 2
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option3"
                          id="r3"
                          className="border-white text-white"
                        />
                        <Label htmlFor="r3" className="text-white">
                          Option 3
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option4"
                          id="r4"
                          className="border-white text-white"
                        />
                        <Label htmlFor="r4" className="text-white">
                          Option 4
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3"
              >
                Done
              </Button>
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
