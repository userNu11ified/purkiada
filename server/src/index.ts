import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import { create_results, write_result } from "./file.js";

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

	if (users[password] !== username) return res.sendStatus(403);

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

const users = {
	"dKQM3r": "jabu.radi",
	"VCdurm": "hrab.jan",
	"4nHhkH": "lore.vacl",
	"uWtY2R": "dufk.tere",
	"2ZGJ42": "kune.vinc",
	"8F6X8s": "smid.seba",
	"yH9G6F": "fila.oliv",
	"WwKrxj": "mars.libo",
	"2GWhcA": "zdra.jan",
	"B46HYs": "jira.dani",
	"WvLTqK": "pusk.jose",
	"RmjzNK": "jera.sark",
	"amZx23": "ondo.adam",
	"W26HSN": "kudl.mate",
	"9cZyeX": "poru.petr",
	"k42DpP": "obro.jach",
	"B4duMU": "koud.mart",
	"Dx2n56": "kraj.adam",
	"mBHDDc": "bily.toma",
	"JXheAm": "lind.jan",
	"7a4JT6": "bart.fili",
	"cRkkWu": "dufe.ondr",
	"2p6WTm": "simo.jaku",
	"8XFZdk": "jira.dani",
	"zjHdGY": "svec.davi",
	"hntszm": "souk.vite",
	"KCRNLX": "mach.niko",
	"BWhSmC": "vabn.moni",
	"c9wfUx": "uher.maty",
	"6BemFg": "kost.jaku",
	"3D5hMy": "simo.jaku",
	"2GDHzz": "shem.mykh",
	"2W5Rna": "vysk.jan",
	"5R2rst": "brab.vojt",
	"ArHa5h": "bimk.mart",
	"LvR9eq": "povo.barb",
	"zy25QW": "ondr.patr",
	"7euBq9": "dvor.vacl",
	"GKK6Mr": "imra.davi",
	"9CSeU8": "hork.hyne",
	"FFaPrh": "ondr.patr",
	"reDPk7": "zace.rich",
	"KqAAhF": "mali.jona",
	"MKmVLE": "hude.oliv",
	"xYHU8A": "maza.jaku",
	"CsSgbx": "pruc.toma",
	"eFrPRZ": "drob.lenk",
	"qCKzR7": "nico.alex",
	"NmMAKn": "crha.niko",
	"ct2k9c": "mitr.jan",
	"DFaqej": "1.nahr",
	"FqKUBv": "2.nahr",
	"qL6BpX": "3.nahr",
	"4cShVv": "4.nahr",
};

ViteExpress.config({ viteConfigFile: "./client/vite.config.ts", mode: mode });
ViteExpress.listen(app, PORT_NUMBER, async () => {
	console.log(`Server started on: http://localhost:${PORT_NUMBER}`);

	await fetch(
		"https://discord.com/api/webhooks/1207002396719456367/qpYyp7lCQu3DAXxnSLyn96EZHhOvG_fXiqPRF8WjIFM_a4gB9Uwh2TrAPQzqFeJ092dI",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: "Server zapnut!",
			}),
		}
	);
});
