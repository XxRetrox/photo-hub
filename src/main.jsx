import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scroll_to_top.jsx";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
