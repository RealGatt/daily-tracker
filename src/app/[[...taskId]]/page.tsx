"use server";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import dynamic from "next/dynamic";

export default async function Home({ params }: { params: { taskId: string } }) {
	if (
		!params ||
		!params.taskId ||
		params.taskId == "undefined" ||
		params.taskId == "index"
	) {
		const TaskTableEntries = dynamic(
			() => import("@/components/custom-ui/task-table-entries"),
			{
				ssr: false,
			}
		);

		return (
			<div className="w-full flex flex-col place-items-center self-center max-w-6xl">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="font-bold">Task</TableHead>
						</TableRow>
					</TableHeader>
					<TaskTableEntries />
				</Table>
			</div>
		);
	}
	const TaskEntryLoader = dynamic(
		() => import("@/components/custom-ui/task-entry-loader"),
		{
			ssr: false,
		}
	);
	return (
		<div className="w-full flex flex-col place-items-center self-center max-w-6xl">
			<TaskEntryLoader taskId={params.taskId} />
		</div>
	);
}
