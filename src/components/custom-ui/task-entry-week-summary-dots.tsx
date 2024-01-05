import { getDaysOfWeek } from "@/lib/thisWeek";
import { Mood } from "@/schema/Mood";
import { Icon } from "@iconify/react";

const dateToNormalisedString = (date: Date) => date.toISOString().split("T")[0];

export default function TaskEntrySummaryWeek(props: {
	entry: Entry;
	taskEntries: { [key: string]: DailyUpdate };
}) {
	const { entry, taskEntries } = props;
	return (
		<div className=" flex flex-row place-content-center gap-2">
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
								<span key={`${entry.uuid}-${dayStr}`}>
									<Icon
										icon="lucide:circle-dashed"
										className="h-6 w-6"
									/>
								</span>
							);
						}
						return (
							<span key={`${entry.uuid}-${dayStr}`}>
								<Icon
									icon="lucide:circle"
									className="h-6 w-6"
									color={moodObj?.color}
								/>
							</span>
						);
					case "daily":
						if (!dailyTaskEntry.completed)
							return (
								<span key={`${entry.uuid}-${dayStr}`}>
									<Icon
										icon="lucide:circle-dashed"
										className="h-6 w-6"
									/>
								</span>
							);
						return (
							<span key={`${entry.uuid}-${dayStr}`}>
								<Icon
									icon="lucide:circle"
									className="h-6 w-6 fill-green-500"
									color="green"
								/>
							</span>
						);
					case "counter":
						if (!dailyTaskEntry.completed)
							return (
								<span key={`${entry.uuid}-${dayStr}`}>
									<Icon
										icon="lucide:circle-dashed"
										className="h-6 w-6"
									/>
								</span>
							);
						return (
							<span key={`${entry.uuid}-${dayStr}`}>
								<Icon
									icon="lucide:circle"
									className="h-6 w-6"
									color={"green"}
								/>
							</span>
						);
				}
				return <></>;
			})}
		</div>
	);
}
