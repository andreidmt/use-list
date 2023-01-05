import React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./app"

const reactDomElm = document.querySelector("#react-root")
const reactRoot = createRoot(reactDomElm)

reactRoot.render(<App />)
