import { baseItems as set17BaseItems, Component, CompletedItem, completedItems as set17CompletedItems } from "./data";

const set18BaseItems: Array<Component> = set17BaseItems.map((item) => ({ ...item }));

const nonEmblemItems = set17CompletedItems
  .filter((item) => !item.name.endsWith("Emblem"))
  .map((item, index) => ({ ...item, id: index }));

const set18Emblems: Array<Omit<CompletedItem, "id">> = [
  {
    name: "Blackthorn Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_blackthorn.png",
    components: [6, 8],
  },
  {
    name: "Blossom Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_blossom.png",
    components: [6, 3],
  },
  {
    name: "Brawler Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_brawler.png",
    components: [9, 8],
  },
  {
    name: "Elderwood Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_elderwood.png",
    components: [6, 2],
  },
  {
    name: "Executioner Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_executioner.png",
    components: [9, 5],
  },
  {
    name: "Fae Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_fae.png",
    components: [6, 1],
  },
  {
    name: "Hunter Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_hunter.png",
    components: [9, 1],
  },
  {
    name: "Inferno Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_inferno.png",
    components: [6, 4],
  },
  {
    name: "Invoker Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_invoker.png",
    components: [9, 7],
  },
  {
    name: "Lunar Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_lunar.png",
    components: [6, 7],
  },
  {
    name: "Primal Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_primal.png",
    components: [6, 5],
  },
  {
    name: "Rapidfire Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_rapidfire.png",
    components: [9, 4],
  },
  {
    name: "Ravager Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_ravager.png",
    components: [9, 0],
  },
  {
    name: "Spellweaver Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_spellweaver.png",
    components: [9, 3],
  },
  {
    name: "Sprykin Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_sprykin.png",
    components: [6, 0],
  },
  {
    name: "Vanguard Emblem",
    icon: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_vanguard.png",
    components: [9, 2],
  },
];

const set18CompletedItems: Array<CompletedItem> = nonEmblemItems.concat(
  set18Emblems.map((item, index) => ({
    ...item,
    id: nonEmblemItems.length + index,
  }))
);

export { set18BaseItems, set18CompletedItems };
