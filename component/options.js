const supported_options = {
        "reset": {
            "id": "reset-btn",
            "icon_class": "material-symbols-outlined",
            "icon": "delete"
        },
        "undo": {
            "id": "undo-btn",
            "icon_class": "material-symbols-outlined",
            "icon": "undo"

        }
}

const google_material_icon_names="delete,person,person_cancel,undo";

const getTemplate = (options) => {
   return `<div id="options">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${google_material_icon_names}"/>

        ${
            Array.from(options).map(option => {
                return getButton(option.id, option.on_click_event);
            })
        }
        </div>

    </div>`
} 

const getButton = (id, on_click_event) => {
    var option_details = supported_options[id];
    if (option_details == undefined) {
        return ``;
    }
    return `<div><span 
        id="${option_details.id}"
        onpointerdown="${on_click_event}"
        class="${option_details.icon_class}">
            ${option_details.icon}
        </span></div>`
}

const generateOptionsList = (element) => {
    var options = [];

    var onUndo = element.getAttribute("onUndo");
    if (onUndo != undefined) {
        options.push({"id": "undo", "on_click_event": onUndo});
    }

    var onReset = element.getAttribute("onReset");
    if (onReset != undefined) {
        options.push({"id": "reset", "on_click_event": onReset});
    }

    return options;
}


class OptionsBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.options = generateOptionsList(this);
    }


    // get options() {
    //     return this.getAttribute('options');
    // }
    // set options(o) {
    //     this.setAttribute('options', Array.from(o));
    // }

    connectedCallback() {
        this.shadowRoot.innerHTML = getTemplate(this.options);
    }

    static observedAttributes = ["options"];

    attributeChangedCallback() {
        this.shadowRoot.innerHTML = getTemplate(this.options);

    }
}

window.customElements.define("options-bar", OptionsBar);