import { createContext, useReducer } from "react";
import { ConnectionAction, ConnectionActionType } from "./actions";

export enum ConnectingLocation {
  HANOI = "HANOI",
  UPPSALA = "UPPSALA",
}

export interface ConnectionState {
  isFetching: boolean;
  isConnected: boolean;
  connectedPosition?: ConnectingLocation;
}

const initialState: ConnectionState = {
  isConnected: false,
  isFetching: false,
  connectedPosition: undefined,
};

function connectionReducer(state = initialState, action: ConnectionActionType): ConnectionState {
  switch (action.type) {
    case ConnectionAction.CONNECT_PENDING:
      return { ...state, isFetching: true };
    case ConnectionAction.CONNECT_FAILURE:
      return { ...state, isFetching: false };
    case ConnectionAction.CONNECT_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

function useConnectionReducer(_state = initialState) {
  const [state, dispatch] = useReducer(connectionReducer, _state);

  return { state };
}

export const ConnectionContext = createContext<ReturnType<typeof useConnectionReducer>>({
  state: initialState,
});

interface Props {
  children: React.ReactNode | string;
}

export const ConnectionProvider: React.FC<Props> = ({ children }) => {
  const connectionReducer = useConnectionReducer();

  return <ConnectionContext.Provider value={connectionReducer}>{children}</ConnectionContext.Provider>;
};
