import React, { useState, useEffect } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { rollIn, zoomInDown, zoomInLeft } from "react-animations";
import Radium, { StyleRoot } from "radium";
import toast, { Toaster } from "react-hot-toast";

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
};

export default function Loginbox(flags) {
  const LDClient = useLDClient();

  const [userState, setUserState] = useState({
    username: "",
  });

  async function setCurrLDUser() {
    const obj = await LDClient.getUser();
    return obj;
  }

  const submitUser = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    lduser.key = userState.username;
    await LDClient.identify(lduser);
    LDClient.track('userLogin', { customProperty: userState.username });
    toast.success("Your LaunchDarkly user is " + userState.username);
    console.log("The updated user is: " + lduser.key);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  useEffect(() => {
    setUserState(LDClient.getUser())
    console.log(userState)
  }, [])

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

  const submitLogout = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    console.log(lduser)
    lduser.key = "anonymous";
    await LDClient.identify(lduser);
    LDClient.track('userClear', { customProperty: userState.username });
    await console.log(LDClient.getUser());
    toast.success("User has been cleared");
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  console.log(flags.userLogin)

  return (
    <StyleRoot>
        <div className="flex justify-center items-center">
        <div className={`bg-ldgray p-4 lg:p-10 lg:px-28 shadow-2xl`}>
          <form>
            <h1 className="text-center font-bold text-ldgraytext text-xl lg:text-4xl">
              Login With Your Username
            </h1>
            <p className="mx-auto font-normal text-ldgraytext text-sm lg:text-lg my-6 max-w-lg">
              This login field will create a user object with the LaunchDarkly
              SDK. This user object can be used to interact with targeting
              rules allowing specific feature configurations to be enabled or
              disabled based on users.
            </p>
            <div className="mx-auto flex items-center bg-white overflow-hidden px-2 py-1 max-w-lg justify-between">
              <input
                className="text-base text-gray-400 flex-grow outline-none px-2"
                type="input"
                id="username"
                placeholder="Enter Username"
                value={userState.username}
                onChange={handleChange}
              />
              <div className="flex items-center px-2 space-x-4 mx-auto ">
                <button
                  type="submit"
                  className="bg-ldblue text-white text-base px-4 py-2 font-thin"
                  onClick={submitUser.bind(userState)}
                >
                  Submit
                </button>
                </div>
            </div>
            <div className="flex mx-auto m-auto align-middle justify-center py-2 px-4 space-x-4">
               <button
                type="input"
                className="bg-ldred text-white text-base px-2 py-2"
                onClick={submitLogout.bind(userState)}
              >
                Clear Current User
              </button>
              </div>
          </form>
        </div>
      </div>
    </StyleRoot>
  );
}


