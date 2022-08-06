// import "../styles/globals.css";
import 'tailwindcss/tailwind.css'
import { withLDProvider } from "launchdarkly-react-client-sdk";
import { deviceType, osName } from "react-device-detect";
import {v4 as uuidv4} from 'uuid';
import ls from 'local-storage';

function getUserId() {
  let id;
  if (ls.get('LD_User_Key')) {
    id = ls.get('LD_User_Key');
  } else {
    id = uuidv4();
    ls.set('LD_User_Key', id)
  }
  return id;
}

let id = getUserId();


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withLDProvider({
  clientSideID: '62cb0f25b258dc11c48e505c',
  user: {
    key: id,
    custom: {
      device: deviceType,
      operatingSystem: osName,
    },
  },
  options: {
    bootstrap: "localStorage",
  },
})(MyApp);
