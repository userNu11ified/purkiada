import fs from "fs/promises";

export async function create_results() {
	await fs.access("./results").catch((_) => fs.mkdir("./results"));
	await fs
		.access("./results/results.txt")
		.then((_) => fs.appendFile("./results/results.txt", "\n"))
		.catch((_) => fs.writeFile("./results/results.txt", ""));
}

export async function write_result(username: string, points: number | string) {
	await fs.appendFile("./results/results.txt", `${username}: ${points}\n`);
}
