import { createContext, useReducer } from "react";
import { ConnectionAction, ConnectionActionType } from "./actions";
import { Callback } from "@/types/others/callback";
import { useCallApi } from "@/config/api";
import { API_URLS } from "@/config/api/endpoint";

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

function connectionReducer(
  state = initialState,
  action: ConnectionActionType
): ConnectionState {
  switch (action.type) {
    //
    case ConnectionAction.CONNECT_PENDING:
      return { ...state, isFetching: true };
    case ConnectionAction.CONNECT_FAILURE:
      return { ...state, isFetching: false };
    case ConnectionAction.CONNECT_SUCCESS:
      return { ...state, isFetching: false };
    //
    case ConnectionAction.TEST_API_PENDING:
      return { ...state, isFetching: true };
    case ConnectionAction.TEST_API_SUCCESS:
      return { ...state, isFetching: false };
    case ConnectionAction.TEST_API_FAILURE:
      return { ...state, isFetching: false };
    //
    default:
      return state;
  }
}

function useConnectionReducer(_state = initialState) {
  const [state, dispatch] = useReducer(connectionReducer, _state);

  const testAPI = async (cb?: Callback) => {
    dispatch({ type: ConnectionAction.TEST_API_PENDING });
    const { error, response } = await useCallApi(API_URLS.Test.testAPI());
    console.log(error, response);
    if (!error && response?.status === 200) {
      dispatch({ type: ConnectionAction.TEST_API_SUCCESS });
      cb?.onSuccess?.();
    } else {
      dispatch({ type: ConnectionAction.TEST_API_FAILURE });
      cb?.onError?.();
    }
  };

  return { state, testAPI };
}

export const ConnectionContext = createContext<
  ReturnType<typeof useConnectionReducer>
>({
  state: initialState,
  testAPI: async () => {},
});

interface Props {
  children: React.ReactNode | string;
}

export const ConnectionProvider: React.FC<Props> = ({ children }) => {
  const connectionReducer = useConnectionReducer();

  return (
    <ConnectionContext.Provider value={connectionReducer}>
      {children}
    </ConnectionContext.Provider>
  );
};
