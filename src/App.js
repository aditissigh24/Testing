import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

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
        <p className={speedClass}>Internet speed: {speedText}</p>
      </header>
    </div>
  );
}

export default App;
