import { SHOW_MODAL } from "../action/types"
import apiError from "./errorConstant"
export const fetchWithErrHandler = async (
  url,
  requestOptions,
  timeout,
  dispatch
) => {
  const headers = new Headers()
  headers.append("Accept", "application/json")
  const defaultOption = {
    method: "GET",
    redirect: "follow",
    headers: headers,
  }
  const mergedOption = { ...defaultOption, ...requestOptions }
  try {
    const rawResponse = await Promise.race([
      fetch(url, mergedOption),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Network takes too long to respond")),
          timeout
        )
      ),
    ])

    let jsonResponse = {}
    const textResponse = await rawResponse.text()
    if (textResponse.length !== 0) {
      jsonResponse = JSON.parse(textResponse)
    }
    jsonResponse.status = rawResponse.status
    if (apiError[jsonResponse.code]) {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Server Error",
          content: apiError[jsonResponse.code],
        },
      })
    }
    return {
      ...jsonResponse,
      status: rawResponse.status,
      headers: rawResponse.headers,
    }
  } catch (e) {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        status: "Unknown error",
        content: e.message,
      },
    })
    return Promise.reject(e)
  }
}
