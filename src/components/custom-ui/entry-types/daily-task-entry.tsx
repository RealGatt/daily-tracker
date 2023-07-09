import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transition } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

// method to convert a date into a normalised string
const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

export default function DailyTaskEntry({
	entry,
	date,
	previousDate,
	taskEntries,
	setTaskEntries,
	isShown,
}: {
	entry: Entry;
	date: Date;
	previousDate: Date;
	taskEntries: {
		[key: string]: DailyUpdate;
	};
	isShown: boolean;
	// method to take in the new entries
	setTaskEntries: (dailyEntries: { [key: string]: DailyUpdate }) => void;
}) {
	const [completed, setCompleted] = useState<boolean>(false);
	const [note, setNote] = useState<string>();
	const stringDateCache = useMemo(() => dateToNormalisedString(date), [date]);

	const [showConfetti, setShowConfetti] = useState<boolean>(false);
	useEffect(() => {
		if (completed && isShown) {
			setShowConfetti(true);
		} else {
			setShowConfetti(false);
		}
	}, [completed, isShown]);

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
					<div className="flex items-center space-x-2">
						<Label htmlFor="completed">
							Did you complete this today?
						</Label>
						<Checkbox
							id="completed"
							onCheckedChange={(checked) => {
								setCompleted(checked as boolean);
							}}
							checked={
								completed ??
								taskEntries[stringDateCache]?.completed ??
								false
							}
						/>
					</div>

					{showConfetti && isShown && (
						<ConfettiExplosion
							onComplete={() => {
								setShowConfetti(false);
							}}
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
