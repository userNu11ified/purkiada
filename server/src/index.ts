import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import { create_results, write_result } from "./file.js";
import { generate_groups } from "./pass.js";
import { group } from "console";

const mode = process.argv[2] ?? "development";
if (mode !== "development" && mode !== "production")
	throw new Error("Invalid environment mode set!");

const PORT_NUMBER = 3000;
const app = express();

await create_results();

app.use(bodyParser.text());

function classify(percentage: number) {
	if (percentage > 80) return 5;
	else if (percentage > 60) return 4;
	else if (percentage > 40) return 3;
	else if (percentage > 20) return 2;
	else if (percentage > 10) return 1;
	else return 0;
}

app.post("/cheater", async (req, res) => {
	const json = JSON.parse(req.body);
	const username: string = json["username"];

	if (username !== null) {
		await write_result(username, "DISKVALIFIKOVÁN");
	}

	res.sendStatus(200);
});

app.post("/check_password", (req, res) => {
	const json = JSON.parse(req.body);

	const username: string = json["username"];
	const password: string = json["password"];

	const split_username = username.split(" ");
	if (split_username.length !== 2) return res.sendStatus(403);

	const parsed_index = +username.split(" ")[1] - 1;
	if (isNaN(parsed_index)) return res.sendStatus(403);

	if (groups[+username.split(" ")[1] - 1] !== password)
		return res.sendStatus(403);

	res.sendStatus(200);
});

app.post("/finished", async (req, res) => {
	const json = JSON.parse(req.body);

	const username: string = json["username"];
	const percentage: number = json["percentage"];
	const points = classify(percentage);

	await write_result(username, points);

	res.sendStatus(200);
});

const groups = ["heslo 1", "heslo 2"];

ViteExpress.config({ viteConfigFile: "./client/vite.config.ts", mode: mode });
ViteExpress.listen(app, PORT_NUMBER, () => {
	console.log(`Server started on: http://localhost:${PORT_NUMBER}`);

	console.log("Hesla:");
	groups.forEach((password, index) =>
		console.log(`Skupina ${index + 1}: ${password}`)
	);
});
