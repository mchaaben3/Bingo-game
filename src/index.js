import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";

import "./styles.css";

import { start } from "./components/Bingo";

function Bingo() {
  useEffect(() => {
      start();
  },[]);

  return (<div>
    <canvas id="canvas" />
    <button onClick={() => window.location.reload()} className="button">New Game</button>
    </div>);
}

function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const bbb = [
 " Hi, who just joined?",
"Can you email that to everyone?",
"____, are you there?",
"Uh, _______ you’re still sharing.",
"Hey guys, I have to jump to another call.",
"(sound of someone typing, possibly with a hammer)",
"Hi, can you hear me?",
"(Loud, painful echo/feedback)",
"Next slide, please.",
"Child or animal noise in the background.",
"Hello…, Hello?",
"Can everyone go on mute?",
"No, it’s still loading.",
"I’m sorry, I was on mute.",
"Sorry, go ahead (for over-talkers).",
"I’m sorry, you cut out there.",
"So (fade-out) I can (gone).",
"I have a hard stop at ______.",
"Can we take this offline?",
"Sorry, I’m late for (insert excuse).",
"I’ll have to get back to you.",
"Sorry, I was having connection issues.",
"I think there is a lag.",
"Can everyone see my screen?",
"Sorry, I didn’t catch that. Can you repeat?"
];

const data = bbb.reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

function App() {
  const [state, setState] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
      
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);

      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
      <h1>Bingo</h1>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </div>
    {
      state.won ?
          <Bingo />
      : null
    }
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
