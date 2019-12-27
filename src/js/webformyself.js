function checkAndLogAge(year, checkYear, testee) {
	if (getYear(year) > checkYear) {
		console.log(`${testee} старше ${checkYear} лет`);
	} else {
		console.log(`${testee} не старше ${checkYear} лет`);
	}
}

function getYear(year) {
	const CURRENT_YEAR = 2019;
	return CURRENT_YEAR - year;
}

checkAndLogAge(2001, 18, `Максон`);

export default getYear;
