import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const accessToken = localStorage.getItem("accessToken");
  const [allUserChars, setAllUserChars] = useState([]);
  //get a list of all character with this user id
  useEffect(() => {
    axios
      .get("http://localhost:3001/character/getByUserId", {
        headers: { accessToken },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setAllUserChars(response.data);
        }
      });
  }, []);

  //create Character
  const [str, setStr] = useState(10);
  const [dex, setDex] = useState(10);
  const [con, setCon] = useState(10);
  const [intl, setIntl] = useState(10);
  const [wis, setWis] = useState(10);
  const [cha, setCha] = useState(10);
  const [points, setPTS] = useState(15);

  //increase/decrease stats
  const increaseStat = (stat, setStat) => {
    if (points > 0 && stat < 20) {
      setStat(stat + 1);
      setPTS(points - 1);
    }
  };
  const decreaseStat = (stat, setStat) => {
    if (stat > 3) {
      setStat(stat - 1);
      setPTS(points + 1);
    }
  };

  const [selectedClass, setSelectedClass] = useState("warrior");

  const selectClass = (charClass) => {
    setSelectedClass(charClass);
  };

  const createChar = () => {};

  const [toggleCharCreate, setToggleCharCreate] = useState(false);

  return (
    <div>
      {toggleCharCreate ? (
        <div className="creation">
          <div className="stats">
            <h3>Strength</h3>
            <div className="statbox">
              <button onClick={() => increaseStat(str, setStr)}>+</button>
              <p>{str}</p>
              <button onClick={() => decreaseStat(str, setStr)}>-</button>
            </div>
            <h3>Dexterity</h3>
            <div className="statbox">
              <button onClick={() => increaseStat(dex, setDex)}>+</button>
              <p>{dex}</p>
              <button onClick={() => decreaseStat(dex, setDex)}>-</button>
            </div>
            <h3>Constitution</h3>
            <div className="statbox">
              <button onClick={() => increaseStat(con, setCon)}>+</button>
              <p>{con}</p>
              <button onClick={() => decreaseStat(con, setCon)}>-</button>
            </div>
            <h3>Intelligence</h3>
            <div className="statbox">
              <button onClick={() => increaseStat(intl, setIntl)}>+</button>
              <p>{intl}</p>
              <button onClick={() => decreaseStat(intl, setIntl)}>-</button>
            </div>
            <h3>Wisdom</h3>
            <div className="statbox">
              <button onClick={() => increaseStat(wis, setWis)}>+</button>
              <p>{wis}</p>
              <button onClick={() => decreaseStat(wis, setWis)}>-</button>
            </div>
            <h3>Charisma</h3>
            <div className="statbox">
              <button onClick={() => increaseStat(cha, setCha)}>+</button>
              <p>{cha}</p>
              <button onClick={() => decreaseStat(cha, setCha)}>-</button>
            </div>
            <h3>Points Remaining</h3>
            <div className="remain">
              <p>{points}</p>
            </div>
          </div>
          <div className="classes">
            <div className="classbox">
              <div
                className={
                  selectedClass === "warrior" ? "selected-class" : "class"
                }
                onClick={() => selectClass("warrior")}
              >
                <img src="wizard.png" alt="wizard" />
                <h3>Warrior</h3>
              </div>
              <div
                className={
                  selectedClass === "rogue" ? "selected-class" : "class"
                }
                onClick={() => selectClass("rogue")}
              >
                <img src="wizard.png" alt="rogue" />
                <h3>Rogue</h3>
              </div>
              <div
                className={
                  selectedClass === "wizard" ? "selected-class" : "class"
                }
                onClick={() => selectClass("wizard")}
              >
                <img src="wizard.png" alt="warrior" />
                <h3>Wizard</h3>
              </div>
            </div>
            <div className="classText">
              {selectedClass === "warrior" && (
                <p>
                  As a Warrior you will have more hit points and combat focused
                  abilities. You'll be able to use arms and armor other classes
                  cannot. Your specific skills set means you'll excel in combat,
                  but you may struggle in other areas.
                </p>
              )}
              {selectedClass === "rogue" && (
                <p>
                  As a Rogue, you excel in agility and stealth, utilizing your
                  cunning and finesse to navigate the shadows. With a moderate
                  amount of health, you possess a versatile skill set for
                  sneaking, picking locks, and ambushing enemies. Your ability
                  to blend into the environment and strike from the shadows
                  makes you a formidable opponent in both combat and stealth
                  encounters.
                </p>
              )}
              {selectedClass === "wizard" && (
                <p>
                  Embrace the arcane mysteries as a Wizard, wielding powerful
                  magic spells to shape the world around you. You will have less
                  hit points than other classes but, you can rely on your vast
                  knowledge of magic to overcome challenges and enemies. Through
                  careful study and mastery of the arcane arts, you unleash
                  devastating spells, manipulate elements, and unravel the
                  secrets of the universe. As a Wizard, your intellect and
                  magical prowess are unmatched, making you a force to be
                  reckoned with in any encounter.
                </p>
              )}
            </div>
          </div>

          <button onClick={createChar}>Create</button>
        </div>
      ) : (
        <div>
          {allUserChars &&
            allUserChars.map((value, key) => {
              return (
                <div key={key}>
                  <h3>{value.charName}</h3>
                  <h3>{value.lvl}</h3>
                  <h3>{value.class}</h3>
                  <h3>{value.hp}</h3>
                  <h3>{value.ap}</h3>
                </div>
              );
            })}
          <button
            onClick={() => {
              setToggleCharCreate(true);
            }}
          >
            Create a new character
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
