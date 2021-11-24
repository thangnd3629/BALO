import { SHOW_MODAL } from "../action/types"
const initialState = {
  isShown: false,
  status: "",
  content: "",
}

export default function globalModalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {
        status: payload.status,
        content: payload.content,
      })
    default:
      return state
  }
}
