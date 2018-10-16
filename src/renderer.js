import figures from './figures';
import sprite from './sprite';
import shapes from './shapes';
import { chunkHash, createCanvas } from './utils';


/**
 * map numbers for param
 * @param  {Object} param Parameter containing min and max values
 * @param  {Number} value Number to process
 * @return {Number}       Normalised number
 */
function processParam(param, value) {
	if (param.min === param.max) return param.min;
	return param.min + (value % ( param.max - param.min ));
}


/**
 * Canvas renderer
 * @param  {Uint16Array}	hashValues Integers
 * @param  {Object} params Rendering parameters
 * @return {Object}        Canvas HTML object
 */
function renderer(hashValues, params) {

	const hue = processParam(params.hue, hashValues[0]);
	const saturation = processParam(params.saturation, hashValues[1]);
	const lightness = processParam(params.lightness, hashValues[2]);
	const shift = processParam(params.shift, hashValues[3]);
	const figurealpha = processParam(params.figurealpha, hashValues[4]);
	const figure = hashValues[5] % figures.length;

	// Draw on canvas
	const size = params.size || 100;
	const canvas = createCanvas(size);
	const ctx = canvas.getContext('2d');


	sprite.forEach((line, i) => {
		const light = params.light.enabled && !line.hidden ? params.light[line.light] : 0;

		// variations
		const x = Math.round( hashValues[6] / (i+1) );
		const variation = params.variation.enabled ? processParam(params.variation, x ) : 0;

		// Draw on canvas
		ctx.beginPath();

		if (!line.hidden) {
			const shape = shapes[line.shape];
			ctx.moveTo( size * (shape.x1 + line.x), size * (shape.y1 + line.y) );
			ctx.lineTo( size * (shape.x2 + line.x), size * (shape.y2 + line.y) );
			ctx.lineTo( size * (shape.x3 + line.x) , size * (shape.y3 + line.y) );
		}

		// Fill background
		ctx.fillStyle = `hsla(${hue+variation}, ${saturation}%, ${lightness+light}%, 1)`;
		ctx.fill();

		// draw figure ( whats when opacity of data > 0 )
		if( figures[figure][i] > 0 ){
			const alpha = figures[figure][i] * figurealpha / 10;
			ctx.fillStyle = `hsla(${hue+shift+variation}, ${saturation}%, ${lightness+light}%, ${alpha})`;
			ctx.fill();
		}
	});
	return canvas;
}

export default renderer;
