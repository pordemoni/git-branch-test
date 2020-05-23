/**
 * Turns the first letter of a given string to upper case.
 * @param {string} _word - Word to be capitalized.
 * @returns string
 */
function capitalize(_word) {
	return _word.charAt(0).toUpperCase() + _word.slice(1);
}

function convert_time_to_military() {}

function convert_time_to_standard(_time) {
	let [hour, minute] = _time.split(":");
	let period = hour >= 12 ? "PM" : "AM";

	hour = hour > 12 ? hour - 12 : hour;

	const time = `${hour}:${minute} ${period}`;
	return time;
}

function convert_to_JS_date(date_string, time_string) {
   // Get date constituents
   const [year, month, day] = date_string.split("-");
   const month_index = month - 1;

   // Get time constituents
   const [hour, minute] = time_string.split(":");

   return new Date(year, month_index, day, hour, minute);
}

function get_date_today() {
	const date_now = moment().format("YYYY[-]MM[-]DD");

	return date_now;
}