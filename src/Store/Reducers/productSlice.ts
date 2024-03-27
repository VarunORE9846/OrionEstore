import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Product {
  id: string;
  title: string;
  price: string;
  images: string[];
  quantity: number;
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [] as Product[],
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existIndex = state.items.findIndex(
        (items) => items.id === action.payload.id
      );
      if (existIndex !== -1) {
        //if the product already exists in the cart
        state.items[existIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    deleteFromCart: (state, action:PayloadAction<string>) => ({
      ...state,
      items: state.items.filter((item) => item.id !== action.payload),
    }),
  },
});
export const { addToCart, deleteFromCart } = productSlice.actions;
export default productSlice.reducer;
