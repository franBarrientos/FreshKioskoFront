import { useContext } from "react";
import KioskoContext from "../context/KioskoProvider";

function useKiosko() {
  return useContext(KioskoContext);
}

export default useKiosko