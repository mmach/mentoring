
'use strict';
const CompLib = require('./architecture.js');
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