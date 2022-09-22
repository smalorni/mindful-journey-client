import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { MindfulJourney } from './MindfulJourney'
import * as React from 'react';


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <MindfulJourney />
    </BrowserRouter>
)
