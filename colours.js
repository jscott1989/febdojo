var _ = require('underscore');

var THRESHOLD = 40;
var CLOSENESS_THRESHOLD = 20;

Array.prototype.pairs = function (func) {
    var pairs = [];
    for (var i = 0; i < this.length - 1; i++) {
        for (var j = i; j < this.length - 1; j++) {
            func([this[i], this[j+1]]);
        }
    }
}

function convertHexToRGB(hex) {
    if (hex.substring(0, 1) == "#") {
        hex = hex.substring(1, hex.length);
    }

    var red = hex.substring(0, 2);
    var green = hex.substring(2, 4);
    var blue = hex.substring(4, 6);

    var redInt = parseInt(red, 16);
    var greenInt = parseInt(green, 16);
    var blueInt = parseInt(blue, 16);

    return [redInt, greenInt, blueInt];
}

function midpoint(p1, p2) {
    return [(p1[0] + p2[0]) / 2,(p1[1] + p2[1]) / 2,(p1[2] + p2[2]) / 2];
}

function distance (p1, p2) {
//   if (!typecheck(p1) || !typecheck(p2)) {
//     Console.log("Wrong types given");
//     return;
//   }
  
  
  var distance = 0;
  for (var i = 0; i < 3; i++) {
    var dif = p1[i] - p2[i];
    distance += dif * dif;
  }
  distance = Math.sqrt(distance);
  
  return distance;
}

