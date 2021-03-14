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
    case actions.SET_LIST_STATE:
      return { ...state, list: state.list.filter(x => x.id !== action.payload.id) }
    default:
      return state
  }
}
