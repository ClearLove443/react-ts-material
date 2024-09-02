import { Sketch } from "@uiw/react-color";
import { useState } from "react";

function Demo() {
  const [hex, setHex] = useState("#fff");
  return (
    <>
      <div style={{ width: 200, height: 200, backgroundColor: hex }} />
      <Sketch
        style={{ marginLeft: 20 }}
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </>
  );
}

export default Demo;
