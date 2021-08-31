var vowels = ["a", "e", "i", "o", "u"];
var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
var picker, name, r, g, b, rgb;

// https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function channelChoicesSetup() {
  var array = [];
  for (var vowel in vowels) {
    for (var consonant in consonants) {
      array.push(vowels[vowel] + consonants[consonant]);
    }
    for (var consonant in consonants) {
      array.push(consonants[consonant] + vowels[vowel]);
    }
  }
  return array;
}

function poconymToRgb(c,r,g,b) {
  return "rgb(" + Math.floor(r.map(0,c.length-1,0,255)) + "," + Math.floor(g.map(0,c.length-1,0,255)) + "," + Math.floor(b.map(0,c.length-1,0,255)) + ")";
}
function rgbToPoconym(c,r,g,b) {
  return c[Math.floor(r.map(0,255,0,c.length-1))] + c[Math.floor(g.map(0,255,0,c.length-1))] + c[Math.floor(b.map(0,255,0,c.length-1))];
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function update() {
  work = false;
  picker = document.getElementById("colorpicker").jscolor;
  name = document.getElementById("poconymName").value;
  document.getElementById("colorpicker").value = "";
  document.getElementById("colorpicker").style.backgroundColor = "#fff";
  document.getElementById("poconymName").value = "";
  
  if (name.length > 0) {
    if(/^[a-zA-Z]+$/.test(name) && name.length < 7) {
      r = Math.floor(channelChoices.indexOf(name.charAt(0)+name.charAt(1)).map(0,channelChoices.length-1,0,255));
      g = Math.floor(channelChoices.indexOf(name.charAt(2)+name.charAt(3)).map(0,channelChoices.length-1,0,255));
      b = Math.floor(channelChoices.indexOf(name.charAt(4)+name.charAt(5)).map(0,channelChoices.length-1,0,255));
      console.log(b);
      if (r > 0 && g > 0 && b > 0) {
        work = true;
        rgb = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        namep = name;
      } else {
        alert(`sorry, the system can't have two consonants or vowels in a pair. for example, you can't do "pakaCC", cause the last pair "CC" has two consonants.`)
      }
    } else {
      alert("that's not a six letter word.")
    }
  } else {
    work = true;
    r = Math.floor(picker.rgb[0]);
    g = Math.floor(picker.rgb[1]);
    b = Math.floor(picker.rgb[2]);
    rgb = picker.toHEXString();
    namep = rgbToPoconym(channelChoices, r, g, b);
  }
  
  if (work) {
    stats.innerHTML = 
    "hex: " + rgb + "<br>" +
    "rgb: " + r + ", " + g + ", " + b + "<br>" +
    "name: " + namep;
    document.getElementById("colorPreview").style.backgroundColor = rgb;
  }
}

var channelChoices = channelChoicesSetup();

var stats = document.getElementById("stats");
var colorpicker = document.getElementById("stats");