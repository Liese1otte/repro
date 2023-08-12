export const row = (i: number) => {
	return Math.floor(i / 16);
};
export const col = (i: number) => {
	return i % 16;
};
export const degToRad = (d: number) => {
	return d * (Math.PI / 180);
};