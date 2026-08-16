const template = document.createElement("template");
const onUndoAttr = "onundo";

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

const getButtons = (options) => {
    return options.map(option => {
            var option_details = supported_options[option];
            if (option_details == undefined) {
                return undefined;
            }
            console.log("option_details -> ", option_details);
            return `<div><span 
                    id="${option_details.id}"
                    class="${option_details.icon_class}">
                        ${option_details.icon}
                    </span></div>`
        })
        .filter(v => v != undefined)
        .join(" ");
;
}

const generateOptionDetails = (options) => {
    return Array.from(options).map(option => {
        return supported_options[option];
    }).filter(val => val != undefined);

}

const getTemplate = (options) => {
    console.log("optionDetails -> ", generateOptionDetails(options))
    console.log("buttons -> ", getButtons(options))

   return `<div id="options">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${google_material_icon_names}"/>
        ${getButtons(this.options)}
        </div>
    </div>`
}

const generateOptionsList = (element) => {
    var options = [];

    console.log(element)

    console.log(element.getAttribute(onUndoAttr))
    var onUndo = element.getAttribute(onUndoAttr);
    if (onUndo != undefined) {
        options.push({"id": "undo", "on_click_event": onUndo});
    } else {
        console.warn("onUndo not defined")
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
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        console.log(this);
    }

    get options() {
        return Array.from(this.getAttribute('options').split(","));
    }
    set options(o) {
        this.setAttribute("options", o);
    }

    get optionDetails() {
        var optionArr = Array.from(this.getAttribute('options').split(","));
        return generateOptionDetails(optionArr);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = getTemplate(this.options);
    }

    static observedAttributes = ["options", onUndoAttr];

    attributeChangedCallback() {
        this.shadowRoot.innerHTML = getTemplate(this.options);
    }
}

window.customElements.define("options-bar", OptionsBar);