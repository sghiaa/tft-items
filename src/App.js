import { useState } from 'react';
import './App.css';
import ItemButton from './components/ItemButton';
import {Container, Row, Col} from 'react-bootstrap';
import giantsBelt from "./icons/1011.png";
import chainVest from "./icons/1031.png";
import bfSword from "./icons/1038.png";
import recurveBow from "./icons/1043.png";
import negatronCloak from "./icons/1057.png";
import needlesslyLargeRod from "./icons/1058.png";
import tearOfTheGoddess from "./icons/3070.png";
import spatula from "./icons/4403.png";
import sparringGloves from "./icons/sparringGloves.webp";


function App() {
  const baseItems = [{
    "id": 0,
    "name": "Negatron Cloak",
    "icon": negatronCloak,
  },
  {
    "id": 1,
    "name": "B. F. Sword",
    icon: bfSword,
  },
  {
    "id": 2,
    "name": "Chain Vest",
    icon: chainVest,
  },
  {
    "id": 3,
    "name": "Needlessly Large Rod",
    icon: needlesslyLargeRod,
  },
  {
    "id": 4,
    "name": "Recurve Bow",
    icon: recurveBow,
  },
  {
    "id": 5,
    "name": "Sparring Gloves",
    icon: sparringGloves,
  },
  {
    "id": 6,
    "name": "Spatula",
    icon: spatula,
  },
  {
    "id": 7,
    "name": "Tear of the Goddess",
    icon: tearOfTheGoddess,
  },
  {
    "id": 8,
    "name": "Giant's Belt",
    icon: giantsBelt,
  }];
  const completedItems = [
    {
      id: 2,
      name: "Dragon's Claw",
      components: [0, 0],
     },
    {
      id: 20,
      name: "Bloodthirster",
      components: [0, 1],
     },
    {
      id: 23,
      name: "Gargoyle Stoneplate",
      components: [0, 2],
     },
    {
      id: 27,
      name: "Ionic Spark",
      components: [0, 3],
     },
    {
      id: 13,
      name: "Runaan's Hurricane",
      components: [0, 4],
     },
    {
      id: 42,
      name: "Quicksilver",
      components: [0, 5],
     },
    {
      id: 19,
      name: "A.D.M.I.N. Emblem",
      components: [0, 6],
     },
    {
      id: 39,
      name: "Chalice of Power",
      components: [0, 7],
     },
    {
      id: 44,
      name: "Zephyr",
      components: [0, 8],
    },
    {
      id: 22,
      name: "Deathblade",
      components: [1, 1],
     },
    {
      id: 4,
      name: "Edge of Night",
      components: [1, 2],
     },
    {
      id: 25,
      name: "Hextech Gunblade",
      components: [1, 3],
     },
    {
      id: 5,
      name: "Giant Slayer",
      components: [1, 4],
     },
    {
      id: 26,
      name: "Infinity Edge",
      components: [1, 5],
     },
    {
      id: 41,
      name: "Laser Corps Emblem",
      components: [1, 6],
     },
    {
      id: 15,
      name: "Spear of Shojin",
      components: [1, 7],
     },
    {
      id: 36,
      name: "Zeke's Herald",
      components: [1, 8],
     },
    {
      id: 21,
      name: "Bramble Vest",
      components: [2, 2],
     },
    {
      id: 10,
      name: "Locket of the Iron Solari",
      components: [2, 3],
     },
    {
      id: 35,
      name: "Titan's Resolve",
      components: [2, 4],
     },
    {
      id: 14,
      name: "Shroud of Stillness",
      components: [2, 5],
     },
    {
      id: 29,
      name: "Ox Force Emblem",
      components: [2, 6],
     },
    {
      id: 30,
      name: "Protector's Vow",
      components: [2, 7],
     },
    {
      id: 34,
      name: "Sunfire Cape",
      components: [2, 8],
     },
    {
      id: 31,
      name: "Rabadon's Deathcap",
      components: [3, 3],
     },
    {
      id: 7,
      name: "Guinsoo's Rageblade",
      components: [3, 4],
     },
    {
      id: 8,
      name: "Jeweled Gauntlet",
      components: [3, 5],
     },
    {
      id: 0,
      name: "Anima Squad Emblem",
      components: [3, 6],
     },
    {
      id: 38,
      name: "Archangel's Staff",
      components: [3, 7],
     },
    {
      id: 28,
      name: "Morellonomicon",
      components: [3, 8],
     },
    {
      id: 43,
      name: "Rapid Firecannon",
      components: [4, 4],
     },
    {
      id: 9,
      name: "Last Whisper",
      components: [4, 5],
     },
    {
      id: 3,
      name: "Duelist Emblem",
      components: [4, 6],
     },
    {
      id: 33,
      name: "Statikk Shiv",
      components: [4, 7],
     },
    {
      id: 37,
      name: "Zz'Rot Portal",
      components: [4, 8],
    },
    {
      id: 17,
      name: "Thief's Gloves",
      components: [5, 5],
     },
    {
      id: 12,
      name: "Renegade Emblem",
      components: [5, 6],
     },
    {
      id: 40,
      name: "Hand of Justice",
      components: [5, 7],
     },
    {
      id: 6,
      name: "Guardbreaker",
      components: [5, 8],
     },
    {
      id: 16,
      name: "Tactician's Crown",
      components: [6, 6],
     },
    {
      id: 24,
      name: "Heart Emblem",
      components: [6, 7],
     },
    {
      id: 11,
      name: "Mascot Emblem",
      components: [6, 8],
     },
    {
      id: 1,
      name: "Blue Buff",
      components: [7, 7],
     },
    {
      id: 32,
      name: "Redemption",
      components: [7, 8],
     },
    {
      id: 18,
      name: "Warmog's Armor",
      components: [8, 8],
    },
  ];

  const item = Math.floor(Math.random()*45)
  const component = Math.floor(Math.random()*2)
  const [streak, setStreak] = useState(0);
  const success = () => {
    setStreak(streak+1);
  }
  const failure = () => {
    setStreak(0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1>streak: {streak}</h1>
          <div>You want: {completedItems[item].name} </div>
          <div>you have: <img src={baseItems[completedItems[item].components[component]].icon} />
          </div>
          <Row>
          {baseItems.map((i) => {
            return (
              <Col>
                <ItemButton key={i.id} failure={failure} success={success} answer={i} existing={baseItems[completedItems[item].components[component]]} targetItem={completedItems[item]} />
              </Col>
            )})}
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
