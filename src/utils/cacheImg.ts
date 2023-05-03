import { cardSuits, cardValues } from "../common/gameInfo";

export const imgList = new Map<string, HTMLImageElement>();

export const generateImageSet = (cardImgList: string[]) => {
    cardImgList.push("./assets/images/cards/1B.svg");
    cardImgList.push("./assets/images/cards/refresh.svg");
    cardValues.forEach((value) => {
        cardSuits.forEach((suit) => {
            cardImgList.push(`./assets/images/cards/${value}${suit}.svg`);
        });
    });
};

export const cacheImg = async (srcArr: string[], callback: () => void, saveToList: boolean) => {
    if (saveToList) {
        imgList.clear();
    }
    const promices = await srcArr.map((src) => {
        return new Promise(async (res, rej) => {
            const img = new Image();
            img.src = src;
            img.onload = function () {
                res(img);
                if (saveToList) {
                    imgList.set(src, img);
                }
            };
            img.onerror = img.onabort = function () {
                rej(src);
            };
        });
    });
    await Promise.all(promices);
    callback();
};
