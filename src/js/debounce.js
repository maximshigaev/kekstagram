const DEBOUNCE_TIMEOUT = 500;
let timeout = null;

function debounce(func, ...args) {
	if (timeout) {
		clearTimeout(timeout);
	}

	timeout = setTimeout(function() {
		func.call(null, ...args);
	}, DEBOUNCE_TIMEOUT);
}

export default debounce;
