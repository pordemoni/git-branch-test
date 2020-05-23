// Form components
const $form = $("#activity-form"),
	$drink_radio_button = $("#radio-input-drink"),
	$pee_radio_button = $("#radio-input-pee"),
	$date_input = $("#date-input"),
	$details_input = $("#details-input"),
	$time_input = $("#time-input"),
	$update_button = $("#update-button"),
	$save_button = $("#save-button");

// Modal components
const $confirm_save_modal = $("#confirm-save-modal"),
	$confirm_save_modal_body = $("div#confirm-save-modal div.modal-body"),
	$confirm_save_button = $("#confirm-save-button");

// Data placeholder
let data;

let $activity_input = $("input[name='activity-input']:checked");
update_date_and_time();

// * Form button handlers
$update_button.on("click", (event) => {
	event.preventDefault();

	update_date_and_time();
});

$save_button.on("click", (event) => {
	event.preventDefault();

	parse_data();
});

$confirm_save_button.on("click", (event) => {
	confirm_add_data();
});

// * Firestore functions

function add_data(_data) {
	console.log(`[Execute] add_data()`);

	collection_ref
		.add(_data)
		.then(() => {
			console.log(`[Success] Document added to Firestore!`);

			// Refresh real-time Firestore listener
			if (data.details == "w") get_logs();
		})
		.catch((error) => {
			console.error(`[Error] Document not added: ${error}`);
		});
}

function confirm_add_data() {
	// Checks if the modal is open
	if (check_save_modal_state()) {
		// Adds data to Firestore
		add_data(data);

		// Clears the value,
		// and puts the cursor on the details <input>
		$details_input.val("");
		$details_input.focus();

		// Hides the modal
		$confirm_save_modal.modal("hide");
	}
}

function parse_data() {
	console.log(`[Execute] parse_data()`);

	$activity_input = $("input[name='activity-input']:checked");

	// Packages everthing into the pre-defined var "data"
	data = {
		activity: $activity_input.val(),
		date: $date_input.val(),
		details: $details_input.val().toLowerCase(),
		time: $time_input.val(),
		timestamp: firebase.firestore.Timestamp.fromDate(
			convert_to_JS_date($date_input.val(), $time_input.val()),
		),
	};

	// Formatted data
	let formatted_acitivity = capitalize(data.activity),
		formatted_time = convert_time_to_standard(data.time);

	// * Display data to be saved
	$confirm_save_modal_body.html(
		`<p>Confirm saving of <span class="dynamic-display-data">${formatted_acitivity} at ${formatted_time}</span> to database?</p>`,
	);

	$confirm_save_modal.modal("show");
}

// * Other form functions

function check_save_modal_state() {
	return $confirm_save_modal.hasClass("show");
}

/**
 * Gets the current time and date; set them as the default values for the time <input> and date <input>.
 * (uses moment.js)
 * @returns null
 */
function update_date_and_time() {
	console.log(`[Execute] update_date_and_time()`);
	const date_now = moment().format("YYYY[-]MM[-]DD");
	const time_now = moment().format("HH:mm");

	$date_input.val(date_now);
	$time_input.val(time_now);
}

function select_drink_option() {
	console.log(`[Execute] select_drink_option();`);
	$drink_radio_button.prop("checked", true);
}

function select_pee_option() {
	console.log(`[Execute] select_pee_option();`);
	$pee_radio_button.prop("checked", true);
}
