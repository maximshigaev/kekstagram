import setSlider from "./slider.js";

function readImg(file) {
	const reader = new FileReader();

	reader.readAsDataURL(file);
	reader.addEventListener(`load`, function(evt) {
		const IMAGE_HEIGHT = 500;
		const imageURL = evt.target.result;
		const imagePreview = document.querySelector(`.effect-image-preview`);

		document.querySelector(`.upload-overlay`).classList.remove(`hidden`);
		setSlider();
		imagePreview.src = imageURL;
		document.querySelectorAll(`.upload-effect-preview`).forEach((elem) => {
			elem.style.backgroundImage = `url(${imageURL})`;
		});
		imagePreview.width = IMAGE_HEIGHT;
	});
}

export default readImg;
