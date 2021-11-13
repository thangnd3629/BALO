import { useDispatch } from "react-redux"

const dispatch = useDispatch()
const fetchWithErrHandler = async (requestOptions) => {
  const defaultOption = {}
  const mergedOption = { ...defaultOption, ...requestOptions }
  try {
    const rawResponse = await fetch()
    const jsonResponst = await rawResponse.json()
  } catch (e) {
    dispatch({
      type: "FETCH_ERROR",
      payload: {},
    })
  }
}
