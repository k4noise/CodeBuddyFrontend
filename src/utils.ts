export const possibleTagColors = ['#FFA800', '#1168A7', '#470E8F', '#FF0000'];

export const getRandomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
