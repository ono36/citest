// displayUser.js
'use strict';

var btn = document.getElementById("button");
btn.addEventListener("click",function(e){
	var span = document.getElementById("username");
	span.innerHTML = "test";
});
