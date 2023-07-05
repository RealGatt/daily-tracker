interface Entry {
	uuid: string;
	title: string;
	description: string;
	entryType: "mood" | "daily" | "counter";
}

interface DailyUpdate {
	mood?: string;
	moodDescription?: string;
	counter?: number;
	completed?: boolean;
}
