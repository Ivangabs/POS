function makeOption(text, callback_data){
    return {
        text: text,
        callback_data: callback_data
    }
}
const unitsOfMeasure = [
  // ---- General Count ----
//   "piece",
//   "unit",
//   "pack",
//   "box",
//   "dozen",
//   "pair",
//   "set",
    [
        makeOption("piece", "piece"),
        makeOption("pack", "pack"),
        makeOption("box", "box")
    ],
    [
        makeOption("dozen", "doz"),
        makeOption("kilogram", "kg"),
        makeOption("liter", "l")
    ],
    [
        makeOption("meter", "m"),
        makeOption("tray", "tray")
    ]
    
  // ---- Weight ----
//   "gram",
//   "kilogram",
//   "milligram",
//   "pound",
//   "ounce",
//   "ton",

//   // ---- Volume (liquids & dry goods) ----
//   "milliliter",
//   "liter",
//   "centiliter",
//   "gallon",
//   "quart",
//   "pint",
//   "fluid ounce",
//   "cup",
//   "tablespoon",
//   "teaspoon",

//   // ---- Length (useful for some non-food items, e.g. foil, wrap) ----
//   "millimeter",
//   "centimeter",
//   "meter",
//   "inch",
//   "foot",
//   "yard",

//   // ---- Area (rare, but useful for items like produce sold by tray) ----
//   "square centimeter",
//   "square meter",
//   "square inch",
//   "square foot",

//   // ---- Others / Special ----
//   "bundle",
//   "roll",
//   "sachet",
//   "bag",
//   "bottle",
//   "can",
//   "jar",
//   "carton",
//   "tube",
//   "tray",
//   "bar",
//   "stick",
//   "slice",
//   "loaf",
//   "bunch",     // e.g., bananas, herbs
//   "head",      // e.g., lettuce, cabbage
//   "clove",     // e.g., garlic
//   "piece (cut)" // e.g., meat or cheese cuts
];

export default unitsOfMeasure;