//import
"use strict"
import Hoge  from "./main.js";
//const Hoge  = require('./main.js')
test("constructor", () => {
	var hoge = new Hoge();
})

test("functest", () => {
	var hoge = new Hoge();
	expect(hoge.testFunc(1)).toEqual(2);
})

test('displays a user after a click', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';

	import('./displayUser.js').then(module=>{


	  // Use jquery to emulate a click on our button
	var btn = document.getElementById("button");
	  btn.click();

	 var span = document.getElementById("username");
	 expect(span.innerHTML).toEqual('test');
	 });

});
