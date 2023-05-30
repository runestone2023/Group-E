import { ConnectionContext } from "@/contexts/ConnectionContext";
import { useContext } from "react";

export const useConnectionContext = () => {
  return useContext(ConnectionContext);
};
