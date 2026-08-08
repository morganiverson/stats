const template = document.createElement("template");

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
        </style>

        <span id="menu-holder" dir="${dir}">
        <ul>
            <li id="home" ${current == "home" ? "current" : ""} class = "menu-item"><a href="./index.html">Home</a></li>
            <li id = "03avg" ${current == "03avg" ? "current" : ""} class = "menu-item"><a href="./03average.html">0-3 Averages</a></li>
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