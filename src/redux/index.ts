import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger"
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import {PersistConfig} from "redux-persist/es/types";
import * as localforage from "localforage";

//import the reducers
import saveContractDetails from "./saveContractDetails";

//define the reducers
const reducers = combineReducers({
    saveContractDetails
})

//define the persist config variable
const persistConfig : PersistConfig<any> = {
    key:"root",
    storage: localforage,
    whitelist: [],
    timeout: undefined
}

const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
    reducer: persistedReducer,
    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
});
