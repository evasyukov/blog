import { ACTION_TYPE } from "../actions"

const InitialPostsState = {
  id: "",
  title: "",
  imageUrl: "",
  content: "",
  publishedAt: "",
  comments: [],
}

export function postReducer(state = InitialPostsState, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_POST_DATA:
      return {
        ...state,
        ...action.payload,
      }

    case ACTION_TYPE.RESET_POST_DATA:
      return InitialPostsState

    default:
      return state
  }
}
