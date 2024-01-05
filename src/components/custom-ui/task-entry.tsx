import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Icon } from "@iconify/react";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import CounterTaskEntry from "./entry-types/counter-task-entry";
import DailyTaskEntry from "./entry-types/daily-task-entry";
import MoodTaskEntry from "./entry-types/mood-task-entry";
import TaskEntrySummaryWeek from "./task-entry-week-summary-dots";

// function to get today at midnight
const getToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};

export default function TaskEntry({
	entry,
	deleteRequest,
}: {
	entry: Entry;
	deleteRequest: (entry: Entry) => void;
}) {
	const [taskEntries, setTaskEntries] = useLocalStorage<{
		[key: string]: DailyUpdate;
	}>(`dailyupdates:${entry.uuid}`, {});
	const [date, setDate] = useState<Date>(getToday());
	const [previousDate, setPreviousDate] = useState<Date>(getToday());
	const [calendarOpen, setCalendarOpen] = useState(true);
	if (typeof window === "undefined") return <></>;

	let taskEntry = <div>Unknown Task Type... {entry.entryType}</div>;
	if (entry.entryType === "mood") {
		taskEntry = (
			<MoodTaskEntry
				entry={entry}
				date={date}
				previousDate={previousDate}
				taskEntries={taskEntries}
				isShown={!calendarOpen}
				setTaskEntries={(e: any) => {
					console.log(e);
					setTaskEntries(e);
				}}
			/>
		);
	} else if (entry.entryType === "daily") {
		taskEntry = (
			<DailyTaskEntry
				entry={entry}
				date={date}
				previousDate={previousDate}
				taskEntries={taskEntries}
				isShown={!calendarOpen}
				setTaskEntries={(e: any) => {
					console.log(e);
					setTaskEntries(e);
				}}
			/>
		);
	} else if (entry.entryType === "counter") {
		taskEntry = (
			<CounterTaskEntry
				entry={entry}
				isShown={!calendarOpen}
				date={date}
				previousDate={previousDate}
				taskEntries={taskEntries}
				setTaskEntries={(e: any) => {
					console.log(e);
					setTaskEntries(e);
				}}
			/>
		);
	}

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

	const completedDays = Object.entries(taskEntries).filter(
		([key, value]) => value.completed
	);
	console.log(`completed`, completedDays);
	return (
		<div className="px-4 py-4 flex flex-col gap-4">
			<div className="flex flex-row gap-2 place-content-evenly">
				<div className="flex flex-col flex-grow">
					<div>{entry.title}</div>
					<div className="text-xs font-normal">
						{entry.description}
					</div>
					<div className="flex flex-row">
						<div>{taskIcon}</div>
					</div>
				</div>
				<Dialog>
					<DialogTrigger>
						<Button variant="destructive" size={"icon"}>
							<Icon icon="lucide:trash-2" className="h-6 w-6" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure?</DialogTitle>
							<DialogDescription>
								Once you delete this task, it is not recoverable
							</DialogDescription>
							<DialogFooter>
								<DialogTrigger>Cancel</DialogTrigger>
								<DialogTrigger
									onClick={(e: any) => {
										e.preventDefault();
									}}
								>
									<Button
										className="bg-red-500 hover:bg-red-600"
										onClick={() => {
											setCalendarOpen(false);
											deleteRequest(entry);
										}}
									>
										Delete
									</Button>
								</DialogTrigger>
							</DialogFooter>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>

			<div className="flex-grow">
				<TaskEntrySummaryWeek entry={entry} taskEntries={taskEntries} />
			</div>
			<div className="flex flex-row place-content-center">
				<Calendar
					mode="single"
					required
					selected={date}
					onSelect={(e: any) => {
						console.log(`Selected`, e);
						setCalendarOpen(false);
						setPreviousDate(date);
						setDate(e as Date);
					}}
					className="rounded-md border"
					// give colours to each day based on the task entry (via react-day-picker)
					modifiersStyles={{
						completed: { color: "green" },
					}}
					modifiers={{
						completed: completedDays.map((e) => {
							const date = new Date(e[0]);
							date.setHours(0, 0, 0, 0);
							//add 1 day
							date.setDate(date.getDate() + 1);
							return date;
						}),
					}}
				/>
			</div>
			<div className="flex-grow">
				<div className="flex flex-col ">{taskEntry}</div>
			</div>
		</div>
	);
}
