import { ShadesContext } from "@/contexts/ShadesContext";
import { useContext } from "react";

const useShades = () => useContext(ShadesContext);
export default useShades;
