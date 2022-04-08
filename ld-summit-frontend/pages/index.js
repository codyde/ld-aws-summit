import Head from "next/head";
import Loginbox from "../components/loginbox.js";
import Connection from "../components/connection.js";
import "semantic-ui-css/semantic.min.css";
import { useFlags } from "launchdarkly-react-client-sdk";
import toast, { Toaster } from "react-hot-toast";
import QRCode from "../components/qrCode";
import Banner from "../components/banner.js";

export default function Home() {
  const { userLogin, apiConfig, qrCode, brandImage } = useFlags();
  return (
    <div className="h-screen bg-ld-ls-wide bg-no-repeat bg-center bg-cover">
      <Head>
        <title>Summit1 - LaunchDarkly</title>
        <meta name="description" content="Built for exploring LaunchDarkly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#00000",
            color: "#fffff",
          },
          // Default options for specific types
          success: {
            icon: "🚀",
            // className:"bg-ldgray",
            style: {
              fontSize: 22,
              background: "#282828",
              color: "white",
            },
          },
          error: {
            icon: "⚠️",
            style: {
              fontSize: 22,
              background: "#FF386B",
              color: "white",
            },
          },
        }}
      />
      <main className="h-screen grid grid-cols-4 grid-rows-3">
        {qrCode ? (
          <div className="grid col-span-4 row-start-3 my-8 lg:row-start-1 lg:col-span-1 lg:col-start-1 justify-center items-center px-8">
            <QRCode />
          </div>
        ) : null}
        {brandImage ? (
          <div className="grid col-span-4 row-start-3 lg:row-start-2 lg:col-span-1 lg:col-start-1 justify-center items-center px-8">
            <img
              className="mx-auto"
              src="./toggle_thumbsup.png"
              width="165"
              alt="launch-logo"
            />
          </div>
        ) : (
          <div className="grid col-span-4 row-start-3 my-8 lg:row-start-2 lg:col-span-1 lg:col-start-1 justify-center items-center px-8">
            <img
              className="mx-auto"
              src="./ld-white.png"
              width="225"
              alt="launch-logo"
            />
          </div>
        )}
        <div className="grid col-span-4 row-start-1 lg:row-start-2 lg:col-span-3 items-center lg:col-start-2 ">
          {userLogin ? (
            <Loginbox userLogin={userLogin} />
          ) : (
            <Banner userLogin={userLogin} />
          )}
        </div>
        {apiConfig ? (
          <div className="grid col-span-4 row-start-2 lg:col-start-2 lg:col-span-3 lg:row-start-3 justify-center items-center lg:w-full">
            <Connection />
          </div>
        ) : null}
      </main>
    </div>
  );
}
