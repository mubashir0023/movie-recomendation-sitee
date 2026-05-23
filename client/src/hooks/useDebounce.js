import { useState, useEffect } from 'react';

/**
 * @file useDebounce.js
 * @description Custom hook to debounce a value.
 * 
 * Concept: Debouncing ensures that a function is not called too frequently. 
 * For search, it prevents making an API request on every single keystroke.
 */

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
