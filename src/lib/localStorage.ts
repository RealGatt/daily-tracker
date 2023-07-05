import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === "undefined") return [initialValue, () => {}];
		const storedValue = localStorage.getItem(key);
		return storedValue !== null ? JSON.parse(storedValue) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
