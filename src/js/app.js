function Model(entity){
	this.entity = entity;
	this.says = "&hellip;";
}
r.Inheritor(Model, r.Observer);
let mp = Model.prototype;
mp.say = function(msg) {
	this.says = msg;
	this.emit("spoke");
}
mp.is = function(){ return this.entity; }
mp.said = function(){ return this.says; }

let dog = new Model("Dog");
let cat = new Model("Cat");

/**
 * activity
 */
setTimeout(() => {
	dog.say("Woof woof!");
}, 2000);

setTimeout(() => {
	cat.say("Meow!");
}, 4000);


/*
███████ ██ ██   ████████ ███████ ██████  ███████      █████  ██████  ██████
██      ██ ██      ██    ██      ██   ██ ██          ██   ██ ██   ██ ██   ██
█████   ██ ██      ██    █████   ██████  ███████     ███████ ██████  ██████
██      ██ ██      ██    ██      ██   ██      ██     ██   ██ ██      ██
██      ██ ███████ ██    ███████ ██   ██ ███████     ██   ██ ██      ██
*/

// individual filter
function Filter(idx, label){
	this.idx = idx;
	this.label = label;
	this.active = false;
}
var fp = Filter.prototype;
fp.getKey = function(){ return this.idx; };
fp.getLabel = function(){ return this.label; };
fp.getActive = function(){ return this.active; };
fp.toggleActive = function(){ this.active = !this.active; };

// collection of filters
function Filters() {
	this.options = []
}
r.Inheritor(Filters, r.Observer);
var fp = Filters.prototype;
fp.add = function(f){
	var self = this,
			skipped = [];

	var iter = Array.isArray(f) ? f : [f];

	r.forEach(f, function(i,v){
		if(self.exists(v)){
			skipped.push(v);
		} else {
			self.options.push(v);
		}
	});

};
fp.exists = function(f){ return this.options.filter(fi => fi.getKey()===f.getKey()).length>0; }
fp.getFilters = function(){ return this.options; }
fp.toggleFilter = function(f){
	f.toggleActive();
	this.emit("filtertoggled", f);
}
fp.getActiveFilters = function(){ return this.options.filter(f => f.getActive()===true); };

var filters = new Filters();
filters.add([
	new Filter("smart","Smart dummy"),
	new Filter("dumb","Dumb dummy")
])

// content
function Text() {
	this.dumb = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error neque, assumenda quam quia dignissimos eligendi tenetur enim qui dolorum aspernatur dolorem incidunt quibusdam aperiam autem vel repellat saepe, eos dolore.";
	this.smart = "Just some smart text"
}
var tp = Text.prototype;
tp.getText = function(typ){
	var self = this;
	switch(typ){
		case "smart":
		case "dumb":
			return self[typ];
		default:
			return "";
	}
}

var text = new Text();
