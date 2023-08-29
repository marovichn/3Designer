import { forwardRef, useRef, useState } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { createFileName, useScreenshot } from "use-react-screenshot";

function App() {
  const ref = useRef();
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const [taking, setTaking] = useState(false);

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    setTaking(true);
    setTimeout(() => {
      takeScreenShot(ref.current).then(download).then(setTaking(false));
    }, 200);
  };

  return (
    <main className='app transition-all ease-in' ref={ref}>
      <Home />
      <Canvas />
      {!taking && <Customizer downloadScreenshot={downloadScreenshot} />}
    </main>
  );
}

export default App;
