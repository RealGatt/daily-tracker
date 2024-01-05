interface Entry {
	uuid: string;
	title: string;
	description: string;
	entryType: "daily" | "counter" | "mood";
}

interface DailyUpdate {
	counter?: number;
	completed?: boolean;
	mood?: string;
	moodDescription?: string;
}
