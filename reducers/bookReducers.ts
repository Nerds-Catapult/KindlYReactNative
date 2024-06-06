import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface BookState {
    id: number;
    title : string;
}


const initialState: BookState = {
    id: 0,
    title: ""
};

const selectBook = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBook(state, action: PayloadAction<BookState>){
            state.id = action.payload.id;
            state.title = action.payload.title;
        }
    }
});

export const { setBook } = selectBook.actions;

export default selectBook.reducer;