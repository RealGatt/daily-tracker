import { ColorPicker } from "@/components/ui/colorpicker";
import { useState } from "react";

export default function SelectColourButton(params: {
	entry: Entry;
	saveColor: (color: string) => void;
}) {
	const { entry } = params;
	const [background, setBackground] = useState<string>(
		entry.completeColor ?? "#ffffff"
	);

	return (
		<ColorPicker
			optionName="Completed Colour"
			background={background}
			setBackground={(color) => {
				setBackground(color);
				params.saveColor(color);
			}}
		/>
	);
}
