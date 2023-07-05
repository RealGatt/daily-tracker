export function getDaysOfWeek(): Date[] {
	const today = new Date();
	const currentDay = today.getDay(); // Sunday: 0, Monday: 1, Tuesday: 2, ..., Saturday: 6
	const days = [];

	// Calculate the date of Monday in the current week
	const sunday = new Date(today);
	sunday.setDate(today.getDate() - currentDay);

	// Push the dates of the week into the 'days' array
	for (let i = 0; i < 7; i++) {
		const day = new Date(sunday);
		day.setDate(sunday.getDate() + i);
		day.setHours(0, 0, 0, 0);
		days.push(day);
	}

	return days;
}
