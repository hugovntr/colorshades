import { SchemeContext } from "@/contexts/SchemeContext";
import { useContext } from "react";

const useScheme = () => useContext(SchemeContext);
export default useScheme;
