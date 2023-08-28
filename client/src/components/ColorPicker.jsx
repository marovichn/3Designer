import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import { AiFillCloseCircle } from "react-icons/ai";

import state from "../store";

const ColorPicker = ({ handleClick }) => {
  const snap = useSnapshot(state);

  return (
    <>
      <div className='absolute left-[75px] -top-2 w-full h-full '>
        <SketchPicker
          color={snap.color}
          disableAlpha
          onChange={(color) => (state.color = color.hex)}
          presetColors={[
            "#ff7f50",
            "#87cefa",
            "#da70d6",
            "#32cd32",
            "#6495ed",
            "#ff69b4",
            "#ba55d3",
            "#cd5c5c",
            "#ffa500",
            "#40e0d0",
            "#ffffff",
            "#5a5a5a",
          ]}
        />
      </div>
      <div className='absolute -top-2 -right-[250px] w-8 h-8'>
        <div
          className='text-white w-full h-full opacity-80 cursor-pointer'
          onClick={handleClick}
        >
          <AiFillCloseCircle size={25} />
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
