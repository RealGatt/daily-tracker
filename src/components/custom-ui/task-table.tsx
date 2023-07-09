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
import useLocalStorage from "@/lib/localStorage";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import TaskEntry from "./task-entry";

export default function TaskTable() {
	const [taskName, setTaskName] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [taskType, setTaskType] = useState("daily");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [entries, setEntries] = useLocalStorage<Entry[]>("entries", [
		{
			uuid: uuidv4(),
			title: "Daily Mood Tracker",
			description: "Track your mood throughout the day",
			entryType: "mood",
		},
	]);
	if (typeof window === "undefined") return <></>;

	return (
		<>
			<div className="flex justify-between items-center mt-4">
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
									<RadioGroupItem value="daily" id="daily" />
									<Label htmlFor="daily">Daily Task</Label>
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
									<RadioGroupItem value="mood" id="mood" />
									<Label htmlFor="mood">Mood Tracker</Label>
								</div>
							</RadioGroup>
						</div>

						<DialogFooter>
							<Button
								type="submit"
								onClick={() => {
									setDialogOpen(false);
									setEntries([
										...entries,
										{
											uuid: uuidv4(),
											title: taskName,
											description: taskDescription,
											entryType: taskType as
												| "daily"
												| "counter"
												| "mood",
										},
									]);
								}}
							>
								Create
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold">Task</TableHead>
						<TableHead className="w-[50px]">Expand</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{entries.map((entry: Entry, index: number) => {
						if (!entry.uuid) entry.uuid = uuidv4();
						if (!entry.entryType) entry.entryType = "mood";
						return (
							<TaskEntry
								key={`entry-${index}`}
								entry={entry}
								deleteRequest={(entry) => {
									console.log(`deleted`, entry);
									setEntries(
										entries.filter(
											(e) => e.uuid !== entry.uuid
										)
									);
								}}
							/>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
}
