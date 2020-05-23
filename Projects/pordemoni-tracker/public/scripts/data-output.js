const $logs_display = $("#logs-display");

const $confirm_delete_modal = $("#confirm-delete-modal"),
	$confirm_delete_modal_body = $("div#confirm-delete-modal div.modal-body"),
	$confirm_delete_button = $("#confirm-delete-button");

// Display logs on page load
get_logs();

$confirm_delete_button.on("click", () => {
	confirm_delete_log();
});

// * Firestore functions

function confirm_delete_log() {
	// Checks if the modal is open
	if (check_delete_modal_state()) {
		const id = $confirm_delete_modal.attr("data-delete-target-id");

		// Deletes the document from Firestore
		delete_log(id);

		// Hides the modal
		$confirm_delete_modal.modal("hide");
	}
}

function delete_log(_id) {
	console.log("[Execute] delete_log()");

	collection_ref
		.doc(_id)
		.delete()
		.then(() => {
         console.log("[Sucess] Document deleted!");
         
         // Refresh real-time Firestore listener
         get_logs();
		})
		.catch((error) => {
			console.error(`[Error] ${error}`);
		});
}

function display_logs(_data) {
	// console.log(`[Debug] display_logs()`);
	// Parses data
	const { id, activity, date, details, time } = _data;

	// Formats the data
	let formatted_acitivity = capitalize(activity),
		formatted_details =
			details == "" ? "" : `<em>(${details.toLowerCase()})</em>`,
		formatted_time = convert_time_to_standard(time);

	// Constructs jQuery HTML with data
	let $log_header = $("<span>")
		.addClass("mb-1")
		.html(`${formatted_acitivity} ${formatted_details}`);

	let $log_time = $("<small>")
		.addClass("")
		.html(formatted_time);

	let $new_log = $("<div>")
		.addClass(
			"list-group-item d-flex w-100 justify-content-between log-entry",
		)
		.attr({
			"data-id": id,
			"data-target": "#confirm-delete-modal",
			"data-toggle": "modal",
		})
		.append([$log_header, $log_time])
		.css({
			cursor: "pointer",
		})
		.on({
			// * Pre-delete log
			// On click,
			// opens the "confirm delete modal",
			// sets that modal's "data-delete-target-id" to this log's id
			click: () => {
				$confirm_delete_modal.attr({
					"data-delete-target-id": id,
				});

				$confirm_delete_modal_body.html(
					`<p>Confirm deletion of <span class="dynamic-display-data">${formatted_acitivity} at ${formatted_time}</span> from database?<p>`,
				);
			},
		});

	// * Styles each log conditionally
	switch (activity) {
		case "drink":
			$new_log.addClass("text-info");
			break;

		case "pee":
			switch (details.toLowerCase()) {
				case "w":
					$new_log.addClass("bg-warning text-dark");
					break;

				default:
					$new_log.addClass("text-warning");
			}
			break;
	}

	// Displays data to the HTML body
	$logs_display.append($new_log);
}

async function get_latest_wake_up_doc_timestamp() {
	console.log("[Execute] get_latest_wake_up_log()");
	const snapshot = await collection_ref
		.where("details", "==", "w")
		.orderBy("timestamp", "desc")
		.limit(1)
		.get();

	const doc = snapshot.docs[0];
	const data = doc.data();
	const timestamp = data.timestamp;

	return timestamp;
}

function get_logs() {
	console.log(`[Execute] get_logs()`);

	get_latest_wake_up_doc_timestamp().then((_timestamp) => {
		collection_ref
			.where("timestamp", ">=", _timestamp)
			.orderBy("timestamp", "desc")
			.onSnapshot((querySnapshot) => {
				$logs_display.empty();

				querySnapshot.forEach((_doc) => {
					// Parse the id and data of the document
					const log = {
						id: _doc.id,
						..._doc.data(),
					};

					display_logs(log);
				});
				// console.log(packet);
			});
	});
}

// * Other display functions

function check_delete_modal_state() {
	return $confirm_delete_modal.hasClass("show");
}


