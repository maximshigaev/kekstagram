import { showError } from "./loader.js";

async function sendData(data) {
	const POST_URL = `https://js.dump.academy/kekstagram`;

	try {
		const response = await fetch(POST_URL, {
			method: `POST`,
			headers: {
				'Content-Type': `multipart/form-data`
			},
			body: data
		});

		if (response.ok) {
			console.log(`Отплавлено`);
		} else {
			showError(`Cтатус ${response.status}`);
		}
	} catch (err) {
		showError(err);
	}
}

export default sendData;
