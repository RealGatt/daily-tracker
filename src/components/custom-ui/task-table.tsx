import useLocalStorage from "@/lib/localStorage";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import TaskEntry from "./task-entry";
import { v4 as uuidv4 } from "uuid";

export default function TaskTable() {
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
