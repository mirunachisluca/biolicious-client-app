import {
  ADD_ITEM,
  LOAD_CART,
  REMOVE_ITEM,
  UPDATE_ITEM_QUANTITY
} from './shoppingCartActions';

const initialState = {
  shoppingCartId: null,
  items: []
};

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        shoppingCartId: action.payload.id,
        items: action.payload.items
      };
    case ADD_ITEM: {
      const currentItem = state.items.find((x) => x.id === action.payload.id);
      if (currentItem) {
        const newItem = {
          ...currentItem,
          quantity: currentItem.quantity + action.payload.quantity
        };

        const newItems = state.items.map((item) => {
          if (item.id === newItem.id) return newItem;
          return item;
        });

        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const currentItem = state.items.find(
        (x) => x.id === action.payload.itemId
      );
      const newItem = {
        ...currentItem,
        quantity: action.payload.quantity
      };
      const newItems = state.items.map((item) => {
        if (item.id === newItem.id) return newItem;
        return item;
      });
      return { ...state, items: newItems };
    }
    case REMOVE_ITEM: {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const newItems = [...state.items];

      newItems.splice(itemIndex, 1);

      return { ...state, items: newItems };
    }
    default:
      return state;
  }
}

export { initialState, shoppingCartReducer };
