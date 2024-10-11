//バインド
import Watcher from "./watcher.js";
import Bind from "./bind.js";

import Watch from "./watch.js"

export {Watch};

export default class Binder {
	constructor(reqesut_frame_flg=true){
		this.binds=[];
		this.variable_root = window;
		this.watcher = new Watcher();

	}

	init(dom,_variable_root){
		//初期化&バインド
		if(_variable_root){
			this.variable_root = _variable_root;
		}
		this.bindNodes(dom,this.variable_root);

		this.watcher.init();

	}

	bind(node,attribute_name,variable_root,variable_names,func){
		var bind = this.binds.find((e)=>{return (e.node == node && e.attribute_name == attribute_name);});
		if(bind){
			return bind;
		}
		//ノードとバインド変数を渡してバインド情報を登録する
		bind=new Bind();
		bind.node = node;

		bind.attribute_name = attribute_name;

		if(!variable_root){
			variable_root = this.variable_root;
		}

		if(!Array.isArray(variable_names)){
			variable_names = [variable_names];
		}

		var variable_roots = [];
		for(var i=0;i<variable_names.length;i++){
			variable_roots.push(variable_root);
		}

		bind.func=func;

		bind.binder=this;
		this.binds.push(bind);
		if(node.hasAttribute("feedback") && bind.attribute_name==""){
			var f= node.getAttribute("feedback");
			if(f != null && f!=""){
				bind.feedBack2 = Function(f);
			}
			node.addEventListener("change",()=>{
				bind.feedBack();
				if(bind.feedBack2){
					bind.feedBack2();
					}
			});
			
		}

	//	variable_names.forEach((name)=>{
	//		bind.watches.push(watcher.watch(variable_root,name));
	//	});
		bind.task = this.watcher.watch(variable_roots,variable_names,(watches)=>{bind.refresh(watches)});

		return bind;
	}
	bindNodes(node,variable_root){
		var bindedNodes = node.querySelectorAll("*");
		bindedNodes.forEach((node)=>{
			for(var i=0;i<node.attributes.length;i++){
				var attribute_name = node.attributes[i].name;
				if(attribute_name.indexOf(":")==-1)continue;
				//if(attribute_name.indexOf("bind:")!==0)continue;

				var variable_names = node.getAttribute(attribute_name);
				variable_names = variable_names.split(",");

				attribute_name = attribute_name.replace(":","");
				attribute_name = attribute_name.replace("bind","");

				var func=null;
				if(node.hasAttribute("bindfunc") && attribute_name ==""){
					func = node.getAttribute("bindfunc");
					func = new Function('arg', func);
				}
				this.bind(node,attribute_name,null,variable_names,func);
			
			};
		});
		
	}

}


window.Binder = Binder;
