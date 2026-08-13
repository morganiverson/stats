const Utils = {
    "checkIfDefined": checkIfDefined
}

const checkIfDefined = (val, name, errorDiv) => {
    if (val == undefined) {
        errorDiv.innerHTML = "Cannot identify " + name;
        console.error("Cannot identify " + name);
    }
}

export default Utils;