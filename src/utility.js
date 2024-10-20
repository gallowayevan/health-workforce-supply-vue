import { format } from 'd3-format'

const formatters = {
    rate: format(".3r"),
    percent: format(".1%"),
    total: format(",.0f")
}

export function formatter(type) {
    let currentType = "percent";

    if (type == "provider_rate") {
        currentType = "rate"
    } else if (type == "total") {
        currentType = "total"
    }

    return function (value) { return value === null | value < 0 ? "NA" : formatters[currentType](value) };
}

export function sortStrings(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}

export function wrap(config = {}) {

    let { text, maxCharsPerLine = 65,
        lineHeight = 1.3 } = config;

    if (typeof config == "string") text = config;

    let words = text.trim().split(/\s+/).reverse(),
        word,
        x = 0,
        dy = 0,
        lineNumber = 0,
        line = [],
        allTogether = ``;

    while (word = words.pop()) {

        line.push(word);
        let testLineLength = line.join(" ").length;

        if (testLineLength > maxCharsPerLine) {
            line.pop();

            let tspan = `<tspan x=${x} dy=${dy}em>${line.join(" ")}</tspan>`;

            allTogether = `${allTogether}${tspan}`;

            line = [word];
            dy = lineHeight;
        }
    }

    let tspan = `<tspan x=${x} dy=${dy}em>${line.join(" ")}</tspan>`;
    allTogether = `${allTogether}${tspan}`;

    return allTogether;
}

export const medicaidRegionName = new Map([["Medicaid Region 1", "Western NC (1)"], ["Medicaid Region 2", "Northwest / Triad (2)"], ["Medicaid Region 3", "Southcentral / Charlotte (3)"], ["Medicaid Region 4", "Piedmont / Triangle (4)"], ["Medicaid Region 5", "Southeast / Wilmington (5)"], ["Medicaid Region 6", "Eastern NC (6)"]]);
