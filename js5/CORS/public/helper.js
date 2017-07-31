const Helper = function(){
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

