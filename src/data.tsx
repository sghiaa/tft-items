interface Component {
  id: number;
  name: string;
  icon: string;
}

interface CompletedItem {
  id: number;
  name: string;
  icon: string;
  components: Array<number>;
}

type Item = Component | CompletedItem;

const baseItems: Array<Component> = [
  {
    "id": 0,
    "name": "Negatron Cloak",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_negatroncloak.png"
  },
  {
    "id": 1,
    "name": "B.F. Sword",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_bfsword.png"
  },
  {
    "id": 2,
    "name": "Chain Vest",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_chainvest.png"
  },
  {
    "id": 3,
    "name": "Needlessly Large Rod",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_needlesslylargerod.png"
  },
  {
    "id": 4,
    "name": "Recurve Bow",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_recurvebow.png"
  },
  {
    "id": 5,
    "name": "Sparring Gloves",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_sparringgloves.png"
  },
  {
    "id": 6,
    "name": "Spatula",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_spatula.png"
  },
  {
    "id": 7,
    "name": "Tear of the Goddess",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_tearofthegoddess.png"
  },
  {
    "id": 8,
    "name": "Giant's Belt",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_giantsbelt.png"
  },
  {
    "id": 9,
    "name": "Frying Pan",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_fryingpan.png"
  }
];

const completedItems: Array<CompletedItem> = [
  {
    "id": 0,
    "name": "Dragon's Claw",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_dragonsclaw.png",
    "components": [
      0,
      0
    ]
  },
  {
    "id": 1,
    "name": "Bloodthirster",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_bloodthirster.png",
    "components": [
      1,
      0
    ]
  },
  {
    "id": 2,
    "name": "Gargoyle Stoneplate",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_gargoylestoneplate.png",
    "components": [
      2,
      0
    ]
  },
  {
    "id": 3,
    "name": "Ionic Spark",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_ionicspark.png",
    "components": [
      3,
      0
    ]
  },
  {
    "id": 4,
    "name": "Kraken's Fury",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_krakenslayer.png",
    "components": [
      0,
      4
    ]
  },
  {
    "id": 5,
    "name": "Quicksilver",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_quicksilver.png",
    "components": [
      5,
      0
    ]
  },
  {
    "id": 6,
    "name": "Adaptive Helm",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_adaptivehelm.png",
    "components": [
      0,
      7
    ]
  },
  {
    "id": 7,
    "name": "Protector's Vow",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_frozenheart.png",
    "components": [
      7,
      2
    ]
  },
  {
    "id": 8,
    "name": "Bramble Vest",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_bramblevest.png",
    "components": [
      2,
      2
    ]
  },
  {
    "id": 9,
    "name": "Crownguard",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_crownguard.png",
    "components": [
      3,
      2
    ]
  },
  {
    "id": 10,
    "name": "Titan's Resolve",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_titansresolve.png",
    "components": [
      2,
      4
    ]
  },
  {
    "id": 11,
    "name": "Sunfire Cape",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_redbuff.png",
    "components": [
      2,
      8
    ]
  },
  {
    "id": 12,
    "name": "Rabadon's Deathcap",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_rabadonsdeathcap.png",
    "components": [
      3,
      3
    ]
  },
  {
    "id": 13,
    "name": "Archangel's Staff",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_archangelsstaff.png",
    "components": [
      3,
      7
    ]
  },
  {
    "id": 14,
    "name": "Morellonomicon",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_morellonomicon.png",
    "components": [
      3,
      8
    ]
  },
  {
    "id": 15,
    "name": "Guinsoo's Rageblade",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_guinsoosrageblade.png",
    "components": [
      4,
      3
    ]
  },
  {
    "id": 16,
    "name": "Jeweled Gauntlet",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_jeweledgauntlet.png",
    "components": [
      3,
      5
    ]
  },
  {
    "id": 17,
    "name": "Deathblade",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_deathblade.png",
    "components": [
      1,
      1
    ]
  },
  {
    "id": 18,
    "name": "Edge of Night",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_guardianangel.png",
    "components": [
      1,
      2
    ]
  },
  {
    "id": 19,
    "name": "Hextech Gunblade",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_hextechgunblade.png",
    "components": [
      1,
      3
    ]
  },
  {
    "id": 20,
    "name": "Giant Slayer",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_madredsbloodrazor.png",
    "components": [
      1,
      4
    ]
  },
  {
    "id": 21,
    "name": "Infinity Edge",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_infinityedge.png",
    "components": [
      1,
      5
    ]
  },
  {
    "id": 22,
    "name": "Spear of Shojin",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_spearofshojin.png",
    "components": [
      1,
      7
    ]
  },
  {
    "id": 23,
    "name": "Sterak's Gage",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_steraksgage.png",
    "components": [
      1,
      8
    ]
  },
  {
    "id": 24,
    "name": "Last Whisper",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_lastwhisper.png",
    "components": [
      4,
      5
    ]
  },
  {
    "id": 25,
    "name": "Nashor's Tooth",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_leviathan.png",
    "components": [
      4,
      8
    ]
  },
  {
    "id": 26,
    "name": "Red Buff",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_rapidfirecannon.png",
    "components": [
      4,
      4
    ]
  },
  {
    "id": 27,
    "name": "Void Staff",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_voidstaff.png",
    "components": [
      4,
      7
    ]
  },
  {
    "id": 28,
    "name": "Thief's Gloves",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_thiefsgloves.png",
    "components": [
      5,
      5
    ]
  },
  {
    "id": 29,
    "name": "Hand Of Justice",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_unstableconcoction.png",
    "components": [
      7,
      5
    ]
  },
  {
    "id": 30,
    "name": "Striker's Flail",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_powergauntlet.png",
    "components": [
      8,
      5
    ]
  },
  {
    "id": 31,
    "name": "Blue Buff",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_bluebuff.png",
    "components": [
      7,
      7
    ]
  },
  {
    "id": 32,
    "name": "Spirit Visage",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_spiritvisagerr.png",
    "components": [
      7,
      8
    ]
  },
  {
    "id": 33,
    "name": "Warmog's Armor",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_warmogsarmor.png",
    "components": [
      8,
      8
    ]
  },
  {
    "id": 34,
    "name": "Steadfast Heart",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_nightharvester.png",
    "components": [
      2,
      5
    ]
  },
  {
    "id": 35,
    "name": "Evenshroud",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_spectralgauntlet.png",
    "components": [
      0,
      8
    ]
  },
  {
    "id": 36,
    "name": "Tactician's Crown",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_forceofnature.png",
    "components": [
      6,
      6
    ]
  },
  {
    "id": 37,
    "name": "Tactician's Cape",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_tacticiansring.png",
    "components": [
      6,
      9
    ]
  },
  {
    "id": 38,
    "name": "Tactician's Shield",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_tacticiansscepter.png",
    "components": [
      9,
      9
    ]
  },
  {
    "id": 39,
    "name": "Arbiter Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_arbiter.png",
    "components": [
      6,
      0
    ]
  },
  {
    "id": 40,
    "name": "Timebreaker Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_timebreaker.png",
    "components": [
      6,
      4
    ]
  },
  {
    "id": 41,
    "name": "N.O.V.A. Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_nova.png",
    "components": [
      6,
      5
    ]
  },
  {
    "id": 42,
    "name": "Meeple Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_meeple.png",
    "components": [
      6,
      2
    ]
  },
  {
    "id": 43,
    "name": "Stargazer Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_stargazer.png",
    "components": [
      6,
      3
    ]
  },
  {
    "id": 44,
    "name": "Dark Star Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_darkstar.png",
    "components": [
      6,
      1
    ]
  },
  {
    "id": 45,
    "name": "Space Groove Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_spacegroove.png",
    "components": [
      6,
      7
    ]
  },
  {
    "id": 46,
    "name": "Primordian Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_primordian.png",
    "components": [
      6,
      8
    ]
  },
  {
    "id": 47,
    "name": "Vanguard Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_vanguard.png",
    "components": [
      9,
      0
    ]
  },
  {
    "id": 48,
    "name": "Shepherd Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_sheperd.png",
    "components": [
      9,
      7
    ]
  },
  {
    "id": 49,
    "name": "Brawler Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_brawler.png",
    "components": [
      9,
      8
    ]
  },
  {
    "id": 50,
    "name": "Rogue Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_rogue.png",
    "components": [
      9,
      5
    ]
  },
  {
    "id": 51,
    "name": "Challenger Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_challenger.png",
    "components": [
      9,
      4
    ]
  },
  {
    "id": 52,
    "name": "Marauder Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_marauder.png",
    "components": [
      9,
      1
    ]
  },
  {
    "id": 53,
    "name": "Bastion Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_bastion.png",
    "components": [
      9,
      2
    ]
  },
  {
    "id": 54,
    "name": "Voyager Emblem",
    "icon": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set17/tft17_emblem_voyager.png",
    "components": [
      9,
      3
    ]
  }
];

export { baseItems, completedItems, Component, CompletedItem, Item };
