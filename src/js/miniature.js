const commentsList = document.querySelector(`.social__comments`);
const bigImg = document.querySelector(`.gallery-overlay`);
const loadmoreButton = bigImg.querySelector(`.comments-loadmore`);

function renderMiniImg(array) {
	const miniTemplate = document.querySelector(`#picture-template`);
	const fragment = document.createDocumentFragment();
	const pictures = document.querySelector(`.pictures`);

	array.forEach((elem) => {
		const miniImg = miniTemplate.cloneNode(true).content.firstElementChild;

		fragment.append(miniImg);
		miniImg.firstElementChild.src = elem.url;
		miniImg.querySelector(`.picture-comments`).innerHTML = elem.comments.length;
		miniImg.querySelector(`.picture-likes`).innerHTML = elem.likes;

		bindMiniImg(miniImg, elem);
	});

	pictures.innerHTML = ``;
	pictures.append(fragment);
}

function bindMiniImg(img, elem) {
	const DEFAULT_COMMENTS_NUMBER = 5;
	const closeButton = bigImg.querySelector(`.gallery-overlay-close`);

	img.addEventListener(`click`, function(evt) {
		evt.preventDefault();

		bigImg.classList.remove(`hidden`);

		(elem.comments.length > DEFAULT_COMMENTS_NUMBER)
			? loadmoreButton.classList.remove(`hidden`)
			: loadmoreButton.classList.add(`hidden`);

		bigImg.querySelector(`.gallery-overlay-image`).src = img.firstElementChild.src;
		bigImg.querySelector(`.likes-count`).innerHTML = img.querySelector(`.picture-likes`).innerHTML;
		bigImg.querySelector(`.comments-count`).innerHTML = img.querySelector(`.picture-comments`).innerHTML;
		commentsList.innerHTML = ``;

		elem.comments.forEach((comment, index) => {
			const mimiImgElement = (index > 4)
				? `<li class="social__comment social__comment--text hidden">
					<img class="social__picture" src=${comment.avatar}></img>${comment.message}<li>`
				: `<li class="social__comment social__comment--text">
					<img class="social__picture" src=${comment.avatar}></img>${comment.message}<li>`;
			commentsList.insertAdjacentHTML(`beforeend`, mimiImgElement);
		});

		closeButton.addEventListener(`click`, hideBigImg);
		closeButton.addEventListener(`keydown`, enterPressHandler);
		window.addEventListener(`keydown`, escPressHandler);
		loadmoreButton.addEventListener(`click`, loadmoreClickHandler);
	});
}

function loadmoreClickHandler(evt) {
	let openCommentsCounter = 0;

	Array.from(commentsList.children).forEach((elem) => {
		if (!elem.classList.contains(`hidden`) && elem.classList.contains(`social__comment--text`)) {
			openCommentsCounter += 2;
		}
	});

	for (let i = openCommentsCounter; i < openCommentsCounter + 10; i++) {
		if (i === commentsList.children.length) {
			evt.target.classList.add(`hidden`);

			return;
		}

		commentsList.children[i].classList.remove(`hidden`);
	}
}

function enterPressHandler(evt) {
	const ESC_CODE = `Enter`;

	if (evt.code === ESC_CODE) {
		hideBigImg();
	}
}

function escPressHandler(evt) {
	const ESC_CODE = `Escape`;

	if (evt.code === ESC_CODE) {
		hideBigImg();
	}

	window.removeEventListener(`keydown`, escPressHandler);
}

function hideBigImg() {
	bigImg.classList.add(`hidden`);
	loadmoreButton.removeEventListener(`click`, loadmoreClickHandler);
}

export default renderMiniImg;
