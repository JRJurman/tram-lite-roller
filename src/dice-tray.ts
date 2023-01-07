import { registerDom } from 'tram-lite';
import { onDynamicListUpdate } from './onDynamicListUpdate';
import { dieButton } from './die-button';
const html = registerDom({
	die: dieButton,
});

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
		component: (die, index) => html`<die id=${die.id} index=${index} />`,
		onComponentUpdate: (die, mountedDie) => (mountedDie.innerText = die.roll),
	});

	return html` <section use:dice onupdate=${onUpdateDice}></section> `;
};
