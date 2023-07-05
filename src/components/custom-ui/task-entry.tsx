import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { determineArticle } from "@/lib/anOrA";
import useLocalStorage from "@/lib/localStorage";
import { convertToPastTense } from "@/lib/pasttenser";
import { Mood } from "@/schema/Mood";
import { Transition } from "@headlessui/react";
import {
	LucideArrowDownFromLine,
	LucideCalendar,
	LucideCircle,
	LucideCircleDashed,
} from "lucide-react";
import { JSX, useEffect, useMemo, useState } from "react";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { TableCell, TableRow } from "../ui/table";
import { getDaysOfWeek } from "@/lib/thisWeek";

// method to convert a date into a normalised string
const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

// function to get today at midnight
const getToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};

export default function TaskEntry({ entry }: { entry: Entry }) {
	const [entryMoods, setEntryMoods] = useLocalStorage<{
		[key: string]: DailyUpdate;
	}>(`dailyupdates:${entry.uuid}`, {});

	const [open, setIsOpen] = useState(false);
	const [date, setDate] = useState<Date>(getToday());
	const [previousDate, setPreviousDate] = useState<Date>(getToday());
	const [calendarOpen, setCalendarOpen] = useState(true);
	const [mood, setMood] = useState("...");
	const [moodNote, setMoodNote] = useState("");
	const stringDateCache = useMemo(() => dateToNormalisedString(date), [date]);
	const moods: JSX.Element[] = [];
	Mood.forEach((mood) => {
		moods.push(<SelectItem value={mood.mood}>{mood.mood}</SelectItem>);
	});

	useEffect(() => {
		const dateStr = dateToNormalisedString(date);
		setEntryMoods({
			...entryMoods,
			[dateStr]: {
				mood: mood,
				moodDescription: moodNote,
			},
		});
		console.log(`Saved mood for mood:${entry.uuid}-${dateStr}`, mood);
	}, [mood, moodNote]);

	useEffect(() => {
		console.log("Date changed", previousDate, date);
		const previousDateStr = dateToNormalisedString(
			previousDate ?? new Date()
		);
		setEntryMoods({
			...entryMoods,
			[previousDateStr]: {
				mood: mood,
				moodDescription: moodNote,
			},
		});

		const dateStr = dateToNormalisedString(date);
		const newMood = entryMoods[dateStr]?.mood ?? "...";
		setMood(newMood);
		setMoodNote(entryMoods[dateStr]?.moodDescription ?? "");
		console.log(`Loaded mood for mood:${entry.uuid}-${dateStr}`, newMood);
	}, [date]);

	useEffect(() => {
		const dateStr = dateToNormalisedString(date);
		const newMood = entryMoods[dateStr]?.mood ?? "...";
		setMood(newMood);
		setMoodNote(entryMoods[dateStr]?.moodDescription ?? "");
		console.log(
			`LOADED PAGE - Loaded mood for mood:${entry.uuid}-${dateStr}`,
			newMood
		);
	}, []);

	console.log(entryMoods, stringDateCache);

	if (typeof window === "undefined") return <></>;
	return (
		<>
			<TableRow>
				<TableCell className="font-bold">
					<div>{entry.title}</div>
					<div className="text-xs font-normal">
						{entry.description}
					</div>
					<div className="flex flex-row place-content-center gap-2">
						{getDaysOfWeek().map((day) => {
							const dayStr = dateToNormalisedString(day);
							// get the mood for that day
							const mood = entryMoods[dayStr]?.mood ?? "...";
							const moodObj = Mood.find((m) => m.mood === mood);
							if (mood === "...") {
								return (
									<span key={`${entry.uuid}-${dayStr}`}>
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
						enter="transition-all ease-in-out duration-500 delay-[200ms]"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-all ease-in-out duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="absolute">
							<div>
								<Button
									className="absolute left-[-5%] md:!left-0 top-2 z-2"
									onClick={() => {
										setCalendarOpen(!calendarOpen);
									}}
								>
									<LucideCalendar />
								</Button>
								<div className="flex flex-col py-6 pl-12 pr-8">
									<span className="py-6 ">
										<h3 className="underline font-bold text-lg">
											{date.toLocaleDateString("en-US", {
												weekday: "long",
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</h3>
										<h3 className="text-base">
											A{determineArticle(mood)}{" "}
											{mood != "Other"
												? convertToPastTense(mood)
												: "Interesting"}{" "}
											task today...
										</h3>
									</span>
									<div className="flex flex-col gap-4">
										<div>
											<Label>
												What was your mood during this
												task today?
											</Label>
											<Select
												onValueChange={setMood}
												value={mood}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Mood" />
												</SelectTrigger>
												<SelectContent className="w-full max-h-60">
													{moods}
												</SelectContent>
											</Select>
											<Transition
												show={mood === "Other"}
												enter="transition-all ease-in-out duration-500 delay-[200ms]"
												enterFrom="opacity-0"
												enterTo="opacity-100"
												leave="transition-all ease-in-out duration-500 delay-[200ms]"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Label>
													{"Let's"} be more
													specific...
												</Label>
												<Input
													value={moodNote}
													onChange={(e) => {
														setMoodNote(
															e.target.value
														);
													}}
												/>
											</Transition>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</Transition>
		</>
	);
}
