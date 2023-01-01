import { registerDom, mount } from 'tram-lite';
import { diceAdder } from './dice-adder';
import { diceTray } from './dice-tray';
import './index.css';

const html = registerDom({
	'dice-adder': diceAdder,
	'dice-tray': diceTray,
});

type die = {
	id: number;
	type: number;
	min: number;
	max: number;
	roll: number;
};

export type diceRollerContext = {
	dice: die[];
	idcounter: number;
};

const app = () => {
	return html`
		<main context:dice="[]" context:idcounter="0">
			<h1>Dice Roller</h1>
			<dice-adder />
			<hr />
			<dice-tray />
		</main>
	`;
};

mount(app, document.body);
