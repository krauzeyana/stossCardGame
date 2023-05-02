export const imgList = new Map<string,HTMLImageElement>();
// declare global {
//     interface Window {
//       image?: HTMLImageElement;
//     }
//   }

  
export const cacheImg = async (srcArr: string[], callback: () => void) => {
    const promices = await srcArr.map((src) => {
        return new Promise(async (res, rej) => {
            const img = new Image();
            img.src = src;
            img.onload = function () {
                res(img);
            };
            img.onerror = img.onabort = function () {
                rej(src);
            };
           // window[src] = img;
        });
    });
    await Promise.all(promices);
    callback();
};

export const cacheImgBG = async (srcArr: string[], callback: () => void) => {
    imgList.clear();
    const promices = await srcArr.map((src) => {
        return new Promise(async (res, rej) => {
            // const icon = (await import(src)).default;
            // imgList.push(icon);
           // const icon = require(src);
           const img = new Image();
            img.src = src;
            img.onload = function () {
                res(img);
                imgList.set(src,img);
            };
            img.onerror = img.onabort = function () {
                rej(src);
            };
           // imgList.push(img);
        });
    });
    await Promise.all(promices);
    callback();
};