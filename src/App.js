import React from "react";
import { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard";
import Cards from "./Cards";
import "./styles/styles.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [sixteenCountries, setSixteenCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [clickedCountries, setClickedCountries] = useState([]);

  useEffect(() => {
    const fetchCountryCodes = () => {
      fetch("https://flagcdn.com/en/codes.json")
        .then((response) => response.json())
        .then((data) => {
          let getCountries = [...Object.entries(data)];
          setAllCountries(getCountries);
        })
        .catch((error) => console.error(error));
    };
    fetchCountryCodes();
  }, []);

  useEffect(() => {
    if (currentScore > highestScore) {
      setHighestScore(currentScore);
    }
  }, [currentScore, highestScore]);

  //To-Do to shuffle countries display
  // useEffect(() => {
  //   setSixteenCountries(...)
  // }, [clickedCountries]);

  function updateCountries() {
    let shuffledCountries = allCountries.sort((a, b) => 0.5 - Math.random());
    let sixteenShuffledCountries = [];
    for (let i = 0; i < 16; i++) {
      sixteenShuffledCountries.push(shuffledCountries[i]);
    }
    setSixteenCountries(sixteenShuffledCountries);
  }

  function shuffleDisplay() {
    setSixteenCountries(sixteenCountries.sort((a, b) => 0.5 - Math.random()));
  }

  function onCountryClick(country) {
    if (clickedCountries.includes(country)) {
      setClickedCountries([]);
      setCurrentScore(0);
      updateCountries();
      return;
    }
    setClickedCountries([...clickedCountries, country]);
    setCurrentScore(currentScore + 1);
    shuffleDisplay();
  }

  return (
    <div className="App">
      <Scoreboard currentScore={currentScore} highestScore={highestScore} />
      <Cards
        sixteenCountries={sixteenCountries}
        updateCountries={updateCountries}
        onCountryClick={onCountryClick}
      />
    </div>
  );
}

export default App;
