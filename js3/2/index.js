const routes = [
    { url: './', template: null, templateUrl: 'main.html' },
    { url: './sign-in', template: null, templateUrl: 'signin.html' },
    { url: './sign-up', template: '<h1>test</h1>', templateUrl: null }
];

 document.addEventListener("click", function (e) {
        if (e.srcElement.tagName != 'A') { return; };
        const href = e.srcElement.getAttribute("href");
        const routeElement = routes.filter((a) => {
            if (a.url != href) return false;
            return true;
        })[0];

        routeChange().setContent(routeElement);
        e.preventDefault();

    }, false);

const loadContent = (path,type="html", id = null) => {
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

const routeChange = () => {

    const setContent = (element) => {
        if (element.template == null) loadContent(element.templateUrl);
        else document.getElementById('app').innerHTML = element.template;
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



