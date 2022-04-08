import React, { useState, useEffect } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
import Modal from "./modal";

export default function Connection() {
  const { dbDetails } = useFlags();
  const [loc1, setloc1] = useState("INACTIVE");
  const [api1, setapi1] = useState("bg-ldred");
  const [api1loc, setapi1loc] = useState("UNKNOWN");

  const ENDPOINT =
    window.location.protocol + "//" + window.location.host + "/api/health";

  async function queryAPI() {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    setloc1(data.status);
    if (data.status != "healthy") {
      setapi1("bg-ldred");
    } else {
      setapi1("bg-ldblue");
      setapi1loc(data.location);
    }
  }

  useEffect(() => {
    if (dbDetails) {
      console.log("RDS online");
    } else {
      console.log("Local DB");
    }
    queryAPI();
    console.log("running useeffect");
  }, [dbDetails]);

  return (
    <div className="flex mx-auto w-full space-x-4">
      <div
        className="grid mx-auto justify-center items-center bg-ldgray w-1/2 shadow-2xl py-8 px-8 w-full"
      >
        <div>
          <h1 className="text-center font-bold text-ldgraytext text-base lg:text-4xl">
            Connected to the{" "}
            <span className="text-ldred">{api1loc.toUpperCase()}</span> Database
          </h1>
          <div className={`overflow-hidden h-8 flex px-8 pb-4 ${api1}`}>
            <p className="mx-auto text-black text-xl">{loc1.toUpperCase()}</p>
          </div>
          <div className="grid mx-auto py-4">
            <Modal dbDetails={dbDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
