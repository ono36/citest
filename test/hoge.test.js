"use strict"
import {jest} from '@jest/globals'
import Watcher from "../src/watcher.js";

test("constructor", () => {
	var watcher = new Watcher();
})

//global.requestAnimationFrame = fn => setTimeout(fn, 16);
jest.useFakeTimers();

test("子監視(変更なし)", () => {
	// 変数監視、変更が無いためコールバックは呼ばれない
	var watcher = new Watcher();
	watcher.init();

	var test={};
	var fnc= jest.fn();

	test.member = 1;

	watcher.watch(test,"member",fnc);

	watcher.refresh();
	expect(fnc).toHaveBeenCalledTimes(0)
})

test("子監視", () => {
	// 変数監視、変更があるためコールバックが呼ばれる

	var watcher = new Watcher();
	watcher.init();

	var test={};
	var fnc= jest.fn();

	test.member = 1;

	watcher.watch(test,"member",fnc);

	test.member = 2; //監視変数の値を変更

	watcher.refresh();

	expect(fnc).toHaveBeenCalledTimes(1)
})

test("孫監視", () => {
	// 変数監視, 孫メンバ変数を監視

	var watcher = new Watcher();
	watcher.init();

	var test={};
	var fnc= jest.fn();

	test.child={};
	test.child.member = 1;

	watcher.watch(test,"child.member",fnc);

	test.child.member = 2; //監視変数の値を変更

	watcher.refresh();

	expect(fnc).toHaveBeenCalledTimes(1)
})

test("子監視(孫変更)", () => {
	// 変数監視, 子メンバ変数を監視し孫メンバ変更

	var watcher = new Watcher();
	watcher.init();

	var test={};
	var fnc= jest.fn();

	test.child={};
	test.child.member = 1;

	watcher.watch(test,"child",fnc);

	test.child.member = 2; //監視変数の値を変更する

	watcher.refresh();

	expect(fnc).toHaveBeenCalledTimes(1)
})

test("requestAnimationFrmae", () => {

	var watcher = new Watcher();
	watcher.init();

	var test={};
	var fnc= jest.fn();
	requestAnimationFrame(()=>{
		watcher.refresh();
	});

	test.child=1;

	watcher.watch(test,"child",fnc);

	test.child= 2; //監視変数の値を変更
//	jest.runAllTimers();
    jest.runOnlyPendingTimers();
	expect(fnc).toHaveBeenCalledTimes(1)
})
//test('displays a user after a click', () => {
//  // Set up our document body
//  document.body.innerHTML =
//    '<div>' +
//    '  <span id="username" />' +
//    '  <button id="button" />' +
//    '</div>';
//
//	import('./displayUser.js').then(module=>{
//
//
//	  // Use jquery to emulate a click on our button
//	var btn = document.getElementById("button");
//	  btn.click();
//
//	 var span = document.getElementById("username");
//	 expect(span.innerHTML).toEqual('test');
//	 });
//
//});
