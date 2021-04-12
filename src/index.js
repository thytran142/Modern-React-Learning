import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from "./store";
import App from './App.js';
import { persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}
        loading={<div>Loading...</div>}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root"));
