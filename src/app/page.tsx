"use client";

import TaskTable from "@/components/custom-ui/task-table";
import { ThemeToggler } from "@/components/custom-ui/theme-switcher";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<div className="fixed bottom-6 right-12 z-50">
				<ThemeToggler />
			</div>
			<main>
				<div className="w-full flex flex-col place-items-center self-center max-w-6xl">
					<TaskTable />
				</div>
			</main>
			<footer>
				<div className="w-full flex flex-col place-items-center self-center max-w-6xl">
					<p className="text-center">
						Developed with ❤️ by{" "}
						<a
							href="https://github.com/RealGatt/daily-tracker"
							target="_blank"
						>
							Gatt
						</a>
					</p>
				</div>
			</footer>
		</ThemeProvider>
	);
}
