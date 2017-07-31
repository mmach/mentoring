/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//const Helper = require('./helper.js');


const Helper =__webpack_require__(1); 
/// I know that there is so much eval i can change if i will find solution for create regex with globally flag
const CompLib = function (state) {
    const _state = Object.assign({}, state);
    //////////////////////////////////////////// function the same as in previous laboratories with click event preventDefault
    const eventClickListner = () => {
        document.addEventListener("click", function (e) {
            if (e.srcElement.tagName != 'A') { return; }
            const href = e.srcElement.getAttribute("href");
            const routeElement = _state.routes.filter((a) => {
                if (a.url != href) return false;
                return true;
            })[0];
            e.preventDefault();
            preProcessHtml('app', routeElement.templateUrl);
            history.pushState('', "SPA", routeElement.url);
        }, false);
    }
    //////////////////////////////////////////
    const preProcessHtml = (destiny, path = null, templateHtml = null, replaceElement = false) => {
        const htmlProcessing = (container) => {
            let html = container;
            //var doc = new DOMParser().parseFromString(container, 'text/xml');
            _state.component.map(m => {
                const matches = html.match(eval(`/<${m.name}[ ,>]/g`));
                if (matches != null) {
                    matches.map((element) => {
                        m.guid = Helper().guid();
                        html = html.replace(eval(`/<${m.name}(?!.m-id)/`), `<${m.name} m-id=${m.guid}`);
                        state.preProcessStack.push(Object.assign({}, m));
                        //
                    });  // ;
                }
            });
            if (replaceElement == false) {
                document.getElementById(destiny).innerHTML = html;
            } else {

                Helper().FindByAttributeValue('m-id', destiny).parentNode.innerHTML += html;
                const element2 = Helper().FindByAttributeValue('a-id', destiny);
                Helper().FindByAttributeValue('m-id', destiny).parentNode.replaceChild(element2, Helper().FindByAttributeValue('m-id', destiny));
            }
        }
        // check if path to template is null otherwise user send template as string
        if (path != null) {
            fetch(path).then(
                function (response) {
                    return response.text();
                })
                .then(container => {
                    htmlProcessing(container);
                })
                .catch(err => console.log('No file', err));
        } else if (templateHtml != null) {
            htmlProcessing(templateHtml);
        }
        return;
    }

    //function run in interval loop for checking if some new component was appear in html file and then process it 
    const runComponent = (component) => {
        // find component to replace and get all attributes from it 
        const element = Helper().FindByAttributeValue('m-id', component.guid);
        //there is possible that during change route element is clear and can't be found
        if (element != null) {
            const attributes = [];
            //megic with move attributes value in component to template places({{attribute name}} put attribute.value )
            component.template = component.template.replace(eval(/<*[ ,>]/), ` a-id=${component.guid} `)
            Array.from(element.attributes).map(function (item) {
                component.template = component.template.replace(eval(`/{{${item.name}}}/`), `${item.value}`)
                attributes.push(item);
            });
            component.template = component.template.replace(/{{text}}/, `${element.innerText}`);
            
            
            new Promise(function(resolve) {
                component.beforeMount(this,component);
                return resolve();

            }).then(()=>{
                return preProcessHtml(component.guid, null, component.template, true);
            }).then(() => {
               return  component.binding(this,component,Helper().FindByAttributeValue('a-id', component.guid));
            });
            
        }
    }
    return {

        //init
        createRoot: (name) => {
            _state.applicationName = name;
            _state.routeStack = [];
            _state.componentStack = [];
            _state.preProcessStack = [];
            _state.component = [];
            _state.routes = []
            return Object.assign({}, CompLib(_state));
        },
        //Place where you can add route table
        routes: (route) => {
            route.map(function (element) {
                _state.routes.push(element);
            })
            return Object.assign({}, CompLib(_state));
        },
        //function for declare component
        component: (name, componentItem) => {
            const compItem = Object.assign({}, componentItem, { name: name });
            _state.component.push(compItem)
            return Object.assign({}, CompLib(_state));
        },
        //run application preprocess for main html file and  loop in interval 
        run: () => {
            // document.body.innerHTML+=`<div id=${_state.applicationName}-pre></div>`;
            preProcessHtml(_state.applicationName, state.applicationName + ".html");
            //loop for checking if something new was appear  in preprocess component stack ( i could use event but it's sth very simmilar )
            setInterval(function () {
                while (state.preProcessStack.length > 0) {
                    runComponent(state.preProcessStack.pop())
                }
            }, 200);
            //run is running only one time in my application it's mean that event listner is run only one time too
            eventClickListner();
        }
    }
}
/*

Description of architecture:

1. load html file and run interval for checking if preProcessComponentStack is not empty
2. find all tags which are the same as my componentStack
3. add special guid for this element in html and add comoponent to  prePreocessComponentStack wich special the same guid as in html  ( m-id= guid)
4. load template from component and add the same guid 
5. replace all templates places {{attributeTag}} as correct values
6. return to 2 step till preProcessStack is empty


to improve ... use html selector than find element in loop
*/

