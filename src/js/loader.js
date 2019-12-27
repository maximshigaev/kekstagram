import renderMiniImg from "./miniature.js";
import filterMin from "./filterMin.js";

async function loadImages() {
	const GET_URL = `https://js.dump.academy/kekstagram/data`;
	const response = await fetch(GET_URL);
	const data = await response.json();

	renderMiniImg(data);
	filterMin(data);
}

export default loadImages;
