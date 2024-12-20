import React, { useState, useEffect } from "react";
import "./App.css";
import Confetti from "react-confetti";
import gameStartSound from "./sounds/game-start.mp3";
import selectSound from "./sounds/select-sound.mp3";
import correctSound from "./sounds/correct-sound.mp3";
import wrongSound from "./sounds/wrong-sound.mp3";
import restartSound from "./sounds/restart-sound.mp3";
import bgSound from "./sounds/bg-music.mp3";
import winningSound from "./sounds/winning.mp3";

const shapes = [
  { id: 1, name: "circle" },
  { id: 2, name: "square" },
  { id: 3, name: "triangle" },
  { id: 4, name: "star" },
];

const targets = [
  { id: 1, name: "circle", isMatched: false },
  { id: 2, name: "square", isMatched: false },
  { id: 3, name: "triangle", isMatched: false },
  { id: 4, name: "star", isMatched: false },
];

function App() {
  const [score, setScore] = useState(0);
  const [dragging, setDragging] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentTargets, setCurrentTargets] = useState(targets);
  const [showPopup, setShowPopup] = useState(false);
  const soundRef = React.useRef(false);

  const playSound = (sound, vol) => {
    const audio = new Audio(sound);
    audio.volume = vol || 1;
    audio.play();
  };

  const playBgSound = () => {
    const audio = new Audio(bgSound);
    audio.play();
    audio.volume = 0.2;
    audio.loop = true;
  };

  const handleDragStart = (id) => {
    setDragging(id);
    playSound(selectSound);
  };

  const handleDrop = (id) => {
    const draggedShape = shapes.find((shape) => shape.id === dragging);
    if (dragging === id) {
      setScore(score + 1);
      const updatedTargets = currentTargets.map((target) => {
        if (target.id === id) {
          return { ...target, isMatched: true };
        }
        return target;
      });
      setCurrentTargets(updatedTargets);
      playSound(correctSound);

      // Check if all shapes are matched
      if (updatedTargets.every((target) => target.isMatched)) {
        setShowPopup(true);
      }
    } else {
      playSound(wrongSound);
      setDragging(null);
    }
  };

  const handleRestart = () => {
    setCurrentTargets(targets);
    setScore(0);
    setIsGameStarted(false);
    setShowPopup(false);
    playSound(restartSound);
  };

  const handleStartGame = () => {
    if (soundRef.current === false) {
      playBgSound();
      soundRef.current = true;
    }
    setCurrentTargets(targets);
    setShowPopup(false);
    playSound(gameStartSound);
    setIsGameStarted(true);
  };

  return (
    <div className='app'>
      {showPopup && (
        <div className='popup'>
          {playSound(winningSound, 0.2)}
          <h2 className='win-text'>You Win!</h2>
          <p className='restart'>
            <button className='restart-button' onClick={handleStartGame}>
              Restart Game
            </button>
          </p>
          <div className='confetti'>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          </div>
        </div>
      )}
      {!isGameStarted ? (
        <div className='start-screen'>
          <div className='content'>
            <h1>Fun Shape Matching Game</h1>
            <button className='start-button' onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <div className='game-screen'>
          <div className='score'>Score: {score}</div>
          <div className='container'>
            <div className='shapes'>
              {shapes.map((shape) => (
                <div
                  key={shape.id}
                  className='shape'
                  draggable
                  onDragStart={() => handleDragStart(shape.id)}
                >
                  <div class={shape.name}></div>
                </div>
              ))}
            </div>
            <div className='targets'>
              {currentTargets.map((target) => (
                <div
                  key={target.id}
                  className='target'
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(target.id)}
                >
                  {target.isMatched ? (
                    <div class={target.name}></div>
                  ) : (
                    <div class={`empty-${target.name}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button className='restart-button' onClick={handleRestart}>
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
