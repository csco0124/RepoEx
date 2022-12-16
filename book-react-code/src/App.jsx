import { useState } from "react";
import { useEffect } from "react";
import { ColoredMessage } from "./components/ColoredMessage";
import { CssModules } from "./components/CssModules";

export const App = () => {
  const [num, setNum] = useState(0);

  return (
    <>
      <CssModules />
    </>
  );
};
