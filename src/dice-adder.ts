import { registerDom } from 'tram-lite';
import { diceRollerContext } from '.';

const html = registerDom({});

export const diceAdder = (props: diceRollerContext) => {
	const onAddDice = (type: number, min: number, max: number) => () => {
		props.dice = props.dice.concat({ id: props.idcounter, type, min, max, roll: max });
		props.idcounter = props.idcounter + 1;
	};

	const onRoll = () => {
		const newDieRolls = props.dice.map((die) => {
			return { ...die, roll: Math.floor(Math.random() * die.max) + die.min };
		});
		props.dice = newDieRolls;
	};

	const onReset = () => {
		props.dice = [];
	};

	return html`
		<section use:dice use:idcounter>
			<button onclick=${onAddDice(4, 1, 4)}>+ d4</button>
			<button onclick=${onAddDice(6, 1, 6)}>+ d6</button>
			<button onclick=${onAddDice(8, 1, 8)}>+ d8</button>
			<button onclick=${onAddDice(10, 0, 9)}>+ d10</button>
			<button onclick=${onAddDice(12, 1, 12)}>+ d12</button>
			<button onclick=${onAddDice(20, 1, 20)}>+ d20</button>
			<br />
			<button onclick=${onRoll}>Roll</button>
			<button onclick=${onReset}>Reset</button>
		</section>
	`;
};
