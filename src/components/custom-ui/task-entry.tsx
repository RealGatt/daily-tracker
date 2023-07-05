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
} from "lucide-react";
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import MoodTaskEntry from "./entry-types/mood-task-entry";
import DailyTaskEntry from "./entry-types/daily-task-entry";

// method to convert a date into a normalised string
const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

// function to get today at midnight
const getToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};

export default function TaskEntry({ entry }: { entry: Entry }) {
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
				setTaskEntries={(e: any) => {
					console.log(e);
					setTaskEntries(e);
				}}
			/>
		);
	}
	if (entry.entryType === "daily") {
		taskEntry = (
			<DailyTaskEntry
				entry={entry}
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
				<TableCell className="w-[50px] pl-5">{taskIcon}</TableCell>
				<TableCell className="font-bold">
					<div>{entry.title}</div>
					<div className="text-xs font-normal">
						{entry.description}
					</div>
					<div className="flex flex-row place-content-center gap-2">
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
										(m) => m.mood === dailyTaskEntry.mood
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
										<span key={`${entry.uuid}-${dayStr}`}>
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
										<span key={`${entry.uuid}-${dayStr}`}>
											<LucideCircle
												style={{
													fill: "green",
												}}
											/>
										</span>
									);
								case "counter":
									if (
										!dailyTaskEntry.counter ||
										dailyTaskEntry.counter > 0
									)
										return (
											<span
												key={`${entry.uuid}-${dayStr}`}
											>
												<LucideCircleDashed />
											</span>
										);
									return (
										<span key={`${entry.uuid}-${dayStr}`}>
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
				className={"min-h-[70vh] h-4/6"}
				show={open}
				enter="transition-all ease-in-out duration-500 delay-[200ms]"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-all ease-in-out duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="flex flex-row gap-4 min-h-full h-4/6">
					<Transition
						className="absolute z-5 bg-white"
						show={open && calendarOpen}
						enter="transition-all ease-in-out duration-500 delay-[200ms]"
						enterFrom="translate-x-[-100%] z-5"
						enterTo="translate-x-0 z-5"
						leave="transition-all ease-in-out duration-300 z-5"
						leaveFrom="translate-x-0 z-5"
						leaveTo="translate-x-[-150%] z-5"
					>
						<div className="z-5 bg-background">
							<Button
								className="absolute z-5 right-[-10px] top-2"
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
						enter="transition-all ease-in-out duration-500 delay-[200ms]"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-all ease-in-out duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="absolute">
							<div id="taskSpecific">
								<Button
									className="absolute left-[-5%] md:!left-0 top-2 z-2"
									onClick={() => {
										setCalendarOpen(!calendarOpen);
									}}
								>
									<LucideCalendar />
								</Button>

								<div className="flex flex-col py-6 pl-12 pr-8">
									{taskEntry}
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</Transition>
		</>
	);
}
