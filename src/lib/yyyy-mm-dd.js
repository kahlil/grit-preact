'use strict';

module.exports = () => {
	const time = new Date();
	const day = time.getDate();
	const month = time.getMonth() + 1;
	const dd = `${day}`.length < 2 ? `0${day}` : `${day}`;
	const mm = `${month}`.length < 2 ? `0${month}` : `${month}`;
	const yyyy = time.getFullYear();
	return `${yyyy}-${mm}-${dd}`;
};
