import renderer from './renderer.js';
import params from './params';
import { deepMerge } from './utils';
import { keccak256 } from 'js-sha3';

export default function hashicon(hash, override_params = {}) {
	
	// overload "override_params": allow to call with only size value (numeric)
	let _params = Number.isInteger(override_params) ? { size: override_params } : {...override_params};
	_params = deepMerge(params, _params);		// Deep merge

	// encrypt hash to a keccak256 Uint16Array.
	const uint16Array = new Uint16Array(keccak256.arrayBuffer(hash)); 

	return renderer(uint16Array, _params);
}