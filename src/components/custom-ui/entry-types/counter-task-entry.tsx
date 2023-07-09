import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transition } from "@headlessui/react";
import { LucideCheck, LucideMinus, LucidePlus, Undo } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

// method to convert a date into a normalised string
const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

export default function CounterTaskEntry({
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
	// method to take in the new entries
	setTaskEntries: (dailyEntries: { [key: string]: DailyUpdate }) => void;
	isShown: boolean;
}) {
	const [completed, setCompleted] = useState<boolean>(false);
	const [count, setCount] = useState<number>(0);
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
				counter: count,
				moodDescription: note,
			},
		});
	}, [completed, note, count]);

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
		setCount(taskEntries[dateStr]?.counter ?? 0);
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
					<Label htmlFor="completed">
						How many times have you completed this today?
					</Label>
					<div className="flex items-center space-x-2">
						<Input
							type="number"
							min={0}
							value={count}
							id="completed"
							onChange={(e) => {
								setCount(Number(e.target.value));
							}}
						/>
						<Button
							onClick={() => {
								setCount(count + 1);
							}}
						>
							<LucidePlus />
						</Button>
						<Button
							disabled={count <= 0}
							onClick={() => {
								let newVal = count - 1;
								if (newVal < 0) newVal = 0;
								setCount(newVal);
							}}
						>
							<LucideMinus />
						</Button>
					</div>

					<div className="flex items-center space-x-2 mt-4">
						<Button
							className="flex-grow"
							disabled={count <= 0}
							onClick={() => {
								setCompleted(!completed);
							}}
						>
							{!completed ? (
								<>
									<LucideCheck /> All done!
								</>
							) : (
								<>
									<Undo /> Not done yet!
								</>
							)}
						</Button>
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
