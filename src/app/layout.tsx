import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Footer from "@/components/custom-ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Daily Tracker",
	description: "Track your daily habits",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Toaster richColors={true} closeButton={true} visibleToasts={5} />
			<head>
				<link
					rel="stylesheet"
					href="https://use.typekit.net/zpg8qap.css"
				></link>
			</head>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<main>{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
