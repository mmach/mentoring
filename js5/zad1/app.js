


const routes = [
    { url: './', template: null, templateUrl: 'app.html', id: "main" }
];

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
            binding:(app,component,element)=>{
                var tmp = new Awesomplete(element, {
                    list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"]
                });
            }
        })
        .run();
}