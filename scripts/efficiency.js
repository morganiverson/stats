import Utils from "./common.js";
import FeatureList from "./feature_list.js";

const btn_ref = "btn-atmp3";
const btn_click_event = "pointerdown";

window.onload = () => {
    console.log("Features => ", FeatureList);

    const err_msg_holder = document.getElementById("error-msg");
    const eff_value_holder = document.getElementById("eff-value");
    const attempt_value_holder = document.getElementById("att-value")

    const neutral_att_holder = document.getElementById("neu-count");
    const negative_att_holder = document.getElementById("neg-count");
    const positive_att_holder = document.getElementById("pos-count");

    Utils.checkIfDefined(err_msg_holder, "err_msg_holder", err_msg_holder);
    Utils.checkIfDefined(eff_value_holder, "eff_value_holder", err_msg_holder)
    Utils.checkIfDefined(attempt_value_holder, "attempt_value_holder", err_msg_holder)
    Utils.checkIfDefined(neutral_att_holder, "neutral_att_holder", err_msg_holder);
    Utils.checkIfDefined(negative_att_holder, "negative_att_holder", err_msg_holder);
    Utils.checkIfDefined(positive_att_holder, "positive_att_holder", err_msg_holder);

    var history = [];

    const btn_list = document.getElementsByClassName(btn_ref);
    Utils.checkIfDefined(btn_list, "btn_list", err_msg_holder)

    Array.from(btn_list).forEach(element => {
        element.addEventListener(btn_click_event, () => {
            var value = parseInt(element.value);
            history.push(value);
            
            update_efficiency_display(history, 
                neutral_att_holder,
                negative_att_holder,
                positive_att_holder,
                attempt_value_holder,
                eff_value_holder);
        });
    });
    
    const reset_btn = document.getElementById("reset-btn");
    Utils.checkIfDefined(reset_btn, "reset_btn", err_msg_holder);
    reset_btn.addEventListener(btn_click_event, () => {
        if (history.length > 0) {
            history = [];
            update_efficiency_display(history,
                neutral_att_holder,
                negative_att_holder,
                positive_att_holder,
                attempt_value_holder,
                eff_value_holder);
        }
    });

    if (FeatureList.showDescriptorOption) {
        const show_desc_box = document.getElementById("show-desc");
        Utils.checkIfDefined(desc_box, "desc_box", err_msg_holder);
        const desc_box = document.getElementById("desc");
        Utils.checkIfDefined(show_desc_box, "show_desc_box", err_msg_holder);

        show_desc_box.addEventListener(btn_click_event, (e) => {
            if (show_desc_box.innerHTML == "person") {
                desc_box.style.display = "block";
                show_desc_box.innerHTML = "person_cancel";
            } else {
                desc_box.style.display = "none";
                show_desc_box.innerHTML = "person";
            }
        });
    }

    const undo_btn = document.getElementById("undo-btn");
    Utils.checkIfDefined(undo_btn);
    undo_btn.addEventListener(btn_click_event, (e) => {
        if (history.length > 0) {
            var last_attempt = history.pop();
            console.log("Undoing last attempt: [" + last_attempt + "]\nAttempts: [" + history + "]");
            update_efficiency_display(history,
                neutral_att_holder,
                negative_att_holder,
                positive_att_holder,
                attempt_value_holder,
                eff_value_holder);
        }
    });
}

const countAttempts = (history) => {
    var attempt_map = {"+1": 0, "-1": 0, "0": 0, "ttl": 0, "eff": (0).toFixed(3)};
    var sum = 0;
    if (history.length == 0) {
        return attempt_map;
    }
    Array.from(history).forEach(attempt => {
        attempt_map["ttl"] = attempt_map["ttl"] + 1;
        if (attempt == 1) {
            attempt_map["+1"] = attempt_map["+1"] + 1;
            sum = sum + 1;
        } else if (attempt == -1) {
            attempt_map["-1"] = attempt_map["-1"] + 1;
            sum = sum - 1;
        } else {
            attempt_map["0"] = attempt_map["0"] + 1;
        }
    });
    attempt_map["eff"] = (sum / attempt_map["ttl"]).toFixed(3);
    return attempt_map;
}

const update_efficiency_display = (history, neutralDisplay, negativeDisplay, postiveDisplay, attemptDisplay, efficiencyDisplay) => {
    console.log("+1 attempt, " + history[history.length - 1] + " rating");
    
    var attempt_dist = countAttempts(history);
    var postive = attempt_dist["+1"];
    var negative = attempt_dist["-1"];
    var neutral = attempt_dist["0"];
    var efficiency = attempt_dist["eff"];
    var ttl_attempts = attempt_dist["ttl"];

    // Update Attempt Count
    neutralDisplay.innerHTML = attempt_dist["0"];
    negativeDisplay.innerHTML = attempt_dist["-1"];
    postiveDisplay.innerHTML = attempt_dist["+1"];         
            
    //Update Display Totals
    attemptDisplay.innerHTML = attempt_dist["ttl"];
    efficiencyDisplay.innerHTML = attempt_dist["eff"];

    console.log("(eff) = " + attempt_dist["eff"]
        + "\n(+1) = " + attempt_dist["+1"]
        + "\n(0) = " + attempt_dist["0"]
        +"\n(-1) = " + attempt_dist["-1"]
        + "\n(att) = " + attempt_dist["ttl"]
        + "\nhistory = [" + history + "]");
}