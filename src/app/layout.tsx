import Footer from "@/components/custom-ui/footer";
import { FontContextProvider } from "@/components/font-selector";
import { ThemeProvider } from "@/components/theme-provider";
import {
	Caveat,
	Inter,
	Lobster,
	Oswald,
	Play,
	Roboto,
	Sofia,
	Solway,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "500", subsets: ["latin"] });
const sofia = Sofia({ weight: "400", subsets: ["latin"] });
const solway = Solway({ weight: "400", subsets: ["latin"] });
const caveat = Caveat({
	weight: "400",
	subsets: ["latin"],
});
const play = Play({
	weight: "400",
	subsets: ["latin"],
});
const oswald = Oswald({
	weight: "400",
	subsets: ["latin"],
});
const lobster = Lobster({
	weight: "400",
	subsets: ["latin"],
});

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
			<body>
				<FontContextProvider
					fonts={[
						{
							...inter,
							name: "Inter",
						},
						{
							...roboto,
							name: "Roboto",
						},
						{
							...sofia,
							name: "Sofia",
						},
						{
							...solway,
							name: "Solway",
						},
						{
							...caveat,
							name: "Caveat",
						},
						{
							...play,
							name: "Play",
						},
						{
							...oswald,
							name: "Oswald",
						},
						{
							...lobster,
							name: "Lobster",
						},
					]}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<main>{children}</main>
						<Footer />
					</ThemeProvider>
				</FontContextProvider>
			</body>
		</html>
	);
}
