export enum ConnectionAction {
  TEST_API_PENDING = "TEST_API_PENDING",
  TEST_API_SUCCESS = "TEST_API_SUCCESS",
  TEST_API_FAILURE = "TEST_API_FAILURE",

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

interface TestAPIPending {
  type: ConnectionAction.TEST_API_PENDING;
}

interface TestAPISuccess {
  type: ConnectionAction.TEST_API_SUCCESS;
}

interface TestAPIFailure {
  type: ConnectionAction.TEST_API_FAILURE;
}

export type ConnectionActionType =
  | ConnectFailure
  | ConnectPending
  | ConnectSuccess
  | TestAPIFailure
  | TestAPIPending
  | TestAPISuccess;
