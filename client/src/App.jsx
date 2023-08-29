import { forwardRef, useRef } from "react";
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

    const download = (image, { name = "img", extension = "jpg" } = {}) => {
      const a = document.createElement("a");
      a.href = image;
      a.download = createFileName(extension, name);
      a.click();
    };

    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <main className='app transition-all ease-in' ref={ref}>
      <Home />
      <Canvas />
      <Customizer downloadScreenshot={downloadScreenshot}/>
    </main>
  );
}

export default App;
