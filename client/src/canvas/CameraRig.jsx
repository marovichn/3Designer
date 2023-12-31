import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";

const CameraRig = ({ children }) => {
  const snap = useSnapshot(state);
  const group = useRef();

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    //initial position
    let targetPosition = [-0.4, 0, 0.7];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0.2, 1];
      if (isMobile) targetPosition = [0, 0.35, 1.1];
    } else {
      if (isMobile) targetPosition = [0, 0, 0.77];
      else targetPosition = [0, 0, 0.7];
    }

    //set camera poisition
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
