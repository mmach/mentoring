const routes = [
    { url: './', template: null, templateUrl: 'main.html', id:"main" },
    { url: './sign-in', template: null, templateUrl: 'signin.html',id:"main" },
    { url: './sign-up', template: '<h1>test</h1>', templateUrl: null }
];

const loadContent = (path,id = null,type="html") => {
    let element = 'app'
    if (id != null) element = id;
    return fetch(path).then(
        function (response) {
            //check if this is text type or blob... then depend on strategy we can append img, canvas to our blob etc
            return response.text();
        })
        .then(container => document.getElementById(element).innerHTML = container)
        .catch(err => console.log('NO file', err));
}

 document.addEventListener("click", function (e) {
        if (e.srcElement.tagName != 'A') { return; };
        const href = e.srcElement.getAttribute("href");
        const routeElement = routes.filter((a) => {
            if (a.url != href) return false;
            return true;
        })[0];

          e.preventDefault();
          routeChange().setContent(routeElement);
    }, false);


const routeChange = () => {

    const setContent = (element) => {
        if (element.template == null) loadContent(element.templateUrl,element.id);
        else document.getElementById(element.id).innerHTML = element.template;
        history.pushState('', "SPA", element.url);
    };
   
    return Object.assign({},
        {
            setContent: (element) => setContent(element),
            //loadSrc: (path) => loadContent(path)
        });

};

window.onload = function () {
    routeChange().setContent(routes[0]);
}



