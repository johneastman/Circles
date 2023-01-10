import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Vector } from "./circles/vector";
import { Color } from "./circles/color";
import { Circle, CircleRandom, Bullet } from "./circles/circles";
import { Turret } from "./circles/turret";

// Main logic starts here
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
