import { HEADERS } from "./header";

export const API_URLS = {
  Test: {
    testAPI: () => ({
      endPoint: "/",
      method: "GET",
      headers: HEADERS.header(),
    }),
  },
};
