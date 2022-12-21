import { useState, useEffect } from "react";

export const useDebounce = (value, milliseconds) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, milliseconds);
    return () => {
      clearTimeout(handler);
    };
  }, [value, milliseconds]);

  return debounceValue;
};
