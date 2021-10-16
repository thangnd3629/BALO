import { AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT } from "../action/types"
const initialState = {
  user: null,
  error: null,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
      })
    case AUTH_FAILED:
      return Object.assign({}, state, {
        error: action.error,
      })
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        user: null,
        error: null,
      })
    default:
      return state
  }
}
