import { useEffect, useState } from "react";

export function useSearch(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    //Nếu có sự thay đổi trong value hoặc delay trong quá trình chờ, useEffect sẽ hủy setTimeout trước đó và thiết lập một setTimeout mới với giá trị mới của value và delay.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
