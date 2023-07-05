export function convertToPastTense(word: string): string {
	if (word.toLowerCase().endsWith("ed")) {
		return word.slice(0, -2) + "ing";
	} else {
		return word;
	}
}
