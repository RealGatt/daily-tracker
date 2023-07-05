"use client";

import TaskTable from "@/components/custom-ui/task-table";
import { ThemeToggler } from "@/components/custom-ui/theme-switcher";
import { ThemeProvider } from "@/components/theme-provider";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<div className="fixed bottom-6 right-12 z-50">
				<ThemeToggler />
			</div>
			<main>
				<div className="w-full flex flex-col place-items-center self-center max-w-6xl">
					<div className="flex justify-between items-center">
						<Accordion type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger>
									Something here to add new tasks
								</AccordionTrigger>
								<AccordionContent>
									Write down a task description
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>

					<TaskTable />
				</div>
			</main>
		</ThemeProvider>
	);
}
