import renderMiniImg from "./miniature.js";
import debounce from "./debounce.js";

function filterMin(array) {
	const RANDOM_MINS_NUMBER = 10;
	const filterForm = document.querySelector(`.filters`);
	const filterRadios = filterForm.elements.filter;
	const randomMins = new Set();
	const discussedMins = array.slice();

	filterForm.classList.remove(`hidden`);
	filterRadios.forEach((elem) => {
		elem.addEventListener(`change`, function(evt) {
			randomMins.clear();

			switch (evt.target.id) {
			case `filter-popular`:
				debounce(renderMiniImg, array);
				break;
			case `filter-random`:
				while (randomMins.size < RANDOM_MINS_NUMBER) {
					randomMins.add(getRandomElement(array));
				}

				debounce(renderMiniImg, Array.from(randomMins));
				break;
			case `filter-discussed`:
				discussedMins.sort((a, b) => b.comments.length - a.comments.length);
				debounce(renderMiniImg, discussedMins);
				break;
			}
		});
	});
}

function getRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export default filterMin;
