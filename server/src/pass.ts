export function random_range(end: number) {
	return Math.floor(Math.random() * end);
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234596789";
export function generate_password() {
	return Array(10)
		.fill(0)
		.map((_) => characters[random_range(characters.length)])
		.join("");
}

export function generate_groups(group_count: number) {
	return Array(group_count)
		.fill(0)
		.map((_) => generate_password());
}
