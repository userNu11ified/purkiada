import { writable, type Writable } from "svelte/store";

export type Question<T> = {
	question: string;
	answers: string[];
	correct_answer: T;
};

export type DefaultQuestion = Question<number>;
export type MappedQuestion = Question<string>;

export const CURRENT_QUESTION_INDEX: Writable<number> = writable(0);
export const SELECTED_ANSWER: Writable<boolean> = writable(false);
export const ANSWERS: Writable<number[]> = writable([]);
export const QUESTIONS: DefaultQuestion[] = [
	{
		question: "Co znamená zkratka WWW?",
		answers: ["Wavelength Wireless Web", "World Wide Web", "Wave Wide Web"],
		correct_answer: 1,
	},
	{
		question: "Co znamená zkratka LAN?",
		answers: [
			"Learning Access Network",
			"Local Asset Navigator",
			"Local Area Network",
		],
		correct_answer: 2,
	},
	{
		question: "Je IP adresa unikátní identifikátor zařízení v síti?",
		answers: ["Ano", "Ne"],
		correct_answer: 0,
	},
	{
		question: "Co znamená zkratka URL?",
		answers: [
			"Unified Resource Locator",
			"Uniform Resource Locator",
			"Unified Routing Link",
		],
		correct_answer: 1,
	},
	{
		question: "Co znamená zkratka RAM?",
		answers: [
			"Random Access Memory",
			"Rapid Access Memory",
			"Responsive Access Mechanism",
		],
		correct_answer: 0,
	},
	{
		question: "Co znamená zkratka HTML?",
		answers: [
			"Hybrid Text Multimedia Language",
			"Hyper Transformation Markup Language",
			"Hyper Text Markup Language",
		],
		correct_answer: 2,
	},
	{
		question: "Je JavaScript a Java to samé?",
		answers: ["Ano", "Ne"],
		correct_answer: 1,
	},
	{
		question: "Co znamená zkratka VPN?",
		answers: [
			"Virtual protection network",
			"Virtual private network",
			"Virtualized privacy network",
		],
		correct_answer: 1,
	},
	{
		question: "Co znamená zkratka CPU v počítači?",
		answers: [
			"Computer Power Unit",
			"Complex Performance Unit",
			"Central Processing Unit",
		],
		correct_answer: 2,
	},
	{
		question:
			"Je SQL jazyk používaný k řízení a manipulaci s relačními databázemi?",
		answers: ["Ano", "Ne"],
		correct_answer: 0,
	},
	{
		question:
			"Jsou kaskádové styly (CSS) používány k formátování prvků webových stránek?",
		answers: ["Ano", "Ne"],
		correct_answer: 0,
	},
	{
		question: "Co znamená zkratka GUI ve výpočetní technice?",
		answers: [
			"General User Interface",
			"Graphic User Interface",
			"Global Understanding of Internet",
		],
		correct_answer: 1,
	},
	{
		question:
			"Který z těchto formátů souboru se používá pro ukládání obrázků?",
		answers: [".txt", ".mp3", ".png", ".exe"],
		correct_answer: 2,
	},
	{
		question: "K čemu slouží HTML ve vývoji webových stránek?",
		answers: [
			"K vytváření 3D modelů",
			"K tvorbě struktury a obsahu webových stránek",
			"K programování umělé inteligence",
		],
		correct_answer: 1,
	},
	{
		question:
			"Který z následujících je typický grafický formát pro vektorové obrázky?",
		answers: [".svg", ".gif", ".avi", ".mp4"],
		correct_answer: 0,
	},
	{
		question: "Co znamená zkratka CSS ve vztahu k webovým stránkám?",
		answers: [
			"Computer System Security",
			"Centralized Server System",
			"Cascading Style Sheets",
		],
		correct_answer: 2,
	},
	{
		question:
			"Co znamená termín „firewall“ v oblasti počítačové bezpečnosti?",
		answers: [
			"Program pro vytváření ohnivých efektů na obrazovce",
			"Ochranný systém pro blokování neautorizovaného přístupu k síti",
			"Bezdrátový router",
		],
		correct_answer: 1,
	},
	{
		question: "Který z následujících není programovací jazyk?",
		answers: ["JavaScript", "FTP", "Python"],
		correct_answer: 1,
	},
	{
		question: "Který z následujících není webový prohlížeč?",
		answers: ["OperaGX", "Chrome", "Firefox", "Illustrator"],
		correct_answer: 3,
	},
	{
		question: "Jaký je účel protokolu HTTP ve webovém prostředí?",
		answers: [
			"K vytváření animací",
			"K přenosu hypertextových dokumentů přes internet",
			"K úpravě fotografií",
		],
		correct_answer: 1,
	},
	{
		question: "Co znamená termín „API“ ve světě programování?",
		answers: [
			"Automatic Programming Interface",
			"Application Programming Interface",
			"Advanced Programming Integration",
		],
		correct_answer: 1,
	},
	{
		question: "Která z následujících není relační databázová platforma?",
		answers: ["MySQL", "PostgreSQL", "MongoDB"],
		correct_answer: 2,
	},
	{
		question: "Jaký je účel „for“ smyčky v programovacím jazyce Python?",
		answers: [
			"K přerušení programu",
			"K vytváření funkcí",
			"K opakování určitého kódu",
		],
		correct_answer: 2,
	},
	{
		question:
			"Co znamená termín „phishing“ v kontextu kybernetické bezpečnosti?",
		answers: [
			"Metoda rybolovu",
			"Podvodná technika, při které útočníci získávají citlivé informace od uživatelů",
			"Specifický typ programovacího jazyka",
		],
		correct_answer: 1,
	},
	{
		question: "Co je to UI ve světě počítačového designu?",
		answers: [
			"User Interaction",
			"Universal Integration",
			"User Interface",
		],
		correct_answer: 2,
	},
];

export function map_answers(questions: DefaultQuestion[]): MappedQuestion[] {
	return questions.map((question) => ({
		...question,
		correct_answer: question.answers[question.correct_answer],
	}));
}
