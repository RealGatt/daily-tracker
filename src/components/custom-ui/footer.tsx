"use server";

import ControlDrawer from "../dialog/control-drawer";

export default async function Footer() {
	return (
		<footer className="border-t-2 border-gray-200 dark:border-gray-800 flex flex-row gap-4 px-4 py-1 place-items-center self-center">
			<div className="w-full flex flex-col place-items-center self-center max-w-6xl  h-full">
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
			<div>
				<ControlDrawer />
			</div>
		</footer>
	);
}
