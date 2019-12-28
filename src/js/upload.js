import { validateForm, hideUserMistake } from "./validateForm.js";
import readImg from "./reader.js";
import sendData from "./sender.js";

const SCALE_DELTA = 25;
const userInput = document.querySelector(`#upload-file`);
const uploadMenu = document.querySelector(`.upload-overlay`);
const decButton = uploadMenu.querySelector(`.upload-resize-controls-button-dec`);
const incButton = uploadMenu.querySelector(`.upload-resize-controls-button-inc`);
const resizeValue = uploadMenu.querySelector(`.upload-resize-controls-value`);
const uploadImage = uploadMenu.querySelector(`.effect-image-preview`);
const uploadForm = document.querySelector(`.upload-form`);
const hashtagInput = uploadForm.elements.hashtags;
const commentsTextarea = uploadForm.elements.description;
const submitButton = uploadForm.querySelector(`.upload-form-submit`);

userInput.addEventListener(`change`, function(evt) {
	readImg(evt.target.files[0]);
});
uploadMenu.querySelector(`#upload-cancel`).addEventListener(`click`, hideUploadMenu);
addEscPressHandler();

function escPressHandler(evt) {
	const ESC_CODE = `Escape`;

	if (evt.code === ESC_CODE) {
		hideUploadMenu();
	}

	removeEscPressHandler();
}

function hideUploadMenu() {
	uploadMenu.classList.add(`hidden`);
	uploadImage.style = ``;
	uploadImage.className = `effect-image-preview`;
	document.querySelector(`.upload-effect-level-val`).style.width = `100%`;
	document.querySelector(`.upload-effect-level-pin`).style.left = `100%`;
	hideUserMistake(hashtagInput);
	hideUserMistake(commentsTextarea);
}

decButton.addEventListener(`click`, function() {
	let currentVal = parseInt(resizeValue.value, 10);

	if (currentVal >= 50) {
		resizeValue.value = `${currentVal -= SCALE_DELTA}%`;
		scaleImage(currentVal);
	}
});

incButton.addEventListener(`click`, function() {
	let currentVal = parseInt(resizeValue.value, 10);

	if (currentVal <= 75) {
		resizeValue.value = `${currentVal += SCALE_DELTA}%`;
		scaleImage(currentVal);
	}
});

function scaleImage(val) {
	if (val === 100) {
		uploadImage.style = ``;
		return;
	}

	uploadImage.style.transform = `scale(${val / 100})`;
}

function addEscPressHandler() {
	window.addEventListener(`keydown`, escPressHandler);
}

function removeEscPressHandler() {
	window.removeEventListener(`keydown`, escPressHandler);
}

submitButton.addEventListener(`mousedown`, function(evt) {
	const isValid = validateForm();

	if (!isValid) {
		evt.preventDefault();
		return;
	}
});

uploadForm.addEventListener(`submit`, function(evt) {
	evt.preventDefault();
	const formdata = new FormData(uploadForm);

	sendData(formdata);
});

hashtagInput.addEventListener(`focus`, function() {
	removeEscPressHandler();
});

hashtagInput.addEventListener(`blur`, function() {
	addEscPressHandler();
});

commentsTextarea.addEventListener(`focus`, function() {
	removeEscPressHandler();
});

commentsTextarea.addEventListener(`blur`, function() {
	addEscPressHandler();
});

export default userInput;
