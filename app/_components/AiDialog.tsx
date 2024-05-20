import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { useColumnStore } from "../_providers/column-store-provider";
import { useTaskStore } from "../_providers/task-store-provider";
import { toast } from "sonner";
import SparkleButton from "@/components/ui/sparkle-button";

const aiPromptSchema = z.object({
  prompt: z.string().min(10, {
    message:
      "The prompt you provided is too short. Please ensure your input is at least 10 characters long.",
  }),
});
type AiPrompt = z.infer<typeof aiPromptSchema>;

const taskResponse = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  taskDescription: z.string(),
  columnId: z.string(),
});

const columnResponse = z.object({
  columnId: z.string(),
  columnTitle: z.string(),
});

type TaskResponse = z.infer<typeof taskResponse>;
type ColumnResponse = z.infer<typeof columnResponse>;

const promptResult = z.object({
  tasks: z.array(taskResponse),
  columns: z.array(columnResponse),
});

type PromptResultIds = {
  taskIds: string[];
  columnIds: string[];
};

const getData = async () => {
  const token = "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";
  const owner = "Mehtari-Nadir";
  const repo = "system-prompt";
  const path = "system-prompt.txt";
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const base64Content = data.content;
    const decodedContent = Buffer.from(base64Content, "base64").toString(
      "utf-8",
    );
    return decodedContent;
  } catch (err) {
    console.log(err);
  }
};
type AiDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
};

const AiDialog = ({ open, setOpen, boardId }: AiDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { addColumn, deleteColumn } = useColumnStore((state) => ({
    addColumn: state.addColumn,
    deleteColumn: state.deleteColumn,
  }));
  const { addTask, deleteTask } = useTaskStore((state) => ({
    addTask: state.addTask,
    deleteTask: state.deleteTask,
  }));
  const initialPromptResultIds: PromptResultIds = {
    taskIds: [],
    columnIds: [],
  };
  const [promptResultIds, setPromptResultIds] = useState<PromptResultIds>(
    initialPromptResultIds,
  );
  const form = useForm<AiPrompt>({
    resolver: zodResolver(aiPromptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBUgNqU1qSH1DJe2lX-mQQMzzSpRWpX0mw",
  );
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  const parseData = (data: string) => {
    console.log("\n%cDATA:\n", "color: red; font-weight: bold", data);
    const formattedData = data.startsWith("[")
      ? `{${data.replace(/^\s*\[\s*(\{[^]*?\})\s*\]\s*,\s*\[\s*(\{[^]*?\})\s*\]\s*$/, '"tasks":[$1], "columns":[$2]')}}`
      : !data.startsWith("{")
        ? `{${data.replace(/(\b\w+\b)(?=: \[|\: \{|\: ")/g, '"$1"')}}`
        : data;
    console.log(
      "\n%cFORMATTED-DATA:\n",
      "color: green; font-weight: bold",
      formattedData,
    );
    try {
      console.log(
        "\n%cPARSED-DATA:\n",
        "color: lightblue; font-weight: bold",
        JSON.parse(formattedData),
      );
      return JSON.parse(formattedData);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      return null;
    }
  };
  const onSubmit = (values: AiPrompt) => {
    startTransition(async () => {
      try {
        const systemPrompt = await getData();
        const chatSession = genAI
          .getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            systemInstruction: systemPrompt,
          })
          .startChat({
            generationConfig,
            safetySettings,
            history: [],
          });
        const data = await chatSession.sendMessage(values.prompt).then((res) =>
          res.response
            .text()
            .replace(/\n/g, "")
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/,(\s*])/g, "$1")
            .replace(/,$/g, "")
            .replace(/\(.*?\)/g, ""),
        );
        const parsedData = parseData(data);
        if (!parsedData) return;
        promptResultIds.taskIds.forEach((taskId: string) => deleteTask(taskId));
        promptResultIds.columnIds.forEach((columnId: string) =>
          deleteColumn(columnId),
        );
        setPromptResultIds(initialPromptResultIds);
        const {
          columnIds: newColumnIds,
          taskIds: newTaskIds,
        }: PromptResultIds = initialPromptResultIds;
        const { tasks, columns } = promptResult.parse(parsedData);
        columns.forEach(({ columnTitle, columnId }: ColumnResponse) => {
          addColumn(boardId, columnTitle, columnId);
          newColumnIds.push(columnId);
        });
        tasks.forEach(
          ({ taskId, columnId, taskTitle, taskDescription }: TaskResponse) => {
            addTask(
              columnId,
              taskTitle,
              taskDescription,
              undefined,
              undefined,
              taskId,
            );
            newTaskIds.push(taskId);
          },
        );
        setPromptResultIds({ taskIds: newTaskIds, columnIds: newColumnIds });
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setOpen(!open);
        form.reset();
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={isPending ? () => { } : setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="An E-commerce web app using next.js..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Make a specific and clear prompt
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SparkleButton title="Generate" isPending={isPending}>
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", { hidden: !isPending })}
              />
            </SparkleButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AiDialog;
