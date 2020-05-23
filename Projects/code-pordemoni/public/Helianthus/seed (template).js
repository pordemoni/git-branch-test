/* 
* Notes
- before adding a new "records" entry, run a function that parses the latest values (for the height, petals, & leaves status)
*/

//* id format
// year, month, day, number, extra details
// (Y)year(M)month(D)day(N)number(x)extra DETAILS
const id = "Y2020M05D21N01xPROTOTYPE";

//* collection doc
const seed = {
	id: "STRING",
   species: "STRING",
	status: { is_active: "BOOLEAN" },
	events: {
		date_planted: "DATE",
		date_sprouted: "DATE",
		date_budded: "DATE",
		date_bloomed: "DATE",
		date_harvested: "DATE",
	},
	environment: {
		soil: {
			type: "STRING",
			volume: "STRING",
			depth: "STRING",
		},
		pot: {
			type: "STRING",
			drainage: "STRING",
		},
		neighbor: {
			type: "STRING",
			total: "NUMBER",
			distance: "STRING",
		},
	},
	system: {
		author: "STRING",
		build_version: "STRING",
	},
};

//* subcollection doc
const record = {
	timestamp: "TIMESTAMP",
	status: {
		is_active: "BOOLEAN",
		is_watered: "BOOLEAN",
		is_raine: "BOOLEAN",
	},
	growth: {
		height: "STRING",
		leaf: {
			total: "NUMBER",
			leaves: [
				{
					length: "STRING",
					color: "STRING",
				},
			],
		},
		petal: {
			total: "NUMBER",
			petals: [
				{
					length: "STRING",
					color: "STRING",
				},
			],
		},
	},
	resources: {
		water: {
			source: "STRING", // watering can or rain
			amount: "STRING",
		},
		soil: { status: "STRING" },
		sunlight: { amount: "STRING" },
	},
};
