import { registerDom } from 'tram-lite';
const html = registerDom({});

export const dieButton = (props) => {
	const onUpdate = () => {
		const thisDie = props.dice[props.index];
		console.log(thisDie);
	};
	return html`<button use:dice onupdate=${onUpdate} id="die-${props.id}" />`;
};
