"use client";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Daily Tracker",
	description: "Track your daily habits",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://use.typekit.net/zpg8qap.css"
				></link>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
