import { useDispatch } from "react-redux"
import { SHOW_MODAL } from "../action/types"

const dispatch = useDispatch()
const fetchWithErrHandler = async (requestOptions) => {
  const defaultOption = {}
  const mergedOption = { ...defaultOption, ...requestOptions }
  try {
    const rawResponse = await fetch()
    if (!rawResponse.ok) {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "error",
          content: e.msg,
        },
      })
      return
    }
    const jsonResponse = await rawResponse.json()
  } catch (e) {}
}
