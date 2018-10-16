[![GitHub tag](https://img.shields.io/github/tag/ETCDEVTeam/hashicon.svg)](https://GitHub.com/ETCDEVTeam/hashicon/tags/)
[![npm](http://img.shields.io/npm/v/hashicon.svg)](https://www.npmjs.com/package/hashicon)
[![License](https://img.shields.io/npm/l/hashicon.svg)](LICENSE)



Hashicon
==========

> Generates a beautiful representation of any hash.

Check out the [demo website](https://ETCDEVTeam.github.io/hashicon/examples/) to try it out with your own hash and to see some examples.

Further examples [here](examples/index.html).

![Sample hashicon image](examples/hashicons.png "Hashicons")



Browser
---

Install with: 
```shell
$ npm install hashicon --save
```   

Or, include the CDN:

```html
<script src="//unpkg.com/hashicon"></script>
```   

Or, download the [current build](dist/hashicon.umd.js).


Usage
---

The hash value can include or omit the `0x` prefix.
```js
const hash = "0xdc53525847b67a9e32d80066202d5744c86ae500";
```

Create a `hashicon` with default params:
```js
const icon = hashicon(hash); // icon is a <canvas> element
const icon = hashicon(hash, 80);  // size 80px
```

Or, pass custom [params](#params):
```js
const params = {...};
const icon = hashicon(hash, params);
```

Finally, append the newly created `hashicon` to the HTML document:
```js
document.body.appendChild(icon);
```


Params
---
> See [default params](src/params.js)

HashIcon's values are extracted from the hash, and controlled with the following parameters to manipulate the possible visual output:

```js
{
// size px (HiDPI/Retina aware)
size: 100,

// primary color range radius ( 0=red, 60=yellow, 120=green, ..., 360=red )
hue: { min: 0, max: 360 },

// saturation ( 0=grey, 100=colorfull )
saturation: { min: 70, max: 100 },

// lightness ( 0=extremlydark, 50=optimal, 100=extremlybright )
lightness: { min: 45, max: 65 },

// hue variation for individual triangles
variation: { min: 7, max: 14, enabled: true },

// color shift from primary hue to secondary hue ( the pattern )
shift: { min: 60, max: 300 },

// the pattern opacity
figurealpha: { min: .7, max: 1.2 }, // alpha

// simulate a 3d cube by different areas gets some more/less light applyed 
light:{ top:10, right:-8, left:-4, enabled: true}
}
```

Node
---

> TODO: node-canvas example

Install with: 

```shell
$ npm install hashicon
```   

See ESM+CJS builds [here](dist).


Development
-----------

1. Install package dependencies locally:
```shell
$ npm install
```

2. Start development environment:
```shell
$ npm run dev
```

3. Open http://localhost:3000

> Changes are built in "dev" folder with sourcemaps and are live-reloaded.

Build
-----

```shell
$ npm run build
```

> Builds package into `dist/` folder.

License
-----
See [LICENSE](LICENSE)


