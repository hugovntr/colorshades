import { CombinationsContext } from "@/contexts/CombinationsContext";
import { useContext } from "react";

const useCombinations = () => useContext(CombinationsContext);
export default useCombinations;
