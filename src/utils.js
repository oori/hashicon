/**
* Performs a deep merge of objects and returns new object. Does not modify
* objects (immutable) and merges arrays via concatenation.
*
* @param {...object} objects - Objects to merge
* @returns {object} New object with merged key/values
*/
const deepMerge = (...objects) => {
  const isObject = obj => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal);
      }
      else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}


const createCanvas = size => {
	const canvas = document.createElement('canvas');

	canvas.style.width = size + "px";
	canvas.style.height = size + "px";

	// Hi-DPI / Retina
	var dpr = window.devicePixelRatio || 1;
	canvas.width = size * dpr;
	canvas.height = size * dpr;

	const ctx = canvas.getContext('2d');
	ctx.scale(dpr, dpr);

	return canvas;
}

export { deepMerge, chunkHash, createCanvas }
