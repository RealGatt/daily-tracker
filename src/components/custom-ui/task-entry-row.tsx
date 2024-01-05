import { Icon } from "@iconify/react";
import useLocalStorage from "use-local-storage";
import { TableCell, TableRow } from "../ui/table";
import TaskEntrySummaryWeek from "./task-entry-week-summary-dots";
import { useRouter } from "next/navigation";

export default function TaskEntryRow({ entry }: { entry: Entry }) {
	const router = useRouter();
	const [taskEntries, setTaskEntries] = useLocalStorage<{
		[key: string]: DailyUpdate;
	}>(`dailyupdates:${entry.uuid}`, {});

	let taskIcon = (
		<Icon icon="lucide:circle-dollar-sign" className="h-6 w-6" />
	);
	if (entry.entryType === "mood") {
		taskIcon = <Icon icon="lucide:heart-handshake" className="h-6 w-6" />;
	}
	if (entry.entryType === "daily") {
		taskIcon = <Icon icon="lucide:calendar-days" className="h-6 w-6" />;
	}
	if (entry.entryType === "counter") {
		taskIcon = <Icon icon="lucide:arrow-up-1-0" className="h-6 w-6" />;
	}
	router.prefetch(`/${entry.uuid}`);
	return (
		<TableRow
			className="cursor-pointer"
			onClick={() => {
				router.push(`/${entry.uuid}`);
			}}
		>
			<TableCell className="font-bold">
				<div>{entry.title}</div>
				<div className="text-xs font-normal">{entry.description}</div>
				<div className="flex flex-row">
					<div className="">{taskIcon}</div>
					<div className="flex-grow place-self-end flex flex-row place-content-center gap-2">
						<TaskEntrySummaryWeek
							entry={entry}
							taskEntries={taskEntries}
						/>
					</div>
				</div>
			</TableCell>
		</TableRow>
	);
}
