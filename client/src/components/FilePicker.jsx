import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import CustomButton from "./CustomButton";

const FilePicker = ({ handleClick, file, setFile, readFile }) => {
  return (
    <>
      <div className='filepicker-container '>
        <div className='flex flex-1 flex-col pl-[40px] justify-center bg-black/20 cursor-pointer font-bold rounded-lg border-2 border-dashed'>
          <input
            type='file'
            id='file-upload'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor='file-upload'
            className=' text-white w-full cursor-pointer'
          >
            Upload File
          </label>
        </div>
        <p className='mt-2 px-3 py-2 font-bold text-white bg-black/40 rounded-md flex flex-wrap items-center justify-center'>
          {file === "" ? "No file selected." : file.name}
        </p>
        <div className='flex items-center justify-center gap-2'>
          <CustomButton
            type='outline'
            title='Logo'
            handleClick={() => {
              readFile("logo");
              setFile("");
            }}
            customStyles='text-xs mt-2 font-bold'
          />
          <CustomButton
            type='filled'
            title='Full'
            handleClick={() => {
              readFile("full");
              setFile("");
            }}
            customStyles='text-xs mt-2 font-bold'
          />
        </div>
      </div>
      <div className='absolute top-2 -right-[250px] w-8 h-8'>
        <div
          className='text-white w-full h-full cursor-pointer bg-black/80 rounded-full  flex items-center justify-center'
          onClick={handleClick}
        >
          <AiFillCloseCircle size={25} className='opacity-80 ' />
        </div>
      </div>
    </>
  );
};

export default FilePicker;
