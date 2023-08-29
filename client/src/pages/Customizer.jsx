import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  ColorPicker,
  AiPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components/index";
import { HiFolderDownload } from "react-icons/hi";

const Customizer = ({downloadScreenshot}) => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.FilterTab]) {
      handleActiveFilterTab(decalType.filterType);
    }
  };

  const readFile = (type) => {
    reader(file).then((result) => handleDecals(type, result));
    setActiveEditorTab("");
  };

  const handleSubmit = async (type) => {
    if (!prompt || prompt.trim().length === 0)
      return alert("Please enter a prompt");
    try {
      setGeneratingImg(true);
      const res = await fetch(
        "https://threedesiner.onrender.com/api/v1/dalle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );
      console.log(res);

      const data = await res.json();
      console.log(data);

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
      setPrompt("");
    }
  };

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker handleClick={() => setActiveEditorTab("")} />;
      case "filepicker":
        return (
          <FilePicker
            handleClick={() => setActiveEditorTab("")}
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        );
      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
            handleClick={() => setActiveEditorTab("")}
          />
        );

      default:
        return null;
    }
  };



  return (
    <AnimatePresence >
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation("left")}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => {
                setActiveEditorTab("");
                setTimeout(() => {
                  state.intro = true;
                }, 1);
              }}
              customStyles='w.fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
              />
            ))}
            <div
              key={"Download"}
              className='tab-bt rounded-full glassmorphism w-14 h-14 flex items-center justify-center cursor-pointer'
              onClick={downloadScreenshot}
              style={{ backgroundColor: snap.color, opacity: 0.5 }}
            >
              <div className='h-10 w-10 bg-black/50 rounded-full flex items-center justify-center'>
                <HiFolderDownload className='w-2/3 h-2/3 text-white -mt-1' />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
