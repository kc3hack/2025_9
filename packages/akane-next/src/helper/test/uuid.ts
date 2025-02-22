/**
 * テスト用途で使用する MySQL の UUID_SHORT() を模倣したもの。
 * 20桁程度に近づけるためにパラメータに変更を加えているため、正確性は保証しない。
 * ref: https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html#function_uuid-short
 */
class UUID_SHORT {
	private lastTimestamp = 3740229950n;
	private sequence = 50000n;
	private serverID;

	constructor(serverID = 320000n) {
		this.serverID = serverID;
	}

	next(): bigint {
		const offset = 2000000000n;
		const timestamp =
			(BigInt(Math.floor(Date.now() / 1000)) + offset) & 0xffffffffn;

		if (timestamp === this.lastTimestamp) {
			this.sequence = (this.sequence + 1n) & 0xfffn;
		} else {
			this.sequence = 50000n;
			this.lastTimestamp = timestamp;
		}
		const serverId = this.serverID & 0xffffn;

		const uuid =
			(BigInt(serverId) << 48n) |
			(BigInt(timestamp) << 16n) |
			BigInt(this.sequence);

		return uuid;
	}
}

export const ShortUUID = new UUID_SHORT();
