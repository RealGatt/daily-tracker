"use client";

import { Icon } from "@iconify/react";
import { ThemeToggler } from "../custom-ui/theme-switcher";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import NewTaskDialog from "./new-task-dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FontSelector from "../font-selector";
import TaskDrawerControls from "../custom-ui/task-drawer-controls";

export default function ControlDrawer() {
	const pathname = usePathname();
	const [drawerOpen, setDrawerOpen] = useState(false);
	useEffect(() => {
		setDrawerOpen(false);
	}, [pathname]);

	return (
		<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<Icon icon="mdi:cog" className="h-6 w-6" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<TaskDrawerControls />
					<DrawerHeader>
						<DrawerTitle>Settings</DrawerTitle>
					</DrawerHeader>
					<div className="flex flex-row gap-2">
						<ThemeToggler />
						<FontSelector />
					</div>
					<DrawerFooter className="flex flex-row gap-2">
						<NewTaskDialog />
						<DrawerClose asChild className="w-[50%]">
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
	return <></>;
}
