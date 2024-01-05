"use client";

import { usePathname } from "next/navigation";
import useLocalStorage from "use-local-storage";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import SelectColourButton from "./drawer/select-color-button";

export default function TaskDrawerControls() {
	const pathname = usePathname();
	const [entries, setEntries] = useLocalStorage<Entry[]>("entries", []);
	if (pathname === "/") return <></>;
	const taskId = pathname.split("/")[1];
	const entry = entries.find((e) => e.uuid == taskId);
	if (!entry) return <></>;
	console.log(entry);

	return (
		<>
			<DrawerHeader>
				<DrawerTitle>Task Settings</DrawerTitle>
			</DrawerHeader>
			<div className="flex flex-row gap-2 flex-grow">
				<div className="flex flex-col gap-1 flex-grow place-items-center">
					Completed Colour
					<SelectColourButton
						entry={entry}
						saveColor={(color) => {
							setEntries(
								entries.map((e) => {
									if (e.uuid === entry.uuid) {
										e.completeColor = color;
									}
									return e;
								})
							);
						}}
					/>
				</div>
			</div>
		</>
	);
}