var colours = {
    "Eamonn mulberry": convertHexToRGB("#C54B8C"),
    "AliceBlue": convertHexToRGB("#F0F8FF"),
    "AntiqueWhite": convertHexToRGB("#FAEBD7"),
    "Aqua": convertHexToRGB("#00FFFF"),
    "Aquamarine": convertHexToRGB("#7FFFD4"),
    "Azure": convertHexToRGB("#F0FFFF"),
    "Beige": convertHexToRGB("#F5F5DC"),
    "Bisque": convertHexToRGB("#FFE4C4"),
    "Black": convertHexToRGB("#000000"),
    "BlanchedAlmond": convertHexToRGB("#FFEBCD"),
    "Blue": convertHexToRGB("#0000FF"),
    "BlueViolet": convertHexToRGB("#8A2BE2"),
    "Brown": convertHexToRGB("#A52A2A"),
    "BurlyWood": convertHexToRGB("#DEB887"),
    "CadetBlue": convertHexToRGB("#5F9EA0"),
    "Chartreuse": convertHexToRGB("#7FFF00"),
    "Chocolate": convertHexToRGB("#D2691E"),
    "Coral": convertHexToRGB("#FF7F50"),
    "CornflowerBlue": convertHexToRGB("#6495ED"),
    "Cornsilk": convertHexToRGB("#FFF8DC"),
    "Crimson": convertHexToRGB("#DC143C"),
    "Cyan": convertHexToRGB("#00FFFF"),
    "DarkBlue": convertHexToRGB("#00008B"),
    "DarkCyan": convertHexToRGB("#008B8B"),
    "DarkGoldenRod": convertHexToRGB("#B8860B"),
    "DarkGray": convertHexToRGB("#A9A9A9"),
    "DarkGreen": convertHexToRGB("#006400"),
    "DarkKhaki": convertHexToRGB("#BDB76B"),
    "DarkMagenta": convertHexToRGB("#8B008B"),
    "DarkOliveGreen": convertHexToRGB("#556B2F"),
    "DarkOrange": convertHexToRGB("#FF8C00"),
    "DarkOrchid": convertHexToRGB("#9932CC"),
    "DarkRed": convertHexToRGB("#8B0000"),
    "DarkSalmon": convertHexToRGB("#E9967A"),
    "DarkSeaGreen": convertHexToRGB("#8FBC8F"),
    "DarkSlateBlue": convertHexToRGB("#483D8B"),
    "DarkSlateGray": convertHexToRGB("#2F4F4F"),
    "DarkTurquoise": convertHexToRGB("#00CED1"),
    "DarkViolet": convertHexToRGB("#9400D3"),
    "DeepPink": convertHexToRGB("#FF1493"),
    "DeepSkyBlue": convertHexToRGB("#00BFFF"),
    "DimGray": convertHexToRGB("#696969"),
    "DodgerBlue": convertHexToRGB("#1E90FF"),
    "FireBrick": convertHexToRGB("#B22222"),
    "FloralWhite": convertHexToRGB("#FFFAF0"),
    "ForestGreen": convertHexToRGB("#228B22"),
    "Fuchsia": convertHexToRGB("#FF00FF"),
    "Gainsboro": convertHexToRGB("#DCDCDC"),
    "GhostWhite": convertHexToRGB("#F8F8FF"),
    "Gold": convertHexToRGB("#FFD700"),
    "GoldenRod": convertHexToRGB("#DAA520"),
    "Gray": convertHexToRGB("#808080"),
    "Green": convertHexToRGB("#008000"),
    "GreenYellow": convertHexToRGB("#ADFF2F"),
    "HoneyDew": convertHexToRGB("#F0FFF0"),
    "HotPink": convertHexToRGB("#FF69B4"),
    "IndianRed ": convertHexToRGB("#CD5C5C"),
    "Indigo  ": convertHexToRGB("#4B0082"),
    "Ivory": convertHexToRGB("#FFFFF0"),
    "Khaki": convertHexToRGB("#F0E68C"),
    "Lavender": convertHexToRGB("#E6E6FA"),
    "LavenderBlush": convertHexToRGB("#FFF0F5"),
    "LawnGreen": convertHexToRGB("#7CFC00"),
    "LemonChiffon": convertHexToRGB("#FFFACD"),
    "LightBlue": convertHexToRGB("#ADD8E6"),
    "LightCoral": convertHexToRGB("#F08080"),
    "LightCyan": convertHexToRGB("#E0FFFF"),
    "LightGoldenRodYellow": convertHexToRGB("#FAFAD2"),
    "LightGray": convertHexToRGB("#D3D3D3"),
    "LightGreen": convertHexToRGB("#90EE90"),
    "LightPink": convertHexToRGB("#FFB6C1"),
    "LightSalmon": convertHexToRGB("#FFA07A"),
    "LightSeaGreen": convertHexToRGB("#20B2AA"),
    "LightSkyBlue": convertHexToRGB("#87CEFA"),
    "LightSlateGray": convertHexToRGB("#778899"),
    "LightSteelBlue": convertHexToRGB("#B0C4DE"),
    "LightYellow": convertHexToRGB("#FFFFE0"),
    "Lime": convertHexToRGB("#00FF00"),
    "LimeGreen": convertHexToRGB("#32CD32"),
    "Linen": convertHexToRGB("#FAF0E6"),
    "Magenta": convertHexToRGB("#FF00FF"),
    "Maroon": convertHexToRGB("#800000"),
    "MediumAquaMarine": convertHexToRGB("#66CDAA"),
    "MediumBlue": convertHexToRGB("#0000CD"),
    "MediumOrchid": convertHexToRGB("#BA55D3"),
    "MediumPurple": convertHexToRGB("#9370DB"),
    "MediumSeaGreen": convertHexToRGB("#3CB371"),
    "MediumSlateBlue": convertHexToRGB("#7B68EE"),
    "MediumSpringGreen": convertHexToRGB("#00FA9A"),
    "MediumTurquoise": convertHexToRGB("#48D1CC"),
    "MediumVioletRed": convertHexToRGB("#C71585"),
    "MidnightBlue": convertHexToRGB("#191970"),
    "MintCream": convertHexToRGB("#F5FFFA"),
    "MistyRose": convertHexToRGB("#FFE4E1"),
    "Moccasin": convertHexToRGB("#FFE4B5"),
    "NavajoWhite": convertHexToRGB("#FFDEAD"),
    "Navy": convertHexToRGB("#000080"),
    "OldLace": convertHexToRGB("#FDF5E6"),
    "Olive": convertHexToRGB("#808000"),
    "OliveDrab": convertHexToRGB("#6B8E23"),
    "Orange": convertHexToRGB("#FFA500"),
    "OrangeRed": convertHexToRGB("#FF4500"),
    "Orchid": convertHexToRGB("#DA70D6"),
    "PaleGoldenRod": convertHexToRGB("#EEE8AA"),
    "PaleGreen": convertHexToRGB("#98FB98"),
    "PaleTurquoise": convertHexToRGB("#AFEEEE"),
    "PaleVioletRed": convertHexToRGB("#DB7093"),
    "PapayaWhip": convertHexToRGB("#FFEFD5"),
    "PeachPuff": convertHexToRGB("#FFDAB9"),
    "Peru": convertHexToRGB("#CD853F"),
    "Pink": convertHexToRGB("#FFC0CB"),
    "Plum": convertHexToRGB("#DDA0DD"),
    "PowderBlue": convertHexToRGB("#B0E0E6"),
    "Purple": convertHexToRGB("#800080"),
    "RebeccaPurple": convertHexToRGB("#663399"),
    "Red": convertHexToRGB("#FF0000"),
    "RosyBrown": convertHexToRGB("#BC8F8F"),
    "RoyalBlue": convertHexToRGB("#4169E1"),
    "SaddleBrown": convertHexToRGB("#8B4513"),
    "Salmon": convertHexToRGB("#FA8072"),
    "SandyBrown": convertHexToRGB("#F4A460"),
    "SeaGreen": convertHexToRGB("#2E8B57"),
    "SeaShell": convertHexToRGB("#FFF5EE"),
    "Sienna": convertHexToRGB("#A0522D"),
    "Silver": convertHexToRGB("#C0C0C0"),
    "SkyBlue": convertHexToRGB("#87CEEB"),
    "SlateBlue": convertHexToRGB("#6A5ACD"),
    "SlateGray": convertHexToRGB("#708090"),
    "Snow": convertHexToRGB("#FFFAFA"),
    "SpringGreen": convertHexToRGB("#00FF7F"),
    "SteelBlue": convertHexToRGB("#4682B4"),
    "Tan": convertHexToRGB("#D2B48C"),
    "Teal": convertHexToRGB("#008080"),
    "Thistle": convertHexToRGB("#D8BFD8"),
    "Tomato": convertHexToRGB("#FF6347"),
    "Turquoise": convertHexToRGB("#40E0D0"),
    "Violet": convertHexToRGB("#EE82EE"),
    "Wheat": convertHexToRGB("#F5DEB3"),
    "White": convertHexToRGB("#FFFFFF"),
    "WhiteSmoke": convertHexToRGB("#F5F5F5"),
    "Yellow": convertHexToRGB("#FFFF00"),
    "YellowGreen": convertHexToRGB("#9ACD32")
};

function getColourName(c) {
    var distances = _.sortBy(_.map(colours, function (point, colour) {
        return [colour, distance(c, point)]
    }), function(distance) {
        return distance[1];
    });

    if (distances[0][1] < THRESHOLD) {
        return distances[0][0];
    } else {
        var name = distances[1][0];
        if (name.substring(name.length - 1, name.length) == "y") {
            // Just concatenate names (e.g. "Sarah berry yellow")
            return distances[1][0] + " " + distances[0][0];
        } else {
            return distances[1][0] + "-y " + distances[0][0];
        }
    }
}

if (process.argv[2] == "y") {
    _.keys(colours).pairs(function(pair){
        var c = midpoint(colours[pair[0]], colours[pair[1]]);
        colours[getColourName(c)] = c;
    });
}

var our_colour = convertHexToRGB(process.argv[3]);
console.log(getColourName(our_colour));