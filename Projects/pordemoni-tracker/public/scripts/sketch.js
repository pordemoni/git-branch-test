const KEY_1 = 49,
	KEY_2 = 50,
	KEY_C = 67,
	KEY_D = 68,
	KEY_S = 83,
	KEY_Q = 81;
function setup() {}

function draw() {}

function windowResized() {}

function keyPressed(event) {
	// console.log('event:', event);
	// console.log("keyCode:", keyCode);

	if (event.altKey) {
		switch (keyCode) {
			case KEY_1:
				select_drink_option();
				break;

			case KEY_2:
				select_pee_option();
				break;

			case KEY_Q:
				update_date_and_time();
				break;

			case KEY_S:
				parse_data();
				break;
		}
	}

	if (keyCode == ENTER || (keyCode == KEY_C && event.altKey)) {
		if (check_save_modal_state) confirm_add_data();
		if (check_delete_modal_state) confirm_delete_log();
	}
}

function mousePressed() {
	// console.log(mouseX, timeline.position.x);
}
