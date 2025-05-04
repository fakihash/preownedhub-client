import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style/index.css";
import App from "./App.jsx";
import { store, persistor } from "./services/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
