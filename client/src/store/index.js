import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#4e88e6",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;