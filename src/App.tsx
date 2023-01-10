import React from 'react';

import './App.css';

function App() {
  return (
    <div id="container">
      <ul>
          <li id="scoreBoard"></li>
          <li><button id="reset_game">Reset Game</button></li>
      </ul>
      <canvas id="canvas" width="400" height="200"></canvas>
    </div>
  );
}

export default App;
