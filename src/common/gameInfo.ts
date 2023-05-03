export const cardValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
] as const;
export const cardSuits = ["C", "D", "H", "S"] as const;
export const chipsList = [1, 5, 10, 25, 50, 100] as const;

export type CardValueType = (typeof cardValues)[number];
export type CardValuesSuits = (typeof cardSuits)[number];
export type ChipValueType = (typeof chipsList)[number];
export type ChipListType = { [K in CardValueType]: ChipValueType[] };

export const defBalance = 500;
export const defBetsCount = 2;
export const defDeckCount = 1;

export const store = ["rootStore", "bankStore", "playingStore", "statisticStore"] as const;
export type StoreType = (typeof store)[number];

export const soundValue = ["cardOpen", "cardShuffle", "removeBet", "addBet", "win"] as const;
export type SoundValueType = (typeof soundValue)[number];
export type SoundListType = { [K in SoundValueType]: React.RefObject<HTMLAudioElement> | null };
