import { useQRCode } from 'next-qrcode';

// const QRURL = "https://summit1.frontend.launchdarklydemos.com";

const QRCodeHome = () => {
    const { Canvas } = useQRCode();
 
  return (

    <div className="mx-auto ">
      <div className="qr-wrapper">
        <Canvas
            text={"http://summit3.launchdarklydemos.com"}
            options={{
                type: 'image/jpeg',
                quality: 0.3,
                level: 'M',
                margin: 3,
                scale: 6,
                width: 200,
                color: {
                  dark: '#000000',
                  light: '#FFFFFF',
                },
              }} />
      </div>
    </div>
  )     
};

export default QRCodeHome;
