//colorpaletes for chart.js
const paletblueToPurple = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];
const greenPalette = ["#265c46", "#40773f", "#718e2b", "#b19f04", "#ffa600"];
const orangepalette = ["#565c1d", "#777117", "#9f850b", "#cc9700", "#ffa600"];
const salmonPalette = ["#5c4346","#91524f","#c1654a","#e78137","#ffa600"];
const brightBluePalette = ["#345c5b","#43827d","#54aa9f","#69d4bf","#82ffde"];
const pinkpalette = ["#5c3115","#90352a","#c62f56","#f1309a","#ff54f4"];
const lemonPalette = ["#285c15","#54832a","#84ab40","#b8d556","#f0ff6e"];
const greenToBluePalette = ["#47ff78","#00f6cf","#00e3ff","#00c9ff","#8cabff"];
const redShadowsPalette = ["#ff0d0d","#ff4334","#ff6153","#ff7c70","#ff948c"];
const lightBluePalete = ["#ff8c8c","#eeb277","#ccd490","#afedc8","#b5fdff"];
const whisteriaPalette =["#000000", "#7f95d1", "#ff82a9", "#ffc0be"," #ffebe7"];
const lavenderPowderPalette = ["#8edce6", "#d5dcf9", "#a7b0ca", "#725e54", "#443627"];
const teaGreenPalette = ["#87a878"," #b0bc98"," #c7ccb9", "#cae2bc", "#dbf9b8"];
const bordeauPalette = ["#3d0814", "#e7f9a9", "#c6b38e", "#9a9b73", "#442f38"];
const orchidPalette = ["#fdc5f5", "#f7aef8", "#b388eb", "#8093f1", "#72ddf7"];
const mintPalette = ["#b2abf2"," #89043d", "#2fe6de", "#1c3041", "#18f2b2"];
const blackBerry = ["#c2e812", "#91f5ad", "#8b9eb7", "#745296", "#632a50"];
const mauvePalette = ["#904c77", "#e49ab0", "#ecb8a5", "#eccfc3", "#957d95"];
const waluPalette = ["#91482c","#ef9d5d","#7e0cd6","#051139","#ffff31" ];
const periPalette = ["#c9c9ee"," #baabbd", "#9f838c", "#8d7471", "#816f68"]
var palettes = [paletblueToPurple, greenPalette, orangepalette, salmonPalette, brightBluePalette, pinkpalette, lemonPalette, greenToBluePalette, redShadowsPalette, lightBluePalete
    ,whisteriaPalette, lavenderPowderPalette, teaGreenPalette, bordeauPalette, orchidPalette, mintPalette, blackBerry, mauvePalette, waluPalette, periPalette
];
export function getRandomPalete() {
    const randomPosition = Math.floor(Math.random() * palettes.length)
    return palettes[randomPosition];
}
