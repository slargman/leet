/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
  let ddxs = ddx(height);
  let heights = height.slice();
  let water = 0;

  while (heights.length > 0) {
    const pondIndex = ddxs.findIndex((ddx) => ddx > 0);
    if (pondIndex === -1) break;
    let startIndex = ddxs
      .slice(0, pondIndex + 1)
      .reverse()
      .findIndex((ddx) => ddx < 0);
    if (startIndex === -1) {
      startIndex = 0;
    } else {
      startIndex = pondIndex - startIndex;
    }
    const endIndex =
      ddxs.slice(pondIndex).findIndex((ddx) => ddx < 0) + pondIndex;
    if (endIndex === -1) break;
    let area =
      Math.min(heights[startIndex], heights[endIndex]) *
      (endIndex - startIndex - 1);
    for (let i = startIndex + 1; i < endIndex; i++) {
      area -= heights[i];
    }
    water += area;
    heights = heights.slice(endIndex);
    ddxs = ddxs.slice(endIndex);
  }

  return water;
};

const dx = (arr) => {
  const dxs = [];
  for (let i = 0; i < arr.length - 1; i++) {
    dxs.push(arr[i + 1] - arr[i]);
  }
  return dxs;
};

const ddx = (arr) => {
  return [null].concat(dx(dx(arr))).concat(null);
};

const height1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const height2 = [4, 2, 0, 3, 2, 5];
