"use client";

import TaskTable from "@/components/custom-ui/task-table";
import { ThemeToggler } from "@/components/custom-ui/theme-switcher";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
	const [taskName, setTaskName] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [taskType, setTaskType] = useState("daily");
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<div className="fixed bottom-6 right-12 z-50">
				<ThemeToggler />
			</div>
			<main>
				<div className="w-full flex flex-col place-items-center self-center max-w-6xl">
					<div className="flex justify-between items-center mt-4">
						<Dialog>
							<DialogTrigger>
								<Button>
									<PlusCircle></PlusCircle>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Create a new task</DialogTitle>
								</DialogHeader>
								<div className="flex flex-col gap-4">
									<Input
										id="taskName"
										onChange={(e) => {
											setTaskName(e.target.value);
										}}
										placeholder="Task Name"
									/>
									<Input
										id="taskDesc"
										onChange={(e) => {
											setTaskDescription(e.target.value);
										}}
										placeholder="Task Description"
									/>
									<RadioGroup
										defaultValue="daily"
										onValueChange={(e) => {
											setTaskType(e);
										}}
									>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="daily"
												id="daily"
											/>
											<Label htmlFor="daily">
												Daily Task
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="counter"
												id="counter"
											/>
											<Label htmlFor="counter">
												Counter Task
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="mood"
												id="mood"
											/>
											<Label htmlFor="mood">
												Mood Tracker
											</Label>
										</div>
									</RadioGroup>
								</div>

								<DialogFooter>
									<Button type="submit">Create</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<TaskTable />
				</div>
			</main>
		</ThemeProvider>
	);
}
