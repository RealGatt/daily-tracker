export function determineArticle(word: string): string {
	const vowels: string[] = ["a", "e", "i", "o", "u"];
	if (vowels.some((vowel) => word.toLowerCase().startsWith(vowel))) {
		return "n";
	} else {
		return "";
	}
}
