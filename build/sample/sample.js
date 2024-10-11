import Binder from "../build/binder.js"

export default Sample{
	constructor(){
		this.binder = new Binder();
		this.counter;
	}

	fnc(){
		this.counter++;

	}

	load(){
		this.binder.init(document.body,this);
	}
}
