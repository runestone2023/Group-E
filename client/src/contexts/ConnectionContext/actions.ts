export enum ConnectionAction {
  CONNECT_PENDING = "CONNECT_PENDING",
  CONNECT_SUCCESS = "CONNECT_SUCCESS",
  CONNECT_FAILURE = "CONNECT_FAILURE",
}

interface ConnectPending {
  type: ConnectionAction.CONNECT_PENDING;
}

interface ConnectSuccess {
  type: ConnectionAction.CONNECT_SUCCESS;
}

interface ConnectFailure {
  type: ConnectionAction.CONNECT_FAILURE;
}

export type ConnectionActionType = ConnectFailure | ConnectPending | ConnectSuccess;
