"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export type FontWithName = NextFont & { name: string };

export const FontContext = createContext<FontWithName[]>([]);

export function FontContextProvider({
	children,
	fonts,
}: {
	children: React.ReactNode;
	fonts: FontWithName[];
}) {
	const [font, setFont] = useLocalStorage("font", "Inter");
	useEffect(() => {
		const useFont = fonts.find((checkFont) => checkFont.name === font);
		console.log(`loading `, font, useFont);
		// add the class to the body
		if (useFont) {
			// remove all other font classes
			document.body.classList.forEach((className) => {
				document.body.classList.remove(className);
			});
			document.body.classList.add(useFont.className);
		}
	}, [font, fonts]);

	return (
		<FontContext.Provider value={fonts}>{children}</FontContext.Provider>
	);
}

export default function FontSelector() {
	const [font, setFont] = useLocalStorage("font", "Inter");
	const fonts = useContext(FontContext);
	return (
		<Select
			onValueChange={(e) => {
				const font = fonts.find((font) => font.name === e);
				setFont(font?.name ?? "Inter");
			}}
			value={font}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a Font" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fonts</SelectLabel>
					{fonts.map((font) => (
						<SelectItem
							value={font.name}
							key={font.name}
							className={font.className}
						>
							{font.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
