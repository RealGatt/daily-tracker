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
import ConfettiExplosion from "react-confetti-explosion";

// method to convert a date into a normalised string
const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

export default function MoodTaskEntry({
	entry,
	date,
	previousDate,
	taskEntries,
	isShown,
	setTaskEntries,
}: {
	entry: Entry;
	date: Date;
	previousDate: Date;
	isShown: boolean;
	taskEntries: {
		[key: string]: DailyUpdate;
	};
	// method to take in the new entries
	setTaskEntries: (dailyEntries: { [key: string]: DailyUpdate }) => void;
}) {
	const [mood, setMood] = useState<string>();
	const [moodNote, setMoodNote] = useState<string>();
	const stringDateCache = useMemo(() => dateToNormalisedString(date), [date]);
	const moods: JSX.Element[] = [];
	Mood.forEach((mood) => {
		moods.push(<SelectItem value={mood.mood}>{mood.mood}</SelectItem>);
	});
	const [showConfetti, setShowConfetti] = useState<boolean>(false);
	useEffect(() => {
		if (mood && mood != "..." && isShown) {
			setShowConfetti(true);
			setTimeout(() => {
				setTimeout(() => {
					setShowConfetti(false);
				}, 2000);
			}, 3000);
		} else {
			setShowConfetti(false);
		}
	}, [mood, isShown]);

	useEffect(() => {
		const dateStr = dateToNormalisedString(date);
		setTaskEntries({
			...taskEntries,
			[dateStr]: {
				mood: mood,
				moodDescription: moodNote,
			},
		});
		console.log(`Saved mood for mood:${entry.uuid}-${dateStr}`, mood);
	}, [mood, moodNote]);

	useEffect(() => {
		const previousDateStr = dateToNormalisedString(
			previousDate ?? new Date()
		);
		setTaskEntries({
			...taskEntries,
			[previousDateStr]: {
				mood: mood,
				moodDescription: moodNote,
			},
		});

		const dateStr = dateToNormalisedString(date);
		const newMood = taskEntries[dateStr]?.mood ?? "...";
		setMood(newMood);
		setMoodNote(taskEntries[dateStr]?.moodDescription ?? "");
		console.log(`Loaded mood for mood:${entry.uuid}-${dateStr}`, newMood);
	}, [date]);

	useEffect(() => {
		const dateStr = dateToNormalisedString(date);
		const newMood = taskEntries[dateStr]?.mood ?? "...";
		setMood(newMood);
		setMoodNote(taskEntries[dateStr]?.moodDescription ?? "");
		console.log(
			`LOADED PAGE - Loaded mood for mood:${entry.uuid}-${dateStr}`,
			newMood
		);
	}, []);

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
				<h3 className="text-base">
					A{determineArticle(mood ?? "...")}{" "}
					{mood != "Other"
						? convertToPastTense(mood ?? "...")
						: "Interesting"}{" "}
					task today...
				</h3>
			</span>
			<div className="flex flex-col gap-4">
				<div>
					<Label>What was your mood during this task today?</Label>
					<Select
						onValueChange={setMood}
						value={mood ?? taskEntries[stringDateCache]?.mood}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Mood" />
						</SelectTrigger>
						<SelectContent className="w-full max-h-60">
							{moods}
						</SelectContent>
					</Select>

					{showConfetti && isShown && (
						<ConfettiExplosion
							particleCount={50}
							particleSize={6}
							colors={[
								"#ff0000",
								"#00ff00",
								"#0000ff",
								"#ffff00",
								"#00ffff",
								"#ff00ff",
							]}
							force={0.5}
						/>
					)}
					<Transition
						show={mood === "Other"}
						enter="transition-all ease-in-out duration-500 delay-[200ms]"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-all ease-in-out duration-500 delay-[200ms]"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Label>{"Let's"} be more specific...</Label>
						<Input
							value={
								moodNote ??
								taskEntries[stringDateCache]?.moodDescription ??
								""
							}
							onChange={(e) => {
								setMoodNote(e.target.value);
							}}
						/>
					</Transition>
				</div>
			</div>
		</>
	);
}
