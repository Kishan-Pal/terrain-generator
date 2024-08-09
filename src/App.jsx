import { useState } from "react";
import GreenPage from "./GreenPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100%]">
      <GreenPage />
    </div>
  );
}

export default App;
