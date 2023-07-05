import { Input } from "@/components/ui/input";
import { determineArticle } from "@/lib/anOrA";
import { convertToPastTense } from "@/lib/pasttenser";
import { Mood } from "@/schema/Mood";
import { Transition } from "@headlessui/react";
import { JSX, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { set } from "date-fns";

// method to convert a date into a normalised string
const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

export default function DailyTaskEntry({
	entry,
	date,
	previousDate,
	taskEntries,
	setTaskEntries,
}: {
	entry: Entry;
	date: Date;
	previousDate: Date;
	taskEntries: {
		[key: string]: DailyUpdate;
	};
	// method to take in the new entries
	setTaskEntries: (dailyEntries: { [key: string]: DailyUpdate }) => void;
}) {
	const [completed, setCompleted] = useState<boolean>(false);
	const [note, setNote] = useState<string>();
	const stringDateCache = useMemo(() => dateToNormalisedString(date), [date]);
	const moods: JSX.Element[] = [];
	Mood.forEach((mood) => {
		moods.push(<SelectItem value={mood.mood}>{mood.mood}</SelectItem>);
	});

	useEffect(() => {
		const dateStr = dateToNormalisedString(date);
		setTaskEntries({
			...taskEntries,
			[dateStr]: {
				completed: completed,
				moodDescription: note,
			},
		});
	}, [completed, note]);

	useEffect(() => {
		console.log("Date changed", previousDate, date);
		const previousDateStr = dateToNormalisedString(
			previousDate ?? new Date()
		);
		setTaskEntries({
			...taskEntries,
			[previousDateStr]: {
				completed: completed,
				moodDescription: note,
			},
		});

		const dateStr = dateToNormalisedString(date);

		setCompleted(
			taskEntries[dateStr]
				? !!(taskEntries[dateStr].completed as boolean)
				: false
		);
		setNote(taskEntries[dateStr]?.moodDescription ?? "");
	}, [date]);

	useEffect(() => {
		const dateStr = dateToNormalisedString(date);
		setCompleted(
			taskEntries[dateStr]
				? !!(taskEntries[dateStr].completed as boolean)
				: false
		);
		setNote(taskEntries[dateStr]?.moodDescription ?? "");
	}, []);

	console.log(taskEntries, stringDateCache);
	return (
		<>
			<span className="py-6 ">
				<h3 className="underline font-bold text-lg">
					{date.toLocaleDateString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</h3>
			</span>
			<div className="flex flex-col gap-4">
				<div>
					<Label>Did you complete the task today?</Label>
					<Checkbox
						onCheckedChange={(checked) => {
							setCompleted(checked as boolean);
						}}
						checked={
							completed ??
							taskEntries[stringDateCache]?.completed ??
							false
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Mood" />
						</SelectTrigger>
						<SelectContent className="w-full max-h-60">
							{moods}
						</SelectContent>
					</Checkbox>
					<Transition
						show={completed}
						enter="transition-all ease-in-out duration-500 delay-[200ms]"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-all ease-in-out duration-500 delay-[200ms]"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Label>Feel free to add notes!</Label>
						<Input
							value={
								note ??
								taskEntries[stringDateCache]?.moodDescription ??
								""
							}
							onChange={(e) => {
								setNote(e.target.value);
							}}
						/>
					</Transition>
				</div>
			</div>
		</>
	);
}
