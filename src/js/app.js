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
riot.mount("dog", {model: dog});

let cat = new Model("Cat");
riot.mount("cat", {model: cat});

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
function Filter(label){
	this.label = label;
	this.active = false;
}
var fp = Filter.prototype;
fp.getLabel = function(){ return this.label; };
fp.getActive = function(){ return this.active; };
fp.toggleActive = function(){
	this.active = !this.active;
	console.log("toggling");
};

// collection of filters
function Filters() {
	this.options = [
		new Filter("Smart dummy"),
		new Filter("Dumb dummy")
	]
}
r.Inheritor(Filters, r.Observer);
var fp = Filters.prototype;
fp.getFilters = function(){ return this.options; }
fp.toggleFilter = function(f){
	f.toggleActive();
	this.emit("toggled", f);
}

var filters = new Filters();
riot.mount("filters", {model: filters});

// content
function Text() {
	this.dummy = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error neque, assumenda quam quia dignissimos eligendi tenetur enim qui dolorum aspernatur dolorem incidunt quibusdam aperiam autem vel repellat saepe, eos dolore.";
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
riot.mount("text", {model: text});
