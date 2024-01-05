"use server";

import dynamic from "next/dynamic";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Home({ params }: { params: { taskId: string } }) {
	if (!params || !params.taskId) {
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
	return <TaskEntryLoader taskId={params.taskId} />;
}
