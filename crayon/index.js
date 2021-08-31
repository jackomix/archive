var canvas;
var panels = [];
addPanel();
var currentPanel = 0;
panels[currentPanel][0].style.display = "block";
panels[currentPanel][0].id = "canvas";
panels[currentPanel][0].addEventListener("mousedown", function (e) { startDraw(e) }, false);
panels[currentPanel][0].addEventListener("mouseup", function (e) { stopDraw(e) }, false);
panels[currentPanel][0].addEventListener("mouseout", function (e) { stopDraw(e) }, false);
panels[currentPanel][0].addEventListener("mousemove", function (e) { draw(e) }, false);

var sizeSlider = document.getElementById("sizeSlider");
sizeSlider.value = 5;
var brushColor = document.getElementById("brushColor");
var infoText = document.getElementById("info");
var clipboard = "nothing";

var isDrawing = false;
var rect = panels[currentPanel][0].getBoundingClientRect();
var firstX, firstY, secondX, secondY;
var mouseX, mouseY;

function updateInfo() {
  infoText.innerHTML = "size: " + sizeSlider.value + " | panel: " + (currentPanel + 1) + "/" + (panels.length);
  if (clipboard > -1) infoText.innerHTML += " | selected panel: panel " + (clipboard + 1);
}

function saveComic() {
  var allCanvas = Array.prototype.slice.call(document.getElementsByTagName("canvas"));
  var bufferCanvas = document.getElementById("buffer");
  var bufferCanvasCtx = bufferCanvas.getContext('2d');
  bufferCanvas.width = 320;
  var comicHeight = 241;
  if (allCanvas.length == 1) comicHeight = 240;
  bufferCanvas.height = ((allCanvas.length - 1) * comicHeight) - 1;
  bufferCanvasCtx.fillStyle = "#ffffff";
  bufferCanvasCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);
  bufferCanvasCtx.strokeStyle = "#000000";
  bufferCanvasCtx.lineWidth = 1;
  allCanvas.forEach(function (canvasi, i) { if (canvasi.id !== "buffer") {
    bufferCanvasCtx.drawImage(canvasi, 0, (i-1)*240+((i-1)*1));
    if (i > 1) {
      bufferCanvasCtx.beginPath();
      bufferCanvasCtx.moveTo(0, (i-1)*241-0.5);
      bufferCanvasCtx.lineTo(320, (i-1)*240+0.5);
      bufferCanvasCtx.stroke(); 
      bufferCanvasCtx.closePath();
    }
  }});
  var link = document.getElementById('link');
  link.setAttribute('download', 'comic.png');
  link.setAttribute('href', bufferCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();
}

