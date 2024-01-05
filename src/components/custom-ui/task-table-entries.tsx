"use client";

import { Icon } from "@iconify/react";
import useLocalStorage from "use-local-storage";
import { v4 as uuidv4 } from "uuid";
import { TableBody } from "../ui/table";
import TaskEntryRow from "./task-entry-row";

export default function TaskTableEntries() {
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

	return (
		<TableBody>
			{entries.map((entry: Entry, index: number) => {
				if (!entry.uuid) entry.uuid = uuidv4();
				if (!entry.entryType) entry.entryType = "mood";
				return <TaskEntryRow key={`entry-${index}`} entry={entry} />;
			})}
		</TableBody>
	);
}
