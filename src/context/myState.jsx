import { useState } from "react";
import myContext from "./myContext";

myContext;

const myState = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <myContext.Provider value={{ loading, setLoading }}>
      {children}
    </myContext.Provider>
  );
};

export default myState;
