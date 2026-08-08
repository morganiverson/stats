const valid_calculations = ["average", "efficiency", "attempts"];
const default_range = [0, 1, 2, 3]

const template = document.createElement("template");


const attributes = ["range", "show-button-counter", "calculations"];

const getRange = (calculations, rangeAttribute) => {
    var calcArr = Array.from(calculations);
    if (calcArr.indexOf("average") < 0 && calcArr.indexOf("efficiency") < 0) {
        console.error("Cannot calculate avergae and efficiency");
    }

    if (calcArr.indexOf("efficiency")) {
        return [-1, 0, 1];
    }
    if (calcArr.indexOf("average")) {
        if (rangeAttribute != undefined && Array.from(rangeAttribute)) {
            return Array.from(rangeAttribute.split(",")).map(val => parseInt(val));
        }
        return default_range;
    }
}

const isValidCalculation = (calculations) => {

}
class NamedStatRow extends HTMLElement {
    constructor() {
        super();
        this.calculations = Array.from(this.getAttribute("calculations").split(","));
        this.range = getRange(this.calculations, this.getAttribute("range"));
        this.show_btn_counter = (this.getAttribute("show_button_counter") == 'true');
    }

}