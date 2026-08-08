const template = document.createElement("template");

const menu_items = [
    {
        "id": "home",
        "link": "./index.html",
        "display_name": "Home"
    },
    {
        "id": "03avg",
        "link": "./03average.html",
        "display_name": "Average (0, 1, 2, 3)"
    },
    {
        "id": "eff",
        "link": "./efficiency.html",
        "display_name": "Efficiency (-1, 0, +1)"
    },
]

getMenuListItems = (items, current) => {
    let menuHtml = "";
        menu_items.forEach(item => {
            menuHtml = menuHtml + 
                        `<li id = "${item.id}" ${current == item.id ? "current" : ""} class = "menu-item">
                    <a href="${item.link}">${item.display_name}</a>
                </li>
                `;
    });
    return menuHtml;
}
getTemplate = (dir,current) => `
        <style>
            ul {
                list-style: none;
                width: 100vw;
                background-color: #333333;
                color: white;
                padding: 0;
                margin: 0;
                overflow: hidden;
            }
            li a, li a:visited {
                color: white;
                text-decoration: none;
            }
            
            ul li[current], ul li[current]:hover {
                background-color: grey;
            }
            ul li {
                padding: 10px;

            }
            ul li:hover {
                background-color: black;
            }
        
            #menu-holder[dir="horizontal"] ul li {
                float: left;
            }
            #menu-holder {
                padding: 0px;
                margin: 0px;
            }
        </style>

        <span id="menu-holder" dir="${dir}">
        <ul>
            ${getMenuListItems(menu_items, current)}
        </ul>
        </span>
        `;


class Menu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.dir = this.getAttribute("dir");
    }


    get dir() {
        return this.getAttribute('dir');
    }
    set dir(d) {
        this.setAttribute('dir', String(d));
    }

    get current() {
        return this.getAttribute('current');
    }
    set current(c) {
        this.setAttribute('current', String(c));
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = getTemplate(this.dir, this.current);
    }

    static observedAttributes = ["dir", "current"];

    attributeChangedCallback() {
        this.shadowRoot.innerHTML = getTemplate(this.dir, this.current);

    }
}

window.customElements.define("stats-menu", Menu);