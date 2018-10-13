/**
 * Generate a random hash for testing
 * @return {String} Hash
 */
function randomHash() {
	return '0x' + (function lol(m, s, c) {
		return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
	})(Math, '0123456789abcdef', 38)
}

/**
 * Generate test canvases
 * @param  {String} parentId contrainer node id
 * @param  {Number} length   Number of items
 * @param  {Number} size     icon size
 */
// function generateCanvas(parentId, length, size) {
// 	const parent = document.getElementById(parentId);
// 	Array.from({length}).forEach(() => {
// 		parent.append(hashicon(randomHash(), size));
// 	});
// }


/** @type {Object} Hashes array */
let _hashes = {};

/** @type {Object} Params array */
let _params = {};

/**
 * Generate canvas(es)
 * @param  {strgin} parentId Parent ID
 * @param  {object} params   Params
 */
function generateCanvas(parentId, params) {
	// if (!Array.isArray(_hashes[parentId])) generateHashes(parentId, length);
	if (typeof params !== 'undefined') _params[parentId] = params;

	const parent = document.getElementById(parentId);
	_hashes[parentId].forEach(hash => {
		parent.append( hashicon(hash, params) );
	});
}

/**
 * Generate hashes array
 * @param  {string} parentId Parent ID
 * @param  {number} length   Number of hashes to genreate
 */
function generateHashes(parentId, length){
	_hashes[parentId] = [];
	Array.from({length}).forEach(() => { _hashes[parentId].push(randomHash()) });
}

/**
 * Regenerate all hashes
 */
function regenerateHashes() {
	Object.keys(_hashes).forEach(parentId => {
		generateHashes(parentId, _hashes[parentId].length);
		updateCanvas(parentId);	// re-render canvas
	});
}

/**
 * Re-render canvas
 * @param  {string} parentId Parent ID
 */
function updateCanvas(parentId) {
	const parent = document.getElementById(parentId);
	parent.innerHTML = '';
	generateCanvas(parentId, _params[parentId]);

}

///////////////////////////////////////////////////////

/** @type {Array} Parameters layout configuration */
const paramsLayout = [
	{ id: "hue", min: 0, max: 360 },
	{ id: "saturation", min: 0, max: 100 },
	{ id: "lightness", min: 0, max: 100 },
	{ id: "variation", min: 0, max: 15, enabled: true },
	{ id: "shift", min: 0, max: 360 },
	// { id: "figurealpha", min: .7, max: 1.2 },
//	{ id: "light", top:10, right:-8, left:-4, enabled: true}
];

/** @type {Object} Default parameters. TODO: from ../src/params.js */
const defaultParams = {
	hue: { min: 0, max: 360 },
	saturation: { min: 70, max: 100 },
	lightness: { min: 45, max: 65 },
	variation: { min: 2, max: 6, enabled: true },
	shift: { min: 150, max: 210 },
	figurealpha: { min: .7, max: 1.2 },
	light:{ top:10, right:-8, left:-4, enabled: true}
};

/**
 * Initialize controls
 */
function initControls(){
	const styleElem = document.head.appendChild(document.createElement("style"));
	const containerId = "sliders";
	const container = document.getElementById(containerId);

	// Construct the slider elements
	paramsLayout.forEach((param, i) => {
		const slider = document.createElement("div");
		const defaultParam = defaultParams[param.id];
		noUiSlider.create(slider, {
			start: [defaultParam.min, defaultParam.max],
			range: {
				'min': param.min,
				'max': param.max
			},
			step: 1,
			// margin: 1,
			connect: true,
			tooltips: true,
			orientation: "vertical",
	    format: {
        to: value => Math.round(value),
        from: value => value
	    }
		});

		// On slider value "update" event
		slider.noUiSlider.on('update', () => {
			Object.keys(_params).forEach(parentId => {
				// console.log(param.id, slider.noUiSlider.get());
				const values = slider.noUiSlider.get();

				_params[parentId][param.id] = _params[parentId][param.id] || {};
				_params[parentId][param.id].min = values[0];
				_params[parentId][param.id].max = values[1];

				updateCanvas(parentId);
			});
		});


		// Add title (param.id) as :after content (see style.css for styling)
		styleElem.innerHTML += `#${containerId} > div:nth-child(${i+1}):after {content: '${param.id}';}\n`;

		// Append div to container
		container.append(slider);
	});
}
