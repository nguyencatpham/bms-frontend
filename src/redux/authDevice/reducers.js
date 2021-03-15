import actions from './actions'

const initialState = {
  list: [],
  detail: {},
  total: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.SET_LIST_STATE: {
      state.list.find(x => x.uuid === action.payload.detail.uuid).userId = action.payload.detail.userId
      return state
    }
    default:
      return state
  }
}
