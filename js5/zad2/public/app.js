


const routes = [
    { url: './', template: null, templateUrl: 'app.html', id: "main" }
];
function fetchAutocomplete(autocomplete)
{
     fetch(`api/search?query=${autocomplete.input.value}`, {
            }).then(function(response) {
                   return response.text();
                })
                .then(container => {
                    autocomplete.list=JSON.parse(container);
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
            binding:(app,component,element)=>{
                var autocomplete = new Awesomplete(element, {
                    
                });
               //http://localhost:8080/

           element.addEventListener("keyup", function (e) {          
               fetchAutocomplete(autocomplete);
        });
            }
        })
        .run();
}