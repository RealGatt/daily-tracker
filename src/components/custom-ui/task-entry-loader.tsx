"use client";
import { Table, TableHead, TableRow } from "@/components/ui/table";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import { v4 as uuidv4 } from "uuid";
import TaskEntry from "./task-entry";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TaskEntryLoader(params: { taskId: string }) {
	const router = useRouter();
	const [entries, setEntries] = useLocalStorage<Entry[]>("entries", [
		{
			uuid: uuidv4(),
			title: "Daily Task Tracker",
			description: "Track a daily task",
			entryType: "daily",
		},
	]);

	if (entries.length == 0) {
		return (
			<div className="p-8 text-xl">
				You have not created any tasks! Click the{" "}
				<Icon icon="mdi:cog" className="inline h-6 w-6" /> to start!
			</div>
		);
	}

	// fidn the task with the id
	const task = entries.find((e) => e.uuid == params.taskId);
	console.log(entries, task);
	if (!task) {
		toast.error("Task not found");
		router.push("/");
		return (
			<div className="p-8 text-xl">
				Task not found with ID {params.taskId}. Redirecting you back
				home now.
			</div>
		);
	}

	return (
		<>
			<Link href="/">
				<Table>
					<TableRow>
						<TableHead>
							<Icon
								icon="mdi:keyboard-backspace"
								className="h-6 w-6 inline"
							/>{" "}
							Back
						</TableHead>
					</TableRow>
				</Table>
			</Link>
			<TaskEntry
				entry={task}
				deleteRequest={() => {
					// redirect to "/" and remove the entry from localStorage
					setEntries(entries.filter((e) => e.uuid != task.uuid));
					router.push("/");
				}}
			/>
		</>
	);
}
