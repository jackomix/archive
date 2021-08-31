var elements = ["", "Hot", "Cold", "Solid", "Liquid", "Gas"]; 
var crafting = [];
var options = [];
var stoptime = false;
var timewait;

for(var t=0; t < 9; t++){
    updateDropdown(t);
}

window.setInterval(function(){
  if(stoptime===true){
    document.getElementById("recipeb").innerHTML = "Cooldown... (" + miliToMS(timewait.getTimeLeft()) + ")" ;
  }
}, 1000);

function updateDropdown(i) {
  var dropdowns = ["1","2","3","4","5","6","7","8","9"];
  var select = document.getElementById(dropdowns[i]);
  options = elements;
  elements = [];
  
  $(select).empty();
    var x = document.getElementsByTagName('td');
   for(i=0;i<x.length;i++) {
     x[i].style.backgroundColor = "";
   }
  
  for(var n = 0; n < options.length; n++) {
      var opt = options[n];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
  elements = options;
}

function craft() {
  crafting = [];
  for(var t=0; t < 9; t++){
    var dropdowns = ["1","2","3","4","5","6","7","8","9"]
    var select = document.getElementById(dropdowns[t]).value;
    crafting.push(select);
  }
  var goodrecipe = false;
  var elementname = "";
  
  elementname = "Earth";
  if (_.isEqual(crafting,["Solid", "Solid", "Solid",
                          "Solid", "Solid", "Solid",
                          "Solid", "Solid", "Solid"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Warm";
  if (cIa(crafting,"Hot")==1 && cIa(crafting,"Cold")==1 && cIa(crafting,"")==7 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Fire";
  if (_.isEqual(crafting,["", "Hot", "",
                          "Hot", "Hot", "Hot",
                          "Hot", "Hot", "Hot"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Water";
  if (_.isEqual(crafting,["", "Liquid", "",
                          "Liquid", "Liquid", "Liquid",
                          "Liquid", "Liquid", "Liquid"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Vacuum";
  if (cIa(crafting,"")==9 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Space";
  if (cIa(crafting,"Vacuum")==9 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Planet";
  if (_.isEqual(crafting,["Space", "Water", "Space",
                          "Water", "Grass", "Water",
                          "Space", "Water", "Space"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Lava";
  if (cIa(crafting,"Fire")==1 && cIa(crafting,"Liquid")==1 && cIa(crafting,"")==7 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Air";
  if (cIa(crafting,"Gas")==9 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Ice";
  if (_.isEqual(crafting,["Cold", "Cold", "Cold",
                          "Cold", "Water", "Cold",
                          "Cold", "Cold", "Cold"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Volcano";
  if (_.isEqual(crafting,["", "Lava", "",
                          "Earth", "Lava", "Earth",
                          "Earth", "Earth", "Earth"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Black Hole";
  if (_.isEqual(crafting,["Space", "Vacuum", "Space",
                          "Vacuum", "Vacuum", "Vacuum",
                          "Space", "Vacuum", "Space"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Nothing";
  if (cIa(crafting,"Black Hole")==9 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Cloud";
  if ((_.isEqual(crafting,["", "Water Vapor", "",
                          "Water Vapor", "Water Vapor", "Water Vapor",
                          "", "", ""]) || _.isEqual(crafting,["", "", "",
                                                              "", "Water Vapor", "",
                                                              "Water Vapor", "Water Vapor", "Water Vapor"])) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Sky";
  if (_.isEqual(crafting,["Air", "Air", "Air",
                          "Air", "Planet", "Air",
                          "Air", "Air", "Air"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Boiling Water";
  if (cIa(crafting,"Hot")==1 && cIa(crafting,"Water")==1 && cIa(crafting,"")==7 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Wood";
  if (cIa(crafting,"Rock")==1 && cIa(crafting,"Tree")==1 && cIa(crafting,"")==7 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Wheel";
  if (_.isEqual(crafting,["", "Wood", "",
                          "Wood", "", "Wood",
                          "", "Wood", ""]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Stick";
  if (_.isEqual(crafting,["", "Wood", "",
                          "", "Wood", "",
                          "", "Wood", ""]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  if (goodrecipe===false) {
    document.getElementById("news").innerHTML = "Nothing happened...";
  }
  
  for(var a=0; a < 9; a++){
    updateDropdown(a);
  }
}

function wait() {
  waiting = [];
  for(var t=0; t < 9; t++){
    var dropdowns = ["1","2","3","4","5","6","7","8","9"]
    var select = document.getElementById(dropdowns[t]).value;
    waiting.push(select);
  }
  var goodrecipe = false;
  var elementname = "";
  /*
  elementname = "Earth";
  if (_.isEqual(waiting,["Solid", "Solid", "Solid",
                         "Solid", "Solid", "Solid",
                         "Solid", "Solid", "Solid"]) && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  */
  elementname = "Grass";
  if (cIa(waiting,"Earth")==1 && cIa(waiting,"")==8 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Patience";
  if (cIa(waiting,"")==9 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Water Vapor";
  if (cIa(waiting,"Water")==1 && cIa(waiting,"")==8 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Water Vapor";
  if (cIa(waiting,"Water")==1 && cIa(waiting,"")==8 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Plant";
  if (cIa(waiting,"Grass")==1 && cIa(waiting,"")==8 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Tree";
  if (cIa(waiting,"Plant")==1 && cIa(waiting,"")==8 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  elementname = "Rock";
  if (cIa(waiting,"Lava")==1 && cIa(waiting,"")==8 && cIa(elements,elementname)==0){
    elements.push(elementname);
    document.getElementById("news").innerHTML = "You made " + elementname + "!";
    goodrecipe = true;
  }
  
  if (goodrecipe===false) {
    document.getElementById("news").innerHTML = "Nothing happened...";
  }
  
  for(var a=0; a < 9; a++){
    updateDropdown(a);
  }
}

function changeColor(i) {
  var goodcolor = false;
  if($(i).val()=="Hot") {
    $(i).parent().css({background: "#ed2925"});
    goodcolor=true;
  }
  if($(i).val()=="Cold") {
    $(i).parent().css({background: "#007fff"});
    goodcolor=true;
  }
  if($(i).val()=="Solid") {
    $(i).parent().css({background: "#5726ad"});
    goodcolor=true;
  }
  if($(i).val()=="Liquid") {
    $(i).parent().css({background: "#7f37fc"});
    goodcolor=true;
  }
  if($(i).val()=="Gas") {
    $(i).parent().css({background: "#ac7cff"});
    goodcolor=true;
  }
  if($(i).val()=="Warm") {
    $(i).parent().css({background: "#9102ff"});
    goodcolor=true;
  }
  if($(i).val()=="Earth") {
    $(i).parent().css({background: "#7f5d27"});
    goodcolor=true;
  }
  if($(i).val()=="Fire") {
    $(i).parent().css({background: "#fc5b20"});
    goodcolor=true;
  }
  if($(i).val()=="Water") {
    $(i).parent().css({background: "#1462ff"});
    goodcolor=true;
  }
  if($(i).val()=="Grass") {
    $(i).parent().css({background: "#4ed82b"});
    goodcolor=true;
  }
  if($(i).val()=="Vacuum") {
    $(i).parent().css({background: "#000000"});
    goodcolor=true;
  }
  if($(i).val()=="Space") {
    $(i).parent().css({background: "#1c1a1a"});
    goodcolor=true;
  }
  if($(i).val()=="Planet") {
    $(i).parent().css({background: "#32fc90"});
    goodcolor=true;
  }
  if($(i).val()=="Lava") {
    $(i).parent().css({background: "#bc1c00"});
    goodcolor=true;
  }
  if($(i).val()=="Air") {
    $(i).parent().css({background: "#bffdff"});
    goodcolor=true;
  }
  if($(i).val()=="Ice") {
    $(i).parent().css({background: "#66d6ff"});
    goodcolor=true;
  }
  if($(i).val()=="Volcano") {
    $(i).parent().css({background: "#8c2f21"});
    goodcolor=true;
  }
  if($(i).val()=="Black Hole") {
    $(i).parent().css({background: "#0b1423"});
    goodcolor=true;
  }
  if($(i).val()=="Patience") {
    $(i).parent().css({background: "#ed9ff9"});
    goodcolor=true;
  }
  if($(i).val()=="Nothing") {
    $(i).parent().css({background: "#ffffff"});
    goodcolor=true;
  }
  if($(i).val()=="Water Vapor") {
    $(i).parent().css({background: "#d6ebff"});
    goodcolor=true;
  }
  if($(i).val()=="Cloud") {
    $(i).parent().css({background: "#f2f7ff"});
    goodcolor=true;
  }
  if($(i).val()=="Sky") {
    $(i).parent().css({background: "#93d5ff"});
    goodcolor=true;
  }
  if($(i).val()=="Plant") {
    $(i).parent().css({background: "#4bf442"});
    goodcolor=true;
  }
  if($(i).val()=="Tree") {
    $(i).parent().css({background: "#34af2d"});
    goodcolor=true;
  }
  if($(i).val()=="Boiling Water") {
    $(i).parent().css({background: "#7535ff"});
    goodcolor=true;
  }
  if($(i).val()=="Rock") {
    $(i).parent().css({background: "#848484"});
    goodcolor=true;
  }
  if($(i).val()=="Wood") {
    $(i).parent().css({background: "#93571a"});
    goodcolor=true;
  }
  if($(i).val()=="Wheel") {
    $(i).parent().css({background: "#bc7934"});
    goodcolor=true;
  }
  if($(i).val()=="Stick") {
    $(i).parent().css({background: "#d54d0b"});
    goodcolor=true;
  }
  
  if(goodcolor===false) {
    $(i).parent().css({background: "white"});
  }
}

function exportSave() {
  save = elements.toString();
  document.getElementById("savearea").innerHTML = LZString.compress(save);
}
function importSave() {
  saveload = prompt("Paste save data here please.");
  if(saveload === null || saveload.length<=1) { return; }
  elements = LZString.decompress(saveload).split(",");
  for(var a=0; a < 9; a++){
    updateDropdown(a);
  }
}

function findRecipe() {
  var recipeget = document.getElementById("recipe").value;
  var recipetext = "";
  var recipestop = false;
  
  if(stoptime===false){
    
    if(recipeget == "Earth"){
      recipetext = "Solid";
    } 
    else if(recipeget == "Warm"){
      recipetext = "Hot and Cold";
    }
    else if(recipeget == "Fire"){
      recipetext = "Hot";
    }
    else if(recipeget == "Water"){
      recipetext = "Liquid";
    }
    else if(recipeget == "Vacuum"){
      recipetext = '"Craft!"';
    }
    else if(recipeget == "Space"){
      recipetext = "Vacuum";
    }
    else if(recipeget == "Planet"){
      recipetext = "Space, Water and Grass";
    }
    else if(recipeget == "Lava"){
      recipetext = "Fire and Liquid";
    }
    else if(recipeget == "Air"){
      recipetext = "Gas";
    }
    else if(recipeget == "Ice"){
      recipetext = "Cold and Water";
    }
    else if(recipeget == "Volcano"){
      recipetext = "Earth and Lava";
    }
    else if(recipeget == "Black Hole"){
      recipetext = "Space and Vacuum";
    }
    else if(recipeget == "Nothing"){
      recipetext = "Black Hole";
    }
    else if(recipeget == "Grass"){
      recipetext = "Earth";
    }
    else if(recipeget == "Patience"){
      recipetext = '"Wait..."';
    }
    else if(recipeget == "Water Vapor"){
      recipetext = "Water";
    }
    else if(recipeget == "Cloud"){
      recipetext = "Water Vapor";
    }
    else if(recipeget == "Sky"){
      recipetext = "Air and Planet";
    }
    else if(recipeget == "Plant"){
      recipetext = "Grass";
    }
    else if(recipeget == "Tree"){
      recipetext = "Plant";
    }
    else if(recipeget == "Boiling Water"){
      recipetext = "Hot and Water";
    }
    else if(recipeget == "Rock"){
      recipetext = "Lava";
    }
    else if(recipeget == "Wood"){
      recipetext = "Rock and Tree";
    }
    else if(recipeget == "Wheel"){
      recipetext = "Wood";
    }
    else if(recipeget == "Stick"){
      recipetext = "Wood";
    }
    else {
      document.getElementById("recipet").innerHTML = "Recipe for " + recipeget + " not found. (Each first letter is uppercase...)";
      recipestop = true;
    }
  
  }
  
  if(recipestop===false && stoptime===false){
    stoptime = true;
    document.getElementById("recipet").innerHTML = "The ingredients to " + recipeget + " are: " + recipetext + ".";
    timewait = new timer(function(){
      continueTime();
      }, 900000);
  }
  
}

function continueTime() {
  stoptime = false;
  document.getElementById("recipeb").innerHTML = "Find recipe";
}

/* https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript */

function miliToMS(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

/* https://stackoverflow.com/questions/3144711/find-the-time-left-in-a-settimeout */

function timer(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    this.getStateRunning = function() {
        return running
    }

    this.start()
}

/* https://stackoverflow.com/questions/13389398/finding-out-how-many-times-an-array-element-appears */

function cIa(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}