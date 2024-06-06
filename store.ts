import { configureStore } from '@reduxjs/toolkit';
import selectBook from './reducers/bookReducers';



const Store = configureStore({
    reducer: {
        selectBook
    }
});


export default Store;