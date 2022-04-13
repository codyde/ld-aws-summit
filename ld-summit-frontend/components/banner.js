import React, { useState } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { fadeInUp, rollIn, zoomInDown, zoomInLeft } from "react-animations";
import Radium, { StyleRoot } from "radium";
import toast, { Toaster } from "react-hot-toast";
import AppArch from "./appArch.js";

const styles = {
  rollin: {
    animation: "x 1s",
    animationName: Radium.keyframes(rollIn, "rollIn"),
  },
  bounce: {
    animation: "x 3s",
    animationName: Radium.keyframes(zoomInDown, "zoomInDown"),
  },
  zoomleft: {
    animation: "x 3s",
    animationName: Radium.keyframes(zoomInLeft, "zoomInLeft"),
  },
  fadeup: {
    animation: "x 5s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

export default function Banner(flags) {
  const LDClient = useLDClient();

  const [userState, setUserState] = useState({
    username: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function setCurrLDUser() {
    const obj = await LDClient.getUser();
    return obj;
  }

  const submitUser = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    lduser.key = userState.username;
    await LDClient.identify(lduser);
    LDClient.track("userLogin", { customProperty: userState.username });
    toast.success("Your LaunchDarkly user is " + userState.username);
    console.log("The updated user is: " + lduser.key);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <StyleRoot>

<div style={styles.fadeup}>
          <div className="grid shadow-2xl bg-ldgray p-10 lg:px-28 py-8">
            <img
              className="mx-auto max-h-30"
              src="./ld-white-wide.png"
              alt="launch-darkly"
            />
            <div className="mx-auto py-4 text-2xl md:text-4xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-ldyellow to-lddblue text-center italic">
              Welcome to AWS Summit!
            </div>
            <div className="mx-auto pt-4">
              <AppArch />
            </div>
          </div>
        </div>

    </StyleRoot>
  );
}
