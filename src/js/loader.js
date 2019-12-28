import renderMiniImg from "./miniature.js";
import filterMin from "./filterMin.js";

async function loadImages() {
	const SUCCESS_STATUS = 200;

	try {
		const GET_URL = `https://js.dump.academy/kekstagram/data`;
		const response = await fetch(GET_URL);

		if (response.status === SUCCESS_STATUS) {
			const data = await response.json();

			renderMiniImg(data);
			filterMin(data);
		} else {
			showError(`Cтатус ${response.status}`);
		}
	} catch (err) {
		showError(err);
	}
}


function showError(text) {
	const ERROR_TIMEOUT = 3000;
	const errorElement = document.querySelector(`.img-upload__message--error`);

	errorElement.classList.remove(`hidden`);
	errorElement.innerHTML = text;
	setTimeout(() => {
		errorElement.classList.add(`hidden`);
	}, ERROR_TIMEOUT);
}

export { loadImages, showError };
