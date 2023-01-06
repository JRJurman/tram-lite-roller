import { registerDom } from 'tram-lite';

const html = registerDom({});

const onDynamicListUpdate =
	({ props, propKey, getElementKey, component, onComponentUpdate }) =>
	({ target }) => {
		if (!props[propKey]) {
			return;
		}

		// add new items
		props[propKey].forEach((item) => {
			// if there is a DOM element for this id, select it
			const selectedDOMItem = target.querySelector(getElementKey(item));

			if (!selectedDOMItem) {
				// if this item has not been added, add it!
				const newItem = component(item);
				target.appendChild(newItem);
			} else {
				// if the item has been added, update it?
				onComponentUpdate(item, selectedDOMItem);
			}
		});

		// remove old items
		[...target.children].forEach((mountedItem) => {
			// check if that item exists in props
			const selectedPropItem = props[propKey].find((item) => mountedItem.matches(getElementKey(item)));
			if (!selectedPropItem) {
				// if the item does not exist in props, remove it
				mountedItem.remove();
			}
		});
	};

type diceTrayProps = {
	onUpdateDice: { target };
	onRoll: any;
	onReset: any;
	dice: any;
};
export const diceTray = (props: diceTrayProps) => {
	const onUpdateDice = onDynamicListUpdate({
		props,
		propKey: 'dice',
		getElementKey: (die) => `#die-${die.id}`,
		component: (die) => html`<button id="die-${die.id}" class="dice">${die.max}</button>`,
		onComponentUpdate: (die, mountedDie) => (mountedDie.innerText = die.roll),
	});

	// const onUpdateDice = ({ target }) => {
	// 	if (!props.dice) {
	// 		return;
	// 	}
	// 	// add new dice (or reroll existing dice)
	// 	props.dice.forEach((die) => {
	// 		// if there is a die for this id, select it
	// 		const selectedDie = target.querySelector(`#die-${die.id}`);

	// 		if (!selectedDie) {
	// 			// if the die has not been added, add it!
	// 			const newDie = html`<button id="die-${die.id}" class="dice">${die.max}</button>`;
	// 			target.appendChild(newDie);
	// 		} else {
	// 			// if the die has been added, update it (if it was rerolled)
	// 			if (selectedDie.innerText !== die.roll) {
	// 				selectedDie.innerText = die.roll;
	// 			}
	// 		}
	// 	});

	// 	// remove old dice (if there was a reset)
	// 	[...target.querySelectorAll('.dice')].forEach((mountedDie) => {
	// 		// check if that die exists in props
	// 		const selectedPropDie = props.dice.find((die) => `die-${die.id}` === mountedDie.id);
	// 		if (!selectedPropDie) {
	// 			// if the die does not exist in props, remove it
	// 			mountedDie.remove();
	// 		}
	// 	});
	// };

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
