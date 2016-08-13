export default function reducer(state={
  user: {},
  error: null
}, action) {

  switch (action.type) {
    case "FETCH_USER_FULFILLED": {
      return {...state, user: action.payload}
    }
    case "FETCH_USER_REJECTED": {
      return {...state, error: action.payload}
    }
  }
  return state
}