import { registerDom, mount } from 'tram-lite';
import './index.css';

const html = registerDom({});

type die = {
	id: number;
	type: number;
	min: number;
	max: number;
	roll: number;
};

type diceRollerProps = {
	dice: die[];
	total: number;
};
const app = (props: diceRollerProps) => {
	const onAddDice = (type: number, min: number, max: number) => () => {
		props.dice = props.dice.concat({ id: props.total, type, min, max, roll: max });
		props.total = props.total + 1;
	};

	const onUpdateDice = ({ target }) => {
		// add new dice (or reroll existing dice)
		props.dice.forEach((die) => {
			// if there is a die for this id, select it
			const selectedDie = target.querySelector(`#die-${die.id}`);

			if (!selectedDie) {
				// if the die has not been added, add it!
				const newDie = html`<button id="die-${die.id}" class="dice">${die.type}</button>`;
				target.appendChild(newDie);
			} else {
				// if the die has been added, update it (if it was rerolled)
				selectedDie.innerText = die.roll;
			}
		});

		// remove old dice (if there was a reset)
		[...target.querySelectorAll('.dice')].forEach((mountedDie) => {
			// check if that die exists in props
			const selectedPropDie = props.dice.find((die) => `die-${die.id}` === mountedDie.id);
			if (!selectedPropDie) {
				// if the die does not exist in props, remove it
				mountedDie.remove();
			}
		});
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
		<main>
			<h1>Dice Roller</h1>
			<section>
				<button onclick=${onAddDice(4, 1, 4)}>+ d4</button>
				<button onclick=${onAddDice(6, 1, 6)}>+ d6</button>
				<button onclick=${onAddDice(8, 1, 8)}>+ d8</button>
				<button onclick=${onAddDice(10, 0, 9)}>+ d10</button>
				<button onclick=${onAddDice(12, 1, 12)}>+ d12</button>
				<button onclick=${onAddDice(20, 1, 20)}>+ d20</button>
			</section>
			<hr />
			<section total="0" dice="[]" onupdate=${onUpdateDice}>
				<button onclick=${onRoll}>Roll</button>
				<button onclick=${onReset}>Reset</button>
				<br />
			</section>
		</main>
	`;
};

mount(app, document.body);
