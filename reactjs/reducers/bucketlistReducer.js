export default function reducer(state={
  bucketlists: [],
  next: null,
  previous: null,
  count: null,
  fetching: false,
  fetched: false,
  saving: false,
  saved: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_BUCKETLISTS": {
      return {...state, fetching: true}
    }
    case "FETCH_BUCKETLISTS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_BUCKETLISTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        bucketlists: action.payload.results,
      }
    }
    case "SEARCH_BUCKETLISTS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "SEARCH_BUCKETLISTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        bucketlists: action.payload.results,
      }
    }
    case "ADD_BUCKETLIST": {
      return {
        ...state,
        bucketlists: [...state.bucketlists, action.payload],
        saving: true,
      }
    }
    case "ADD_BUCKETLIST_REJECTED": {
      return {
        ...state, saving: false, error: action.payload}
    }
    case "ADD_BUCKETLIST_FULFILLED": {
      return {
        ...state,
        saving: false,
        saved: true,
        bucketlists: [...state.bucketlists, action.payload],
      }
    }
    case "EDIT_BUCKETLIST": {
      const { id, name } = action.payload
      const newBucketlists = [...state.bucketlists]
      const bucketlistToUpdate = newBucketlists.findIndex(bucketlist => bucketlist.id === id)
      newBucketlists[bucketlistToUpdate] = action.payload;

      return {
        ...state,
        saving: true,
        bucketlists: newBucketlists,
      }
    }
    case "EDIT_BUCKETLIST_REJECTED": {
      return {
        ...state,
        saving: false,
        error: action.payload,
      }
    }
    case "EDIT_BUCKETLIST_FULFILLED": {
      const { id, name } = action.payload
      const newBucketlists = [...state.bucketlists]
      const bucketlistToUpdate = newBucketlists.findIndex(bucketlist => bucketlist.id === id)
      newBucketlists[bucketlistToUpdate] = action.payload;
      
      return {
        ...state,
        saving: false,
        saved: true,
        bucketlists: newBucketlists,
      }
    }
    case "DELETE_BUCKETLIST_REJECTED": {
      return {
        ...state,
        saving: false,
        error: action.payload,
      }
    }
    case "DELETE_BUCKETLIST_FULFILLED": {
      return {
        ...state,
        bucketlists: state.bucketlists.filter(bucketlist => bucketlist.id !== action.payload),
      }
    }
  }

  return state
}