module.exports = CompLib;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(){
    return {
        toArray: (obj) => {
            var array = [];
            // iterate backwards ensuring that length is an UInt32
            for (var i = obj.length >>> 0; i--;) {
                array[i] = obj[i];
            }
            return array;
        },
        guid: () => {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        },
        FindByAttributeValue: (attribute, value) => {
            const All = document.getElementsByTagName('*');
            for (let i = 0; i < All.length; i++) {
                if (All[i].getAttribute(attribute) == value) { return All[i]; }
            }
        },
        htmlToElement: (parent, html) => {
            var template = parent.createElement('template');
            template.innerHTML = html;
            return template.content.firstChild;
        }

    }
}



/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const CompLib = __webpack_require__(0);
const routes = [
    { url: './', template: null, templateUrl: 'app.html', id: "main" },
    { url: './sign-in', template: null, templateUrl: 'signin.html',id:"main" },
    { url: './sign-up', template: '<h1>test</h1>', templateUrl: null }
];
function fetchAutocomplete(autocomplete) {
    fetch(`api/search`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ query: autocomplete.input.value })
    }
    ).then(function (response) {
        return response.text();
    })
        .then(container => {
            autocomplete.list = JSON.parse(container);
        });
}
window.onload = function () {

    CompLib()
        .createRoot('app')
        .routes(routes)
        .component('Search', {
            template: `<input id={{id}} class="dropdown-input" placeholder="{{placeholder}}"
                            data-list="Ada, Java, JavaScript, Brainfuck, LOLCODE, Node.js, Ruby on Rails" />`,
            templateHtml: null,
            beforeMount: function (app, component) {
                // place to edit html template before replace 
            },
            binding: (app, component, element) => {
                var autocomplete = new Awesomplete(element, {

                });

                element.addEventListener("change", function (e) {
                    fetchAutocomplete(autocomplete);
                });
            }
        })
        .run();
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */

(function () {

var _ = function (input, o) {
	var me = this;

	// Setup

	this.isOpened = false;

	this.input = $(input);
	this.input.setAttribute("autocomplete", "off");
	this.input.setAttribute("aria-autocomplete", "list");

	o = o || {};

	configure(this, {
		minChars: 2,
		maxItems: 10,
		autoFirst: false,
		data: _.DATA,
		filter: _.FILTER_CONTAINS,
		sort: o.sort === false ? false : _.SORT_BYLENGTH,
		item: _.ITEM,
		replace: _.REPLACE
	}, o);

	this.index = -1;

	// Create necessary elements

	this.container = $.create("div", {
		className: "awesomplete",
		around: input
	});

	this.ul = $.create("ul", {
		hidden: "hidden",
		inside: this.container
	});

	this.status = $.create("span", {
		className: "visually-hidden",
		role: "status",
		"aria-live": "assertive",
		"aria-relevant": "additions",
		inside: this.container
	});

	// Bind events

	$.bind(this.input, {
		"input": this.evaluate.bind(this),
		"blur": this.close.bind(this, { reason: "blur" }),
		"keydown": function(evt) {
			var c = evt.keyCode;

			// If the dropdown `ul` is in view, then act on keydown for the following keys:
			// Enter / Esc / Up / Down
			if(me.opened) {
				if (c === 13 && me.selected) { // Enter
					evt.preventDefault();
					me.select();
				}
				else if (c === 27) { // Esc
					me.close({ reason: "esc" });
				}
				else if (c === 38 || c === 40) { // Down/Up arrow
					evt.preventDefault();
					me[c === 38? "previous" : "next"]();
				}
			}
		}
	});

	$.bind(this.input.form, {"submit": this.close.bind(this, { reason: "submit" })});

	$.bind(this.ul, {"mousedown": function(evt) {
		var li = evt.target;

		if (li !== this) {

			while (li && !/li/i.test(li.nodeName)) {
				li = li.parentNode;
			}

			if (li && evt.button === 0) {  // Only select on left click
				evt.preventDefault();
				me.select(li, evt.target);
			}
		}
	}});

	if (this.input.hasAttribute("list")) {
		this.list = "#" + this.input.getAttribute("list");
		this.input.removeAttribute("list");
	}
	else {
		this.list = this.input.getAttribute("data-list") || o.list || [];
	}

	_.all.push(this);
};

_.prototype = {
	set list(list) {
		if (Array.isArray(list)) {
			this._list = list;
		}
		else if (typeof list === "string" && list.indexOf(",") > -1) {
				this._list = list.split(/\s*,\s*/);
		}
		else { // Element or CSS selector
			list = $(list);

			if (list && list.children) {
				var items = [];
				slice.apply(list.children).forEach(function (el) {
					if (!el.disabled) {
						var text = el.textContent.trim();
						var value = el.value || text;
						var label = el.label || text;
						if (value !== "") {
							items.push({ label: label, value: value });
						}
					}
				});
				this._list = items;
			}
		}

		if (document.activeElement === this.input) {
			this.evaluate();
		}
	},

	get selected() {
		return this.index > -1;
	},

	get opened() {
		return this.isOpened;
	},

	close: function (o) {
		if (!this.opened) {
			return;
		}

		this.ul.setAttribute("hidden", "");
		this.isOpened = false;
		this.index = -1;

		$.fire(this.input, "awesomplete-close", o || {});
	},

	open: function () {
		this.ul.removeAttribute("hidden");
		this.isOpened = true;

		if (this.autoFirst && this.index === -1) {
			this.goto(0);
		}

		$.fire(this.input, "awesomplete-open");
	},

	next: function () {
		var count = this.ul.children.length;
		this.goto(this.index < count - 1 ? this.index + 1 : (count ? 0 : -1) );
	},

	previous: function () {
		var count = this.ul.children.length;
		var pos = this.index - 1;

		this.goto(this.selected && pos !== -1 ? pos : count - 1);
	},

	// Should not be used, highlights specific item without any checks!
	goto: function (i) {
		var lis = this.ul.children;

		if (this.selected) {
			lis[this.index].setAttribute("aria-selected", "false");
		}

		this.index = i;

		if (i > -1 && lis.length > 0) {
			lis[i].setAttribute("aria-selected", "true");
			this.status.textContent = lis[i].textContent;

			// scroll to highlighted element in case parent's height is fixed
			this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;

			$.fire(this.input, "awesomplete-highlight", {
				text: this.suggestions[this.index]
			});
		}
	},

	select: function (selected, origin) {
		if (selected) {
			this.index = $.siblingIndex(selected);
		} else {
			selected = this.ul.children[this.index];
		}

		if (selected) {
			var suggestion = this.suggestions[this.index];

			var allowed = $.fire(this.input, "awesomplete-select", {
				text: suggestion,
				origin: origin || selected
			});

			if (allowed) {
				this.replace(suggestion);
				this.close({ reason: "select" });
				$.fire(this.input, "awesomplete-selectcomplete", {
					text: suggestion
				});
			}
		}
	},

	evaluate: function() {
		var me = this;
		var value = this.input.value;

		if (value.length >= this.minChars && this._list.length > 0) {
			this.index = -1;
			// Populate list with options that match
			this.ul.innerHTML = "";

			this.suggestions = this._list
				.map(function(item) {
					return new Suggestion(me.data(item, value));
				})
				.filter(function(item) {
					return me.filter(item, value);
				});

			if (this.sort !== false) {
				this.suggestions = this.suggestions.sort(this.sort);
			}

			this.suggestions = this.suggestions.slice(0, this.maxItems);

			this.suggestions.forEach(function(text) {
					me.ul.appendChild(me.item(text, value));
				});

			if (this.ul.children.length === 0) {
				this.close({ reason: "nomatches" });
			} else {
				this.open();
			}
		}
		else {
			this.close({ reason: "nomatches" });
		}
	}
};

// Static methods/properties

_.all = [];

_.FILTER_CONTAINS = function (text, input) {
	return RegExp($.regExpEscape(input.trim()), "i").test(text);
};

_.FILTER_STARTSWITH = function (text, input) {
	return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
};

_.SORT_BYLENGTH = function (a, b) {
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b? -1 : 1;
};

_.ITEM = function (text, input) {
	var html = input.trim() === '' ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
	return $.create("li", {
		innerHTML: html,
		"aria-selected": "false"
	});
};

_.REPLACE = function (text) {
	this.input.value = text.value;
};

_.DATA = function (item/*, input*/) { return item; };

// Private functions

function Suggestion(data) {
	var o = Array.isArray(data)
	  ? { label: data[0], value: data[1] }
	  : typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

	this.label = o.label || o.value;
	this.value = o.value;
}
Object.defineProperty(Suggestion.prototype = Object.create(String.prototype), "length", {
	get: function() { return this.label.length; }
});
Suggestion.prototype.toString = Suggestion.prototype.valueOf = function () {
	return "" + this.label;
};

function configure(instance, properties, o) {
	for (var i in properties) {
		var initial = properties[i],
		    attrValue = instance.input.getAttribute("data-" + i.toLowerCase());

		if (typeof initial === "number") {
			instance[i] = parseInt(attrValue);
		}
		else if (initial === false) { // Boolean options must be false by default anyway
			instance[i] = attrValue !== null;
		}
		else if (initial instanceof Function) {
			instance[i] = null;
		}
		else {
			instance[i] = attrValue;
		}

		if (!instance[i] && instance[i] !== 0) {
			instance[i] = (i in o)? o[i] : initial;
		}
	}
}

// Helpers

var slice = Array.prototype.slice;

function $(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
	return slice.call((con || document).querySelectorAll(expr));
}

$.create = function(tag, o) {
	var element = document.createElement(tag);

	for (var i in o) {
		var val = o[i];

		if (i === "inside") {
			$(val).appendChild(element);
		}
		else if (i === "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);
		}
		else if (i in element) {
			element[i] = val;
		}
		else {
			element.setAttribute(i, val);
		}
	}

	return element;
};

$.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
};

$.fire = function(target, type, properties) {
	var evt = document.createEvent("HTMLEvents");

	evt.initEvent(type, true, true );

	for (var j in properties) {
		evt[j] = properties[j];
	}

	return target.dispatchEvent(evt);
};

$.regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

$.siblingIndex = function (el) {
	/* eslint-disable no-cond-assign */
	for (var i = 0; el = el.previousElementSibling; i++);
	return i;
};

// Initialization

function init() {
	$$("input.awesomplete").forEach(function (input) {
		new _(input);
	});
}

// Are we in a browser? Check for Document constructor
if (typeof Document !== "undefined") {
	// DOM already loaded?
	if (document.readyState !== "loading") {
		init();
	}
	else {
		// Wait for it
		document.addEventListener("DOMContentLoaded", init);
	}
}

_.$ = $;
_.$$ = $$;

// Make sure to export Awesomplete on self when in a browser
if (typeof self !== "undefined") {
	self.Awesomplete = _;
}

// Expose Awesomplete as a CJS module
if (typeof module === "object" && module.exports) {
	module.exports = _;
}

return _;

}());


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(0);
__webpack_require__(1);
__webpack_require__(3);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);