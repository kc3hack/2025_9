export const createRandomAlphaNumeric = (length = 20) => {
	const chars =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const createRandomIntegerInRange = ({
	min = 0,
	max = Number.MAX_SAFE_INTEGER,
}: { min: number; max: number }): number => {
	return Math.floor(createRandomFloatInRange({ min, max }));
};

export const createRandomFloatInRange = ({
	min = Number.MIN_VALUE,
	max = Number.MAX_VALUE,
}: { min: number; max: number }): number => {
	return Math.random() * (max - min) + min;
};
