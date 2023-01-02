import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";

import tablesStore from "./store/Tables-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={tablesStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
