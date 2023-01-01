import { registerDom } from 'tram-lite';

const html = registerDom({});

type diceTrayProps = {
	onUpdateDice: { target };
	onRoll: any;
	onReset: any;
	dice: any;
};
export const diceTray = (props: diceTrayProps) => {
	const onUpdateDice = ({ target }) => {
		if (!props.dice) {
			return;
		}
		// add new dice (or reroll existing dice)
		props.dice.forEach((die) => {
			// if there is a die for this id, select it
			const selectedDie = target.querySelector(`#die-${die.id}`);

			if (!selectedDie) {
				// if the die has not been added, add it!
				const newDie = html`<button id="die-${die.id}" class="dice">${die.max}</button>`;
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
		<section use:dice onupdate=${onUpdateDice}>
			<button onclick=${onRoll}>Roll</button>
			<button onclick=${onReset}>Reset</button>
			<br />
		</section>
	`;
};
