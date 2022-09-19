import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { MindfulJourney } from './MindfulJourney'
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <MindfulJourney />
    </BrowserRouter>
)
