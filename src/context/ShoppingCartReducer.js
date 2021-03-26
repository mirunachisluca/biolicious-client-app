const initialState = {
  shoppingCartId: null,
  items: []
};

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        shoppingCartId: action.payload.id,
        items: action.payload.items
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    default:
      return state;
  }
}

export { initialState, shoppingCartReducer };