function selectPanel() {
  clipboard = currentPanel;
  updateInfo();
}
function pastePanel() {
  if (typeof clipboard === "undefined") {
    alert("you haven't copied anything");
    return;
  } else if (currentPanel == clipboard) {
    return;
  }
  if (confirm('are you sure you want to replace this panel with a copy of the selected panel?')) {
    panels[currentPanel][1].putTag();
    var allCanvas = Array.prototype.slice.call(document.getElementsByTagName("canvas"));
    clearCanvas(false);
    panels[currentPanel][1].drawImage(allCanvas[clipboard + 1], 0, 0);
  }
}
function deletePanel() {
  if (panels.length <= 1) {
    alert("no");
    return;
  }
  if (currentPanel === 0) {
    switchPanel(currentPanel + 1);
    
    panels.splice(currentPanel - 1, 1);
    document.getElementsByTagName("canvas")[currentPanel].remove();
    
    currentPanel--;
  } else {
    switchPanel(currentPanel - 1);
    
    panels.splice(currentPanel + 1, 1);
    document.getElementsByTagName("canvas")[currentPanel + 2].remove()
  }
  updateInfo();
}
function addPanel() {
  var position;
  if (panels.length === 0) {
    position = 0;
  } else {
    position = panels.length;
  }
  canvas = document.createElement("canvas");
  canvas.id = "canvasNew";
  canvas.width = "320";
  canvas.height = "240";
  canvas.style.border = "1px solid";
  canvas.style.display = "none";
  var div = document.getElementById("panels");
  div.append(canvas);
  canvas = document.getElementById("canvasNew");
  panels[position] = [document.getElementById("canvasNew"), canvas.getContext("2d")];
  canvas.id = "canvasInactive";
  UndoCanvas.enableUndo(panels[position][1]);
  panels[position][1].putTag();
}
function nextPanel() {
  if (typeof panels[currentPanel+1] == 'undefined') {
    addPanel();
  }
  switchPanel(currentPanel + 1);
}
function previousPanel() {
  if (typeof panels[currentPanel-1] == 'undefined') {
    alert("no");
  } else {
    switchPanel(currentPanel - 1);
  }
}
function switchPanel(panel) {
  panels[currentPanel][0].removeEventListener("mousedown", function (e) { startDraw(e) }, false);
  panels[currentPanel][0].removeEventListener("mouseup", function (e) { stopDraw(e) }, false);
  panels[currentPanel][0].removeEventListener("mouseout", function (e) { stopDraw(e) }, false);
  panels[currentPanel][0].removeEventListener("mousemove", function (e) { draw(e) }, false);
  
  panels[currentPanel][1].save();
  panels[currentPanel][0].style.display = "none";
  panels[currentPanel][0].id = "canvasInactive";
  
  currentPanel = currentPanel + (panel - currentPanel);
  
  panels[currentPanel][0].style.display = "block";
  panels[currentPanel][0].id = "canvas";
  panels[currentPanel][1].restore();
  
  panels[currentPanel][0].addEventListener("mousedown", function (e) { startDraw(e) }, false);
  panels[currentPanel][0].addEventListener("mouseup", function (e) { stopDraw(e) }, false);
  panels[currentPanel][0].addEventListener("mouseout", function (e) { stopDraw(e) }, false);
  panels[currentPanel][0].addEventListener("mousemove", function (e) { draw(e) }, false);
  
  updateInfo();
}

function getMousePos(e) {
  var rect = panels[currentPanel][0].getBoundingClientRect();
  mouseX = (e.clientX - rect.left) / 2;
  mouseY = (e.clientY - rect.top) / 2;
}

function startDraw(e) {
  isDrawing = true;
  getMousePos(e);
  panels[currentPanel][1].moveTo(mouseX, mouseY);
  
  panels[currentPanel][1].lineWidth = sizeSlider.value;
  panels[currentPanel][1].strokeStyle = brushColor.options[brushColor.selectedIndex].value;
  
  panels[currentPanel][1].beginPath();
  panels[currentPanel][1].lineCap = "round";
  panels[currentPanel][1].lineJoin = "round";
}
function stopDraw(e) {
  isDrawing = false;
  panels[currentPanel][1].closePath();
  panels[currentPanel][1].putTag();
}

function draw(e) {
  getMousePos(e);
  
  if (isDrawing) {
    panels[currentPanel][1].lineTo(mouseX, mouseY);
    panels[currentPanel][1].stroke();
  }
}

function clearCanvas(tag) {
  if (tag !== false) panels[currentPanel][1].putTag();
  panels[currentPanel][1].clearRect(0, 0, canvas.width, canvas.height);
  if (tag !== false) panels[currentPanel][1].putTag();
}

function undoCanvas() {
  panels[currentPanel][1].undoTag(); 
}
function redoCanvas() {
  panels[currentPanel][1].redoTag();
}
document.addEventListener("keydown", function(e) {
      if (e.keyCode == 90 && e.ctrlKey) {
        document.getElementById("undo").click();
      }
      if (e.keyCode == 89 && e.ctrlKey) {
        document.getElementById("redo").click();
      }
});

updateInfo();
