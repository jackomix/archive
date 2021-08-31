window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

questions = [`Describe what happened`, `Describe how this happened`, `Describe why this happened`, `Describe when this happened`, `Mention that you interviewed someone on this and describe the interview`, `Describe would could've prevented this from happening`, `Describe the people in this situation`, `Describe a certain person in this situation`, `Describe a certain object that was involved in this situation`, `Describe a coincidence in this situation`, `Describe why this happened instead of something else`]
answers = [];

var headline;
$.get( "headlines.txt", function( data ) {
    var lines = data.split("\n");
    var r = Math.floor(Math.random() * lines.length);
    headline = lines[r];
    document.getElementById("headline").innerHTML = headline;
});

var players;
var curplayer = 0;
function start() {
  players = prompt("How many people to answer questions?", "");
  shuffleArray(questions);
  document.getElementById("questions").style.visibility = "visible";
  question();
}
start();

function question() {
  curplayer++;
  document.getElementById("question").innerHTML = questions[curplayer-1];
}

function submit() {
  answers.push(document.getElementById("answer").value)
  document.getElementById("answer").value = "";
  document.getElementById("questions").style.visibility = "hidden";
  setTimeout(function (){
    if (curplayer != players) {
      alert("Pass to the next player")
      document.getElementById("questions").style.visibility = "visible";
      question();
    } else {
      alert("Pass to the news reporter")
      document.getElementById("teleprompt").style.visibility = "visible";
      teleprompt();
    }
  }, 100);
}

function teleprompt() {
  document.getElementById("text").innerHTML = headline + "<br><br>" + answers.join(" ");
  $('#text').addClass("marquee");
}