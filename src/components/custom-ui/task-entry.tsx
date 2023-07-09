import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import useLocalStorage from "@/lib/localStorage";
import { getDaysOfWeek } from "@/lib/thisWeek";
import { Mood } from "@/schema/Mood";
import { Transition } from "@headlessui/react";
import {
	LucideArrowDownFromLine,
	LucideArrowUp10,
	LucideCalendar,
	LucideCalendarDays,
	LucideCircle,
	LucideCircleDashed,
	LucideCircleDollarSign,
	LucideHeartHandshake,
	LucideTrash2,
} from "lucide-react";
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import CounterTaskEntry from "./entry-types/counter-task-entry";
import DailyTaskEntry from "./entry-types/daily-task-entry";
import MoodTaskEntry from "./entry-types/mood-task-entry";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

// method to convert a date into a normalised string
const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

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

	const [open, setIsOpen] = useState(false);
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
				isShown={open && !calendarOpen}
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
				isShown={open && !calendarOpen}
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
				isShown={open && !calendarOpen}
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

	let taskIcon = <LucideCircleDollarSign />;
	if (entry.entryType === "mood") {
		taskIcon = <LucideHeartHandshake />;
	}
	if (entry.entryType === "daily") {
		taskIcon = <LucideCalendarDays />;
	}
	if (entry.entryType === "counter") {
		taskIcon = <LucideArrowUp10 />;
	}
	return (
		<>
			<TableRow>
				<TableCell className="font-bold">
					<div>{entry.title}</div>
					<div className="text-xs font-normal">
						{entry.description}
					</div>
					<div className="flex flex-row">
						<div className="">{taskIcon}</div>
						<div className="flex-grow place-self-end flex flex-row place-content-center gap-2">
							{getDaysOfWeek().map((day) => {
								const dayStr = dateToNormalisedString(day);
								// get the mood for that day
								const dailyTaskEntry = taskEntries[dayStr] ?? {
									mood: undefined,
									completed: false,
									counter: 0,
								};
								switch (entry.entryType) {
									case "mood":
										const moodObj = Mood.find(
											(m) =>
												m.mood === dailyTaskEntry.mood
										);
										if (
											!dailyTaskEntry.mood ||
											dailyTaskEntry.mood === "..."
										) {
											return (
												<span
													key={`${entry.uuid}-${dayStr}`}
												>
													<LucideCircleDashed />
												</span>
											);
										}
										return (
											<span
												key={`${entry.uuid}-${dayStr}`}
											>
												<LucideCircle
													style={{
														fill: moodObj?.color,
													}}
												/>
											</span>
										);
									case "daily":
										if (!dailyTaskEntry.completed)
											return (
												<span
													key={`${entry.uuid}-${dayStr}`}
												>
													<LucideCircleDashed />
												</span>
											);
										return (
											<span
												key={`${entry.uuid}-${dayStr}`}
											>
												<LucideCircle
													style={{
														fill: "green",
													}}
												/>
											</span>
										);
									case "counter":
										if (!dailyTaskEntry.completed)
											return (
												<span
													key={`${entry.uuid}-${dayStr}`}
												>
													<LucideCircleDashed />
												</span>
											);
										return (
											<span
												key={`${entry.uuid}-${dayStr}`}
											>
												<LucideCircle
													style={{
														fill: "green",
													}}
												/>
											</span>
										);
								}
								return <></>;
							})}
						</div>
					</div>
				</TableCell>
				<TableCell className="w-[50px] pl-5">
					<button
						className={`cursor-pointer transform transition-transform ${
							open ? "rotate-180" : ""
						}`}
					>
						<LucideArrowDownFromLine
							onClick={(e) => {
								e.preventDefault();
								setIsOpen(!open);
							}}
						/>
					</button>
				</TableCell>
			</TableRow>
			<Transition
				className={"min-h-[400px] h-4/6"}
				show={open}
				enter="transition-all ease-in-out duration-500 delay-[200ms]"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-all ease-in-out duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Transition
					className=""
					show={open && calendarOpen}
					enter="transition-all ease-in-out duration-500 delay-[200ms]"
					enterFrom="translate-x-[-100%] z-5"
					enterTo="translate-x-0 z-5"
					leave="transition-all ease-in-out duration-500 z-5 "
					leaveFrom="translate-x-0 z-5"
					leaveTo="translate-x-[-150%] z-5"
					unmount={false}
				>
					<div className="absolute z-5 ">
						<Button
							className="absolute z-5 right-[-25px] top-2"
							onClick={() => {
								setCalendarOpen(!calendarOpen);
							}}
						>
							<LucideCalendar />
						</Button>
						<div className="flex flex-col py-6 px-4 ">
							<Calendar
								mode="single"
								required
								selected={date}
								onSelect={(e) => {
									console.log(`Selected`, e);
									setCalendarOpen(false);
									setPreviousDate(date);
									setDate(e as Date);
								}}
								className="rounded-md border"
							/>
						</div>
					</div>
				</Transition>
				<Transition
					show={open && !calendarOpen}
					unmount={false}
					className={"flex flex-col gap-4 min-h-full h-4/6 w-full"}
					enter="transition-all ease-in-out duration-500 delay-[200ms]"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-all ease-in-out duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="flex-grow">
						<div className="relative">
							<Button
								className="relative left-[-5%] md:!left-0 top-2 z-2"
								onClick={() => {
									setCalendarOpen(!calendarOpen);
								}}
							>
								<LucideCalendar />
							</Button>

							<Dialog>
								<DialogTrigger>
									<Button className="absolute right-[-50px] top-2 z-2">
										<LucideTrash2 />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Are you sure?</DialogTitle>
										<DialogDescription>
											Once you delete this task, it is not
											recoverable
										</DialogDescription>
										<DialogFooter>
											<DialogTrigger>
												Cancel
											</DialogTrigger>
											<DialogTrigger
												onClick={(e) => {
													e.preventDefault();
												}}
											>
												<Button
													className="bg-red-500 hover:bg-red-600"
													onClick={() => {
														setIsOpen(false);
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

						<div className="flex flex-col py-6 pl-12 pr-8">
							{taskEntry}
						</div>
					</div>
				</Transition>
			</Transition>
		</>
	);
}
