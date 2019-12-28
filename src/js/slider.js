function setSlider() {
	const draggablePin = document.querySelector(`.upload-effect-level-pin`);
	const slider = document.querySelector(`.upload-effect-level`);
	const sliderLine = document.querySelector(`.upload-effect-level-line`);
	const sliderLineCoordX = sliderLine.getBoundingClientRect().x;
	const sliderValueLine = document.querySelector(`.upload-effect-level-val`);
	const uploadImage = document.querySelector(`.effect-image-preview`);
	const effectRadios = document.querySelector(`.upload-form`).elements.effect;
	let currentFilter = null;

	effectRadios.forEach((elem) => {
		elem.addEventListener(`change`, function(evt) {
			uploadImage.classList.remove(currentFilter);
			currentFilter = evt.target.id.split(`upload-`).join(``);

			sliderValueLine.style.width = `100%`;
			draggablePin.style.left = `100%`;

			if (currentFilter === `effect-none`) {
				slider.classList.add(`hidden`);
			} else {
				slider.classList.remove(`hidden`);
			}

			uploadImage.style.filter = ``;
			uploadImage.classList.add(currentFilter);
		});
	});

	draggablePin.addEventListener(`mousedown`, function(downEvt) {
		downEvt.preventDefault();
		let startCoordX = downEvt.clientX;
		downEvt.target.addEventListener(`mousemove`, pinMousemoveHandler);

		function pinMousemoveHandler(moveEvt) {
			moveEvt.preventDefault();
			const shift = moveEvt.clientX - startCoordX;

			startCoordX = moveEvt.clientX;

			if (startCoordX < sliderLineCoordX) {
				draggablePin.style.left = 0 + `px`;
			} else if (startCoordX > sliderLineCoordX + sliderLine.clientWidth) {
				draggablePin.style.left = sliderLine.clientWidth + `px`;
			} else {
				draggablePin.style.left = draggablePin.offsetLeft + shift + `px`;
			}

			const intensity = parseInt(draggablePin.style.left, 10) / sliderLine.clientWidth;
			sliderValueLine.style.width = intensity * 100 + `%`;

			switch (currentFilter) {
			case `effect-chrome`:
				uploadImage.style.filter = `grayscale(${intensity})`;
				break;
			case `effect-sepia`:
				uploadImage.style.filter = `sepia(${intensity})`;
				break;
			case `effect-marvin`:
				uploadImage.style.filter = `invert(${intensity * 100}%)`;
				break;
			case `effect-phobos`:
				uploadImage.style.filter = `blur(${intensity * 5}px)`;
				break;
			case `effect-heat`:
				uploadImage.style.filter = `brightness(${1 + intensity * 2})`;
				break;
			}
		}

		draggablePin.addEventListener(`mouseup`, pinMouseUpHandler);

		function pinMouseUpHandler(upEvt) {
			upEvt.preventDefault();
			upEvt.target.removeEventListener(`mousemove`, pinMousemoveHandler);
			draggablePin.removeEventListener(`mouseup`, pinMouseUpHandler);
		}
	});
}

export default setSlider;
