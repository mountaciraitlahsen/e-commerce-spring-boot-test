import { useState, useEffect } from "react";
export default function Counter() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    document.title = counter;
  }, [counter]);
  return (
    <button onClick={() => setCounter((count) => count + 1)}>
      Incremented into {counter}
    </button>
  );
}
