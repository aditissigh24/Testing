import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function SpeedDial({ speed, max = 50 }) {
  const clamped = Math.min(speed || 0, max);
  const angle = (clamped / max) * 180 - 90; // -90deg is far left

  return (
    <svg width="200" height="110" viewBox="0 0 200 110" className="speed-dial">
      <path
        d="M10 100 A90 90 0 0 1 190 100"
        fill="none"
        stroke="#ccc"
        strokeWidth="10"
      />
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="20"
        stroke="red"
        strokeWidth="4"
        transform={`rotate(${angle} 100 100)`}
      />
    </svg>
  );
}

function App() {
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    const measureSpeed = async () => {
      if (navigator.connection && navigator.connection.downlink) {
        setSpeed(navigator.connection.downlink);
        return;
      }
      try {
        const image =
          "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg";
        const startTime = performance.now();
        const response = await fetch(image + "?cache=" + startTime, {
          cache: "no-cache",
        });
        const blob = await response.blob();
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        const bitsLoaded = blob.size * 8;
        const mbps = bitsLoaded / duration / (1024 * 1024);
        setSpeed(mbps);
      } catch (e) {
        setSpeed(null);
      }
    };

    measureSpeed();
    const id = setInterval(measureSpeed, 5000);
    return () => clearInterval(id);
  }, []);

  const speedClass = speed !== null && speed >= 5 ? "good-speed" : "bad-speed";
  const speedText =
    speed !== null ? `${speed.toFixed(2)} Mbps` : "Unable to determine speed";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <SpeedDial speed={speed} />
        <p className={speedClass}>Internet speed: {speedText}</p>
      </header>
    </div>
  );
}

export default App;
