const routes = [
    { url: './', template: '<h1>Home</h1>' },
    { url: './sign-in', template: '<h1>Sign-In</h1>' },
    { url: './sign-up', template: '<h1>Sign-Up</h1>' }
];

document.addEventListener("click", function (e) {
    if (e.srcElement.tagName != 'A') { return; };
    const href = e.srcElement.getAttribute("href");
    const routeElement = routes.filter((a) => {
        if (a.url != href) return false;
        return true;
    })[0];
    // document.getElementById('app').innerHTML = routeElement.template;
    // history.pushState(routeElement.template,"SPA",routeElement.url);
    setContent(routeElement)
    e.preventDefault();
}, false);

const setContent = (element) => {
    document.getElementById('app').innerHTML = element.template;
    history.pushState(element.template, "SPA", element.url);
}

window.onload = function () {
    setContent(routes[0]);
}