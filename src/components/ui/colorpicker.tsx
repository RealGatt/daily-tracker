"use client";

const inter = Inter({ subsets: ["latin"] });
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { Inter } from "next/font/google";

export function ColorPicker({
	background,
	setBackground,
	className,
	optionName,
}: {
	background: string;
	setBackground: (background: string) => void;
	className?: string;
	optionName?: string;
}) {
	const solids = [
		"#E2E2E2",
		"#FF75C3",
		"#FFA647",
		"#FFE83F",
		"#9FFF5B",
		"#70E2FF",
		"#CD93FF",
		"#09203F",
		"pink",
		"green",
		"orange",
		"red",
		"yellowgreen",
		"blue",
		"purple",
		"black",
	];

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[220px] justify-start text-left font-normal",
						!background && "text-muted-foreground",
						className
					)}
					style={{ borderColor: background }}
				>
					<div className="w-full flex items-center gap-2">
						{background ? (
							<div
								className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
								style={{ background }}
							></div>
						) : (
							<Paintbrush className="h-4 w-4" />
						)}
						<div className="truncate flex-1">
							{background ? background : "Pick a color"}
						</div>
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className={`${inter.className} w-64`}>
				<div className="w-full">
					<div className="w-full mb-4 flex-1">
						{optionName ?? "Select Colour"}
					</div>

					<div className="flex flex-wrap gap-1 mt-0">
						{solids.map((s) => (
							<div
								key={s}
								style={{ background: s }}
								className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
								onClick={() => setBackground(s)}
							/>
						))}
					</div>
				</div>

				<Input
					id="custom"
					value={background}
					className="col-span-2 h-8 mt-4"
					onChange={(e) => setBackground(e.currentTarget.value)}
				/>
			</PopoverContent>
		</Popover>
	);
}
