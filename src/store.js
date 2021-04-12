import { createStore, combineReducers} from "redux";
import { todos } from './todos/reducers';
import { persistReducer} from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storageSession from 'redux-persist/es/storage/session'

// Put all reducers defined later on here
const reducers = {
    todos,
};

const persistConfig = {
    key: 'root',
    storage: storageSession,
    stateReconciler: autoMergeLevel2,
}
const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(persistedReducer);
