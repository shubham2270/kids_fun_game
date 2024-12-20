import React, { useState } from "react";
import "./App.css";

const shapes = [
  { id: 1, name: "Circle", color: "red", sound: "/sounds/circle.mp3" },
  { id: 2, name: "Square", color: "blue", sound: "/sounds/square.mp3" },
  { id: 3, name: "Triangle", color: "green", sound: "/sounds/triangle.mp3" },
  { id: 4, name: "Star", color: "yellow", sound: "/sounds/star.mp3" },
];

const targets = [
  { id: 1, name: "Circle", color: "red" },
  { id: 2, name: "Square", color: "blue" },
  { id: 3, name: "Triangle", color: "green" },
  { id: 4, name: "Star", color: "yellow" },
];

function App() {
  const [score, setScore] = useState(0);
  const [dragging, setDragging] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleDragStart = (id) => {
    setDragging(id);
  };

  const handleDrop = (id) => {
    const draggedShape = shapes.find((shape) => shape.id === dragging);
    if (dragging === id) {
      setScore(score + 1);
      playSound(draggedShape.sound);
    }
    setDragging(null);
  };

  const handleRestart = () => {
    setScore(0);
    setIsGameStarted(false);
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className='app'>
      {!isGameStarted ? (
        <div className='start-screen'>
          <h1>Fun Shape Matching Game</h1>
          <button className='start-button' onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      ) : (
        <div className='game-screen'>
          <div className='score'>Score: {score}</div>
          <div className='shapes'>
            {shapes.map((shape) => (
              <div
                key={shape.id}
                className='shape'
                draggable
                onDragStart={() => handleDragStart(shape.id)}
                style={{ backgroundColor: shape.color }}
              >
                {shape.name}
              </div>
            ))}
          </div>
          <div className='targets'>
            {targets.map((target) => (
              <div
                key={target.id}
                className='target'
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(target.id)}
                style={{ backgroundColor: target.color }}
              >
                Drop Here
              </div>
            ))}
          </div>
          <button className='restart-button' onClick={handleRestart}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
