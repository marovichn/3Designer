import { forwardRef } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";

function App() {
  const canvasRef = forwardRef(function Canvas(props, ref) {
    return (
      <div ref={ref}>
        <Canvas />
      </div>
    );
  });
  return (
    <main className='app transition-all ease-in'>
      <Home />
      <Canvas />
      <Customizer canvasRef={canvasRef} />
    </main>
  );
}

export default App;
