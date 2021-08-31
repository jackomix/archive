var templink, templink2;

$.get("/simplecool/index.txt", function(data){
  var file = data.split("\n");
  for (var i = 0; i < file.length; i++) {
    if (file[i].includes("hyperbig: ")) {
      document.write(`<h1 style="font-size:100px; margin-bottom:0px;">` + file[i].substring(file[i].indexOf(': ')+1) + `</h1>`);
    }
    if (file[i].includes("superbig: ")) {
      document.write(`<h1>` + file[i].substring(file[i].indexOf(': ')+1) + `</h1>`);
    }
    if (file[i].includes("text: ")) {
      document.write(`<p>` + file[i].substring(file[i].indexOf(': ')+1) + `</p>`);
    }
    if (file[i].includes("image: ")) {
      document.write(`<img src="` + file[i].substring(file[i].indexOf(': ')+1) + `"><br><br>`);
    }
    if (file[i].includes("link: ")) {
      templink = file[i].split('|');
      templink2 = templink[0].split(': ');
      document.write(`<a href="` + templink[templink.length - 1] + `">` + templink2[templink2.length - 1]  + `</a>`);
    }
    if (file[i].includes("font: ")) {
      document.write(`<style> body { font-family: ` + file[i].substring(file[i].indexOf(': ')+1) + `; } </style>`);
      console.log(`<style> body { font-family: ` + file[i].substring(file[i].indexOf(': ')+1) + `; </style>`)
    }
  }
});