import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { useReducer, useState } from "react";
import { cn } from "@/lib/utils";
import { useColumnStore } from "../_providers/column-store-provider";
import { useTaskStore } from "../_providers/task-store-provider";
import { toast } from "sonner";
import SparkleButton from "@/components/ui/sparkle-button";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
type ActionTypes = "SET_IDS" | "RESET";
type PromptResultIdsActions = { type: ActionTypes } & {
  payload: PromptResultIds;
};

const promptResultIdsReducer: React.Reducer<
  PromptResultIds,
  PromptResultIdsActions
> = (state: PromptResultIds, { type, payload }: PromptResultIdsActions) =>
  type === "SET_IDS" || type === "RESET" ? { ...payload } : state;

const AiDialog = ({ open, setOpen, boardId }: AiDialogProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { addColumn, deleteColumn, columns } = useColumnStore((state) => ({
    addColumn: state.addColumn,
    deleteColumn: state.deleteColumn,
    columns: state.columns,
  }));
  const { addTask, deleteTask, tasks } = useTaskStore((state) => ({
    addTask: state.addTask,
    deleteTask: state.deleteTask,
    tasks: state.tasks,
  }));
  const initialPromptResultIds: PromptResultIds = {
    taskIds: [],
    columnIds: [],
  };
  const [promptResultId, dispatch] = useReducer(
    promptResultIdsReducer,
    initialPromptResultIds,
  );
  const form = useForm<AiPrompt>({
    resolver: zodResolver(aiPromptSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const supabase = createClientComponentClient();
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
    console.log("\n%cDATA:\n", "color: lightblue; font-weight: bold", data);
    const formattedData = data.startsWith("[")
      ? `{${data.replace(/^\s*\[\s*(\{[^]*?\})\s*\]\s*,?\s*\[\s*(\{[^]*?\})\s*\]\s*$/g, '"tasks":[$1], "columns":[$2]')}}`
      : !data.startsWith("{")
        ? `{${data.replace(/(\b\w+\b)(?=: \[|\: \{|\: ")/g, '"$1"')}}`
        : data;
    console.log(
      "\n%cFORMATTED-DATA:\n",
      "color: lightblue; font-weight: bold",
      formattedData,
    );
    try {
      console.log("%cPARSED-DATA:", "color: lightblue; font-weight: bold");
      console.table(JSON.parse(formattedData));
      return JSON.parse(formattedData);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      return null;
    }
  };
  const onSubmit = async (values: AiPrompt) => {
    setIsPending(true);
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
      promptResultId.taskIds.forEach(async (taskId: string) => {
        deleteTask(taskId);
        const { error } = await supabase
          .from("tasks")
          .delete()
          .eq("taskId", taskId);
        if (error) throw error;
      });
      promptResultId.columnIds.forEach(async (columnId: string) => {
        deleteColumn(columnId);
        const { error } = await supabase
          .from("columns")
          .delete()
          .eq("columnId", columnId);
        if (error) throw error;
      });
      const { tasks: promptResultTasks, columns: promptResultColumns } =
        promptResult.parse(parsedData);
      const newColumnIds = await Promise.all(
        promptResultColumns.map(async ({ columnTitle }: ColumnResponse) => {
          const newColumnId = uuidv4();
          addColumn(boardId, columnTitle, newColumnId);
          const { error } = await supabase.from("columns").upsert([
            {
              columnId: newColumnId,
              columnTitle,
              boardId,
            },
          ]);
          if (error) throw error;
          return newColumnId;
        }),
      );
      const newTaskIds = await Promise.all(
        promptResultTasks.map(
          async ({ taskTitle, taskDescription }: TaskResponse) => {
            const newTaskId = uuidv4();
            const columnId = newColumnIds[0];
            addTask(
              columnId,
              taskTitle,
              taskDescription,
              undefined,
              undefined,
              newTaskId,
            );
            const { error } = await supabase.from("tasks").upsert([
              {
                taskId: newTaskId,
                taskTitle,
                taskDescription: taskDescription || null,
                dueDate: null,
                priority: null,
                columnId,
              },
            ]);
            if (error) throw error;
            return newTaskId;
          },
        ),
      );
      dispatch({ type: "RESET", payload: initialPromptResultIds });
      dispatch({
        type: "SET_IDS",
        payload: { taskIds: newTaskIds, columnIds: newColumnIds },
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      setOpen(!open);
      setIsPending(false);
      form.reset();
    }
  };
  console.log("%cSTORE-COLUMNS:", "color: lightblue; font-weight: bold");
  console.table(
    columns.map(({ columnId, columnTitle }) => ({ columnId, columnTitle })),
  );

  console.log("%cSTORE-TASKS:", "color: lightblue; font-weight: bold");
  console.table(
    tasks.map(({ columnId, taskId, taskTitle }) => ({
      columnId,
      taskId,
      taskTitle,
    })),
  );
  return (
    <Dialog open={open} onOpenChange={isPending ? () => {} : setOpen}>
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
