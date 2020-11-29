import React from 'react';

/**
 * This is like a useState but for only boolean values only.
 * @param initialValue
 * @returns {[boolean, function(): void]}
 */
export default function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);
  return [value, toggle];
}
