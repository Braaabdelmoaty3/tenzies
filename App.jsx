import React from "react";
import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  const [dice, setDice] = useState(generateRandomNumber());
  const [tenzies, setTenzies] = useState(false);
  const [lose, setLose] = useState(false);
  const { width, height } = useWindowSize();

  function generateRandomNumber() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function checkWinCondition(currentDice) {
    const allHeld = currentDice.every((die) => die.isHeld);
    const firstValue = currentDice[0].value;
    const allSameValue = currentDice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    } else {
      setLose(true);
    }
  }

  const diceElements = dice.map((diceObj) => (
    <Die
      value={diceObj.value}
      isHeld={diceObj.isHeld}
      key={diceObj.id}
      hold={hold}
      id={diceObj.id}
    />
  ));

  function rollDice() {
    setDice((prevDice) => {
      const newDice = prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      });

      // Check win condition after updating dice
      checkWinCondition(newDice);
      return newDice;
    });
  }

  function hold(id) {
    console.log(id);
    // need to flip isHeld to true when the die is clicked
    setDice((prevDice) => {
      const newDice = prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });

      // Check win condition after updating dice
      checkWinCondition(newDice);
      return newDice;
    });
  }

  if (tenzies) {
    return (
      <div className="min-h-screen bg-[#0B2434] flex items-center justify-center">
        {tenzies && <Confetti width={width} height={height} />}
        <div className="bg-[#F5F5F5] w-[520px] h-[520px] rounded-[10px] flex flex-col items-center justify-around py-[40px]">
          <h1 className="text-[40px] font-bold text-[#2B283A] font-karla">
            You Win!
          </h1>
          <button
            onClick={() => {
              setTenzies(false);
              setDice(generateRandomNumber());
            }}
            className="bg-[#5035FF] text-white py-[10px] px-[35px] rounded-[5px] text-[20px] font-bold font-karla"
          >
            New Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#0B2434] min-h-screen flex items-center justify-center">
      <div className="bg-[#F5F5F5] w-[520px] h-[520px] rounded-[10px] flex flex-col items-center justify-around py-[40px]">
        <div className="max-w-[350px] text-center">
          <h1 className="text-[40px] font-bold mb-[10px] text-[#2B283A] font-karla">
            Tenzies
          </h1>
          <p className="text-[#4A4E74] text-[20px] font-karla">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-[20px] max-w-[400px]">
          {diceElements}
        </div>
        <button
          onClick={rollDice}
          className="bg-[#5035FF] text-white py-[10px] px-[35px] rounded-[5px] text-[20px] font-bold font-karla focus:outline-none hover:bg-[#3d28c7] transition-colors"
        >
          Roll
        </button>
      </div>
    </main>
  );
}
