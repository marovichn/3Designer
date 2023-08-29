import React, { useRef } from 'react'
import { useSnapshot } from 'valtio';
import state from '../store';
import { HiFolderDownload } from 'react-icons/hi';

import { useScreenshot, createFileName } from "use-react-screenshot";

const DownloadButton = ({canvasRef}) => {
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
console.log(canvasRef);
const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div
    ref={ref}
      key={"Download"}
      className='tab-bt rounded-full glassmorphism w-14 h-14 flex items-center justify-center cursor-pointer'
      onClick={downloadScreenshot}
      style={{ backgroundColor: snap.color, opacity: 0.5 }}
    >
      <div className='h-10 w-10 bg-black/50 rounded-full flex items-center justify-center'>
        <HiFolderDownload className='w-2/3 h-2/3 text-white -mt-1' />
      </div>
    </div>
  );
}

export default DownloadButton