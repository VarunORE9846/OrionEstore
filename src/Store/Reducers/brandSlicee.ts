
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Brand {
    id: string;
    name: string;
    description: string;
}
const initialState: { items: Brand[] } = {
    items: [] as Brand[]
};

const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        brandData: (state, action: PayloadAction<Brand>) => {
           state.items.push(action.payload);
        }
    }
});

export const { brandData } = brandSlice.actions;
export default brandSlice.reducer;
