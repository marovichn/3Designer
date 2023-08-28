import React from "react";

import CustomButton from "./CustomButton";
import { AiFillCloseCircle } from "react-icons/ai";

const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
  handleClick,
}) => {
  return (
    <div className='aipicker-container'>
      <textarea
        placeholder='Ask AI...'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='w-full  text-sm border-2 border-dashed p-2 outline-none flex-1 font-bold text-white bg-black/30 placeholder:text-white rounded-lg'
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton
            type='outline'
            title='Asking AI...'
            customStyles='text-xs'
          />
        ) : (
          <>
            <CustomButton
              type='outline'
              title='AI Logo'
              handleClick={() => handleSubmit("logo")}
              customStyles='text-xs'
            />

            <CustomButton
              type='filled'
              title='AI Full'
              handleClick={() => handleSubmit("full")}
              customStyles='text-xs'
            />
            <div className='absolute top-0 -right-11 w-8 h-8'>
              <div
                className='text-white w-full h-full cursor-pointer bg-black/80 rounded-full  flex items-center justify-center'
                onClick={handleClick}
              >
                <AiFillCloseCircle size={25} className='opacity-80 ' />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
