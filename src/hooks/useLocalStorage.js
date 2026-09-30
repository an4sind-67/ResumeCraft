import { useEffect, useState } from "react";

// useState that is saved to localStorage whenever the value changes
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked - app still works in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
