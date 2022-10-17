import { createRoot } from "react-dom/client";
import {initializeNotes} from './notes/notesApi.mjs'
import App from "./App";

initializeNotes()

const container = document.getElementById("root");

const root = createRoot(container);

root.render(<App />);