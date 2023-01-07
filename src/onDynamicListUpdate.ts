export const onDynamicListUpdate =
	({ props, propKey, getElementKey, component, onComponentUpdate }) =>
	({ target }) => {
		if (!props[propKey]) {
			return;
		}

		// add new items
		props[propKey].forEach((item, index) => {
			// if there is a DOM element for this id, select it
			const selectedDOMItem = target.querySelector(getElementKey(item));

			if (!selectedDOMItem) {
				// if this item has not been added, add it!
				const newItem = component(item, index);
				target.appendChild(newItem);
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
