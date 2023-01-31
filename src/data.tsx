import giantsBelt from "./icons/1011.png";
import chainVest from "./icons/1031.png";
import bfSword from "./icons/1038.png";
import recurveBow from "./icons/1043.png";
import negatronCloak from "./icons/1057.png";
import needlesslyLargeRod from "./icons/1058.png";
import tearOfTheGoddess from "./icons/3070.png";
import spatula from "./icons/4403.png";
import sparringGloves from "./icons/sparringGloves.webp";
import adminEmblem from "./icons/a.webp";
import animaSquadEmblem from "./icons/anima-squad-emblem.webp";
import archangelsStaff from "./icons/archangels-staff.webp";
import bloodthirster from "./icons/bloodthirster.webp";
import blueBuff from "./icons/blue-buff.webp";
import brambleVest from "./icons/bramble-vest.webp";
import chaliceOfPower from "./icons/chalice-of-power.webp";
import deathblade from "./icons/deathblade.webp";
import dragonsClaw from "./icons/dragons-claw.webp";
import duelistEmblem from "./icons/duelist-emblem.webp";
import edgeOfNight from "./icons/edge-of-night.webp";
import protectorsVow from "./icons/fimbulwinter.webp";
import gargoyleStoneplate from "./icons/gargoyle-stoneplate.webp";
import giantSlayer from "./icons/giant-slayer.webp";
import guardbreaker from "./icons/guardbreaker.webp";
import guinsoosRageblade from "./icons/guinsoos-rageblade.webp";
import handOfJustice from "./icons/hand-of-justice.png";
import heartEmblem from "./icons/heart-emblem.webp";
import hextechGunblade from "./icons/hextech-gunblade.webp";
import infinityEdge from "./icons/infinity-edge.webp";
import ionicSpark from "./icons/ionic-spark.webp";
import jeweledGauntlet from "./icons/jeweled-gauntlet.webp";
import laserCorpsEmblem from "./icons/laser-corps-emblem.webp";
import lastWhisper from "./icons/last-whisper.webp";
import locketOfTheIronSolari from "./icons/locket-of-the-iron-solari.webp";
import mascotEmblem from "./icons/mascot-emblem.webp";
import morellonomicon from "./icons/morellonomicon.webp";
import oxForceEmblem from "./icons/ox-force-emblem.webp";
import quicksilver from "./icons/quicksilver.webp";
import rabadonsDeathcap from "./icons/rabadons-deathcap.webp";
import rapidfireCannon from "./icons/rapid-firecannon.webp";
import redemption from "./icons/redemption.webp";
import renegadeEmblem from "./icons/renegade-emblem.webp";
import runaansHurricane from "./icons/runaans-hurricane.webp";
import shroudOfStillness from "./icons/shroud-of-stillness.webp";
import spearOfShojin from "./icons/spear-of-shojin2.webp";
import statikkShiv from "./icons/statikk-shiv.webp";
import sunfireCape from "./icons/sunfire-cape.webp";
import tacticiansCrown from "./icons/tacticians-crown.webp";
import thiefsGloves from "./icons/thiefs-gloves.webp";
import titansResolve from "./icons/titans-resolve.webp";
import warmogsArmor from "./icons/warmogs-armor.webp";
import zekesHerald from "./icons/zekes-herald.webp";
import zephyr from "./icons/zephyr.webp";
import zzrotPortal from "./icons/zzrot-portal.webp";

interface Item {
  id: number;
  name: string;
  icon: string;
  components?: Array<number>;
}

