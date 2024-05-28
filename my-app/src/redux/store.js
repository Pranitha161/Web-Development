
import {configureStore} from '@reduxjs/toolkit';
import userAuthorReducer from './userAuthorSlice';

export const store=configureStore({
    reducer:{
        userAuthoruserAuthorLoginReducer:userAuthorReducer
    }
})
