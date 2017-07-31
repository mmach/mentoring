


const routes = [
    { url: './', template: null, templateUrl: 'app.html', id: "main" },
    { url: './sign-in', template: null, templateUrl: 'signin.html', id: "signin" },
    { url: './sign-up', template: '<h1>test</h1>', templateUrl: null }
];

window.onload = function () {
	
    CompLib()
        .createRoot('app')
        .routes(routes)
        .component('test', {
            template: `<div ><AnotherComponent href="{{href}}">{{component}}</AnotherComponent>{{text}}</div>`,
            templateHtml: null,
            beforeMount: function (app, element) {
            }
        })
        .component(`AnotherComponent`, {
            template: `<a href="{{href}}">{{text}}</a>`,
            beforeMount: function (app, element) {
              //  console.log(app);
              //  console.log(element);
            }
        }).run();
}