const baseItems: Array<Item> = [{
  id: 0,
  name: "Negatron Cloak",
  icon: negatronCloak,
},
{
  id: 1,
  name: "B. F. Sword",
  icon: bfSword,
},
{
  id: 2,
  name: "Chain Vest",
  icon: chainVest,
},
{
  id: 3,
  name: "Needlessly Large Rod",
  icon: needlesslyLargeRod,
},
{
  id: 4,
  name: "Recurve Bow",
  icon: recurveBow,
},
{
  id: 5,
  name: "Sparring Gloves",
  icon: sparringGloves,
},
{
  id: 6,
  name: "Spatula",
  icon: spatula,
},
{
  id: 7,
  name: "Tear of the Goddess",
  icon: tearOfTheGoddess,
},
{
  id: 8,
  name: "Giant's Belt",
  icon: giantsBelt,
}];
const completedItems: Array<Item> = [
  {
    id: 2,
    name: "Dragon's Claw",
    icon: dragonsClaw,
    components: [0, 0],
  },
  {
    id: 20,
    name: "Bloodthirster",
    components: [0, 1],
    icon: bloodthirster,
  },
  {
    id: 23,
    name: "Gargoyle Stoneplate",
    components: [0, 2],
    icon: gargoyleStoneplate,
  },
  {
    id: 27,
    name: "Ionic Spark",
    components: [0, 3],
    icon: ionicSpark,
  },
  {
    id: 13,
    name: "Runaan's Hurricane",
    components: [0, 4],
    icon: runaansHurricane,
  },
  {
    id: 42,
    name: "Quicksilver",
    components: [0, 5],
    icon: quicksilver,
  },
  {
    id: 19,
    name: "A.D.M.I.N. Emblem",
    components: [0, 6],
    icon: adminEmblem,
  },
  {
    id: 39,
    name: "Chalice of Power",
    components: [0, 7],
    icon: chaliceOfPower,
  },
  {
    id: 44,
    name: "Zephyr",
    components: [0, 8],
    icon: zephyr,
  },
  {
    id: 22,
    name: "Deathblade",
    components: [1, 1],
    icon: deathblade,
  },
  {
    id: 4,
    name: "Edge of Night",
    components: [1, 2],
    icon: edgeOfNight,
  },
  {
    id: 25,
    name: "Hextech Gunblade",
    components: [1, 3],
    icon: hextechGunblade,
  },
  {
    id: 5,
    name: "Giant Slayer",
    components: [1, 4],
    icon: giantSlayer,
  },
  {
    id: 26,
    name: "Infinity Edge",
    components: [1, 5],
    icon: infinityEdge,
  },
  {
    id: 41,
    name: "Laser Corps Emblem",
    components: [1, 6],
    icon: laserCorpsEmblem,
  },
  {
    id: 15,
    name: "Spear of Shojin",
    components: [1, 7],
    icon: spearOfShojin,
  },
  {
    id: 36,
    name: "Zeke's Herald",
    components: [1, 8],
    icon: zekesHerald,
  },
  {
    id: 21,
    name: "Bramble Vest",
    components: [2, 2],
    icon: brambleVest,
  },
  {
    id: 10,
    name: "Locket of the Iron Solari",
    components: [2, 3],
    icon: locketOfTheIronSolari,
  },
  {
    id: 35,
    name: "Titan's Resolve",
    components: [2, 4],
    icon: titansResolve,
  },
  {
    id: 14,
    name: "Shroud of Stillness",
    components: [2, 5],
    icon: shroudOfStillness,
  },
  {
    id: 29,
    name: "Ox Force Emblem",
    components: [2, 6],
    icon: oxForceEmblem,
  },
  {
    id: 30,
    name: "Protector's Vow",
    components: [2, 7],
    icon: protectorsVow,
  },
  {
    id: 34,
    name: "Sunfire Cape",
    components: [2, 8],
    icon: sunfireCape,
  },
  {
    id: 31,
    name: "Rabadon's Deathcap",
    components: [3, 3],
    icon: rabadonsDeathcap,
  },
  {
    id: 7,
    name: "Guinsoo's Rageblade",
    components: [3, 4],
    icon: guinsoosRageblade,
  },
  {
    id: 8,
    name: "Jeweled Gauntlet",
    components: [3, 5],
    icon: jeweledGauntlet,
  },
  {
    id: 0,
    name: "Anima Squad Emblem",
    components: [3, 6],
    icon: animaSquadEmblem,
  },
  {
    id: 38,
    name: "Archangel's Staff",
    components: [3, 7],
    icon: archangelsStaff,
  },
  {
    id: 28,
    name: "Morellonomicon",
    components: [3, 8],
    icon: morellonomicon,
  },
  {
    id: 43,
    name: "Rapid Firecannon",
    components: [4, 4],
    icon: rapidfireCannon,
  },
  {
    id: 9,
    name: "Last Whisper",
    components: [4, 5],
    icon: lastWhisper,
  },
  {
    id: 3,
    name: "Duelist Emblem",
    components: [4, 6],
    icon: duelistEmblem,
  },
  {
    id: 33,
    name: "Statikk Shiv",
    components: [4, 7],
    icon: statikkShiv,
  },
  {
    id: 37,
    name: "Zz'Rot Portal",
    components: [4, 8],
    icon: zzrotPortal,
  },
  {
    id: 17,
    name: "Thief's Gloves",
    components: [5, 5],
    icon: thiefsGloves,
  },
  {
    id: 12,
    name: "Renegade Emblem",
    components: [5, 6],
    icon: renegadeEmblem,
  },
  {
    id: 40,
    name: "Hand of Justice",
    components: [5, 7],
    icon: handOfJustice,
  },
  {
    id: 6,
    name: "Guardbreaker",
    components: [5, 8],
    icon: guardbreaker,
  },
  {
    id: 16,
    name: "Tactician's Crown",
    components: [6, 6],
    icon: tacticiansCrown,
  },
  {
    id: 24,
    name: "Heart Emblem",
    components: [6, 7],
    icon: heartEmblem,
  },
  {
    id: 11,
    name: "Mascot Emblem",
    components: [6, 8],
    icon: mascotEmblem,
  },
  {
    id: 1,
    name: "Blue Buff",
    components: [7, 7],
    icon: blueBuff,
  },
  {
    id: 32,
    name: "Redemption",
    components: [7, 8],
    icon: redemption,
  },
  {
    id: 18,
    name: "Warmog's Armor",
    components: [8, 8],
    icon: warmogsArmor,
  },
];

export { baseItems, completedItems, Item };