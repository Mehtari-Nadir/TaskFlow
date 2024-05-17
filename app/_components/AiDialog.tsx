import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const aiTaskSchema = z.object({
    prompt: z.string().min(10, { message: "Minimum 10 chars" }),
})

const getData = async () => {

    const token = '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';
    const owner = 'Mehtari-Nadir';
    const repo = 'system-prompt';
    const path = 'system-prompt.txt';
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const base64Content = data.content;
        const decodedContent = Buffer.from(base64Content, 'base64').toString('utf-8');
        return decodedContent;
    } catch (err) {
        console.log(err);
    }
}

const AiDialog = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const form = useForm<z.infer<typeof aiTaskSchema>>({
        resolver: zodResolver(aiTaskSchema),
        defaultValues: {
            prompt: ""
        },
    })

    const genAI = new GoogleGenerativeAI("AIzaSyBUgNqU1qSH1DJe2lX-mQQMzzSpRWpX0mw");
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

    const onSubmit = async (values: z.infer<typeof aiTaskSchema>) => {

        const systemPrompt = await getData();

        const chatSession = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            systemInstruction: systemPrompt,
        }).startChat({
            generationConfig,
            safetySettings,
            history: [],
        })

        const result = await chatSession.sendMessage(values.prompt);
        let text = result.response.text().replace(/\n/g, '');

        // console.log(text);

        // let tasksStart = text.indexOf('tasks: [') + 7;
        // let tasksEnd = text.indexOf('],', tasksStart) + 1;
        // let tasksArray = text.substring(tasksStart, tasksEnd);

        // // Extract columns array
        // let columnsStart = text.indexOf('columns: [') + 9;
        // let columnsEnd = text.indexOf(']', columnsStart) + 1;
        // let columnsArray = text.substring(columnsStart, columnsEnd);

        // console.log('const tasks = ', tasksArray);
        // console.log("\n");
        // console.log('const columns = ', columnsArray);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                                        <Textarea placeholder="an E-commerce web app using next.js..." {...field} />
                                    </FormControl>
                                    <FormDescription>Make a specific and clear prompt</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Generate</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AiDialog;