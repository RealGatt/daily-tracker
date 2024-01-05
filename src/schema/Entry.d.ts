interface Entry {
	uuid: string;
	title: string;
	description: string;
	entryType: "daily" | "counter" | "mood";
	completeColor?: string | null;
}

interface DailyUpdate {
	counter?: number;
	completed?: boolean;
	mood?: string;
	moodDescription?: string;
}
