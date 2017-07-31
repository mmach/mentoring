//const Helper = require('./helper.js');

/// I know that there is so much eval i can change if i will find solution for create regex with globally flag
const CompLib = function (state) {
    const _state = Object.assign({}, state);
    //////////////////////////////////////////// function the same as in previous laboratories with click event preventDefault
    const eventClickListner = () => {
        document.addEventListener("click", function (e) {
            if (e.srcElement.tagName != 'A') { return; };
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
            var doc = new DOMParser().parseFromString(container, 'text/xml');
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
                let element2 = Helper().FindByAttributeValue('a-id', destiny);
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
        let element = Helper().FindByAttributeValue('m-id', component.guid);
        //there is possible that during change route element is clear and can't be found
        if (element != null) {
            const attributes = [];
            //megic with move attributes value in component to template places({{attribute name}} put attribute.value )
            component.template = component.template.replace(eval(/<*[ ,>]/), ` a-id=${component.guid} `)
            Array.from(element.attributes).map(function (item) {
                component.template = component.template.replace(eval(`/{{${item.name}}}/`), `${item.value}`)
                attributes.push(item);
            });
            component.template = component.template.replace(/{{text}}/, `${element.innerText}`)
            component.beforeMount(this, component);
            preProcessHtml(component.guid, null, component.template, true);
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