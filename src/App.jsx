import { useState } from "react";
import BackDrop from "./BackDrop";
import Drawer from "./Drawer";

function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="bg-main rounded p-2 text-white font-semibold shadow-sm m-5 hover:bg-cyan-500"
      >
        Save Segment
      </button>
      {show && <BackDrop onClick={() => setShow(!show)} />}
      <Drawer show={show} onClick={() => setShow(!show)} />
    </div>
  );
}

export default App;
