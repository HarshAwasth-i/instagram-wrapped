import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

import {
InstagramProvider
}
from "./context/InstagramContext.tsx";



ReactDOM.createRoot(
document.getElementById("root")!
)

.render(

<React.StrictMode>

<InstagramProvider>

<App />

</InstagramProvider>

</React.StrictMode>

);