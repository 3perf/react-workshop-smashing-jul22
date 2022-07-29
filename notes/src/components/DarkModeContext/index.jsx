import { useEffect, useMemo, useState } from "react";
import { createContext } from "use-context-selector";
import "./index.css";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.body.classList.add("theme-" + mode);

    return () => {
      document.body.classList.remove("theme-" + mode);
    };
  }, [mode]);

  // const luminance = window.getOutsideLuminance();
  const date = new Date();

  return (
    <DarkModeContext.Provider
      // value={mode}
      value={{
        mode,
        setMode,
        // luminance: luminance,
        time: date,
      }}
    >
      {/* <DarkModeSetContext.Provider value={setMode}> */}
      {/* <DarkModeCurrentTimeContext.Provider value={date}> */}
      {children}
      {/* </DarkModeCurrentTimeContext.Provider> */}
      {/* </DarkModeSetContext.Provider> */}
    </DarkModeContext.Provider>
  );
}
