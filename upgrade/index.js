var points = 0; // points you have in the game
var totalpoints = 0;
var ppc = 1; // points per click
var statText = document.getElementById('statTextID'); // get the id of the text that displays stats

var shop = {
  uppc: {name: "upgrade per click", text: "adds #ppcadd# per click", ppcadd: 1, tpneeded: 30, price: 10, pricemulti: 1.3, quantity: 0},
  guppc: {name: "good upgrade per click", text: "times upgrade per click by #umulti#", umultiname: "uppc", umulti: 2, tpneeded: 150, price: 200, pricemulti: 4.2, quantity: 0},
  nuppc: {name: "neat upgrade per click", text: "times good upgrade per click by #umulti#", umultiname: "guppc", umulti: 2, tpneeded: 2000, price: 3000, pricemulti: 4.6, quantity: 0},
};

function updateStats() { // update stats
  ppc = 1;
  Object.keys(shop).forEach(function(button, index) {
    if(totalpoints >= shop[button].tpneeded){document.getElementById(button).style.display = "block"}
    if (Object.prototype.hasOwnProperty.call(shop[button], 'ppcadd')) {
      ppc += shop[button].ppcadd * shop[button].quantity;
    }
  });
  ppc = Math.floor(ppc);

  statText.innerHTML = "";
  if(totalpoints > 0){statText.innerHTML += String(points)}
  if(totalpoints >= 10){statText.innerHTML += String("<br>per click: " + ppc)}
}

function updateButtons() {
  Object.keys(shop).forEach(function(button, index) {
    if (document.getElementById(button) !== null) {
      document.getElementById(button).innerHTML = setButtonName(button);
    } else {
      createButton(button);
    }
  });
}

function clickButton() { // up the points when you click
  points += ppc;
  totalpoints += ppc;
  updateStats();
}

function checkUpgrade(item) {
  if (Object.prototype.hasOwnProperty.call(shop[item], 'umulti')) {
    var itemtomulti = shop[item].umultiname;
    if (Object.prototype.hasOwnProperty.call(shop[itemtomulti], 'ppcadd')) { shop[itemtomulti].ppcadd *= shop[item].umulti; }
    if (Object.prototype.hasOwnProperty.call(shop[itemtomulti], 'umulti')) { 
      shop[itemtomulti].umulti *= shop[item].umulti; 
      checkUpgrade(itemtomulti);
    }
  }
}

function buyItem(item) { // manages the buying stuff
  if(points >= shop[item].price){
    points -= shop[item].price;
    shop[item].quantity += 1;
    shop[item].price = Math.floor(shop[item].price * shop[item].pricemulti);
    document.getElementById(item).innerHTML = setButtonName(item);
    checkUpgrade(item);
    updateStats();
    updateButtons();
  } else {
    alert("not enough");
  }
}

function createButton(item) {
    var button = document.createElement("button");
    button.id = item;
    button.innerHTML = setButtonName(item);
    button.addEventListener("click", function(){buyItem(item)}, false);
    var context = document.getElementById("buttons");
    context.appendChild(button);
    updateStats();
}

function setButtonName(item) {
  return shop[item].name + " (price: " + shop[item].price + ") (has: " + shop[item].quantity + ") (" + shop[item].text.replace("#ppcadd#", shop[item].ppcadd).replace("#umulti#", shop[item].umulti) + ")";
}

updateStats();
updateButtons();