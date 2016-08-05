export default function reducer(state={
  bucketlist: {items: []},
  items: [],
  count: null,
  fetching: false,
  fetched: false,
  saving: false,
  saved: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_ITEMS": {
      return {...state, fetching: true}
    }
    case "FETCH_ITEMS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_ITEMS_FULFILLED": {
      console.log(action.payload)
      return {
        ...state,
        fetching: false,
        fetched: true,
        bucketlist: action.payload,
        count: action.payload.items.count,
        items: action.payload.items.items,
      }
    }
    case "ADD_ITEM": {
      return {
        ...state,
        items: [...state.items, action.payload],
        saving: true,
      }
    }
    case "ADD_ITEM_REJECTED": {
      return {
        ...state, saving: false, error: action.payload}
    }
    case "ADD_ITEM_FULFILLED": {
      return {
        ...state,
        saving: false,
        saved: true,
        items: [...state.items, action.payload],
      }
    }
    case "EDIT_ITEM": {
      const { id, name } = action.payload
      const newItems = [...state.items]
      const itemToUpdate = newItems.findIndex(item => item.id === id)
      newItems[itemToUpdate] = action.payload;

      return {
        ...state,
        saving: true,
        items: newItems,
      }
    }
    case "EDIT_ITEM_REJECTED": {
      return {
        ...state,
        saving: false,
        error: action.payload,
      }
    }
    case "EDIT_ITEM_FULFILLED": {
      const { id, name } = action.payload
      const newItems = [...state.items]
      const itemToUpdate = newItems.findIndex(item => item.id === id)
      newItems[itemToUpdate] = action.payload;
      
      return {
        ...state,
        saving: false,
        saved: true,
        items: newItems,
      }
    }
    case "DELETE_ITEM_REJECTED": {
      return {
        ...state,
        saving: false,
        error: action.payload,
      }
    }
    case "DELETE_ITEM_FULFILLED": {
      console.log('here: ', action.payload)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }
    }
  }

  return state
}