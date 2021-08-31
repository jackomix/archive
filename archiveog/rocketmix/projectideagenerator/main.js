var views = 0;

function viewsClick(number){
    views = views + number;
    document.getElementById("views").innerHTML = views;
};

var cursors = 0;

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(views >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	views = views - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('views').innerHTML = views;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

var refresh = 0;

function buyRefresh(){
    var refreshCost = Math.floor(100 * Math.pow(1.1,refresh));     //works out the cost of this cursor
    if(views >= refreshCost){                                   //checks that the player can afford the cursor
        refresh = refresh + 1;                                   //increases number of cursors
    	views = views - refreshCost;                          //removes the cookies spent
        document.getElementById('refresh').innerHTML = refresh;  //updates the number of cursors for the user
        document.getElementById('views').innerHTML = views;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(100 * Math.pow(1.1,refresh));       //works out the cost of the next cursor
    document.getElementById('refreshCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

window.setInterval(function(){
	
	viewsClick(cursors);
	
}, 1000);
