"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useLocalStorage from "use-local-storage";
import { v4 as uuidv4 } from "uuid";

export default function NewTaskDialog() {
	const router = useRouter();
	const [taskName, setTaskName] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [taskType, setTaskType] = useState("daily");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [entries, setEntries] = useLocalStorage<Entry[]>("entries", [
		{
			uuid: uuidv4(),
			title: "Daily Task Tracker",
			description: "Track a daily task",
			entryType: "daily",
		},
	]);

	// convert old "mood" entries to "daily" entries
	if (entries.find((e) => e.entryType === "mood")) {
		setEntries(
			entries.map((e) => {
				if (e.entryType === "mood") {
					e.entryType = "daily";
				}
				return e;
			})
		);

		toast("Mood entries have been converted to daily entries");
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger>
				<Button variant="outline">
					<Icon
						icon="mdi:plus-circle-outline"
						className="h-6 w-6 mr-2"
					/>
					Add new Task
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
						required
						placeholder="Task Name"
					/>
					<Input
						id="taskDesc"
						onChange={(e) => {
							setTaskDescription(e.target.value);
						}}
						required
						placeholder="Task Description"
					/>
					<RadioGroup
						defaultValue="daily"
						onValueChange={(e) => {
							setTaskType(e);
						}}
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="daily" id="daily" />
							<Label htmlFor="daily">Daily Task</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="counter" id="counter" />
							<Label htmlFor="counter">Counter Task</Label>
						</div>
					</RadioGroup>
				</div>

				<DialogFooter>
					<Button
						type="submit"
						onClick={() => {
							// validate input
							if (!taskName) {
								toast("Please enter a task name");
								return;
							}
							if (!taskDescription) {
								toast("Please enter a task description");
								return;
							}
							setDialogOpen(false);
							const uuid = uuidv4();
							setEntries([
								...entries,
								{
									uuid,
									title: taskName,
									description: taskDescription,
									entryType: taskType as "daily" | "counter",
								},
							]);
							router.push(`/${uuid}`);
						}}
					>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
