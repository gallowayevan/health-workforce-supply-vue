import Vue from 'vue';
import Vuex from 'vuex';
import { csv } from 'd3-request'
import { format } from 'd3-format'
import { median, range } from 'd3-array'
import env from './env'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        specialty: {
            name: "Name",
            code: "Code",
            profession: "Profession",
            specialty: "Specialty"
        },
        region: "North Carolina",
        hoveredYear: 0,
        variables: [],
        variable: "providerRate",
        year: 2017,
        data: [],
        loadFailed: false,
        aggregationLevel: "county",
        windowResize: 0,
        resizeTimeout: null,
        hoveredRegion: "",
        yearExtent: [2000, 2017],
        medianCountyData: [],
        medianAhecData: [],
        medianMedicaidData: [],
        dataLoaded: false,
        freezeScale: false,
        scaleYear: 2017,
        medicaidRegions: false,
        dataAvailable: true,
        layers: []
    },
    mutations: {
        changeData(state, data) {
            state.data = data;
        },
        changeHoveredYear(state, year) {
            state.hoveredYear = year;
        },
        changeHoveredRegion(state, region) {
            state.hoveredRegion = region;
        },
        changeYear(state, year) {
            // if (state.year != year) {
            //     state.year = year;
            // };

            state.year = year;

            // if (!state.freezeScale) {
            //     state.scaleYear = year;
            // }
        },
        changeScaleYear(state, year) {
            state.scaleYear = year;
        },
        changeVariable(state, variable) {
            if (state.variable != variable) {
                state.variable = variable;
            }
        },
        changeRegion(state, region) {
            if (state.region != region) {
                state.region = region;
            } else {
                state.region = "North Carolina"
            }

            updateVariables(state);
        },
        changeYearExtent(state, newExtent) {
            state.yearExtent = newExtent;
        },
        changeAggregation(state, newRegion) {
            state.region = "North Carolina";
            state.aggregationLevel = newRegion;
            updateVariables(state);
        },
        changeCountyMedians(state, data) {
            state.medianCountyData = data;
        },
        changeAHECMedians(state, data) {
            state.medianAhecData = data;
        },
        changeMedicaidMedians(state, data) {
            state.medianMedicaidData = data;
        },
        // changeWindowResize(state) {
        //     state.windowResize++;
        // },
        changeFreezeScale(state) {
            state.freezeScale = state.freezeScale ? false : true;
        },
        updateLayers(state, layers) {
            state.layers = layers;
        }
    },
    getters: {
        getDataByVariableForCurrentRegion: (state) => (variable) => {
            return state.data.filter(d => d.region == state.region).map(d => { return { year: d.year, value: d[variable] } })
        },
        getDataByVariableForNorthCarolina: (state) => (variable) => {
            if (variable != "total") {
                return state.data.filter(d => d.region == "North Carolina").map(d => { return { year: d.year, value: d[variable] } })
            } else if (state.aggregationLevel == "county") {
                return state.medianCountyData;
            } else if (state.aggregationLevel == "ahec") {
                return state.medianAhecData;
            } else {
                return state.medianMedicaidData;
            }
        }
        // getDataByCurrentVariableForCurrentRegionTypeCurrentYear: (state) => {
        //     //returns javascript Map!
        //     return new Map(state.data.filter(d => d.year == state.year && d.type == state.aggregationLevel).map(d => { return [d.region, d[state.variable]] }))
        // }
    },
    actions: {
        changeSpecialty: function ({ commit, state }, specialtyObject) {
            state.specialty = specialtyObject;

            csv(env("ROOT_API") + "region/spec" + format("03")(state.specialty.code) + ".csv", function (error, data) {
                if (error) {
                    state.loadFailed = true;
                } else {
                    state.loadFailed = false;
                    let yearMin = 4000;
                    let yearMax = 0;

                    let medicaidRegions = false;

                    data.forEach(function (d) {
                        d.total = +d.total;
                        d.year = +d.year;
                        d.providerRate = +d.providerRate;

                        if (d.type == "medicaid") medicaidRegions = true;

                        //calculate extent of years available
                        yearMax = d.year > yearMax ? d.year : yearMax;
                        yearMin = d.year < yearMin ? d.year : yearMin;

                        state.variables.forEach(function (e) {
                            data[e] = +data[e];
                        });
                    });

                    //Filter out physician and PA specialty data before 2013
                    //Should eventually just filter out of base data
                    if ((state.specialty.profession == "Physician" || state.specialty.profession == "Physician Assistant")
                        && state.specialty.profession != state.specialty.specialty) {
                        data = data.filter(e => e.year >= 2013);
                    }

                    //calculate medians for each year for total spark charts
                    const yearRange = range(yearMin, yearMax + 1);

                    const countyMedians = yearRange.map(function (d) {
                        const currMedian = median(data, e => e.year == d && e.type == "county" ? e.total : NaN)
                        return { year: d, value: currMedian }
                    });

                    const ahecMedians = yearRange.map(function (d) {
                        const currMedian = median(data, e => e.year == d && e.type == "ahec" ? e.total : NaN)
                        return { year: d, value: currMedian }
                    });

                    const medicaidMedians = yearRange.map(function (d) {
                        const currMedian = median(data, e => e.year == d && e.type == "medicaid" ? e.total : NaN)
                        return { year: d, value: currMedian }
                    });

                    state.medicaidRegions = medicaidRegions;

                    commit('changeCountyMedians', countyMedians);
                    commit('changeAHECMedians', ahecMedians);
                    commit('changeMedicaidMedians', medicaidMedians);
                    commit('changeData', data);
                    commit('changeYear', yearMax);
                    commit('changeScaleYear', yearMax);
                    commit("changeYearExtent", [yearMin, yearMax]);

                    updateVariables(state);

                    state.dataLoaded = true;

                }
            })
        }
    }
});

function updateVariables(state) {
    //Need to check that variables are all worth showing
    const defaultArray = [
        "providerRate",
        "total",
        "percentFemale",
        "percentAge",
        "percentUnderrepresented"
    ];

    const testData = state.data.filter(d => d.region == state.region);
    state.variables = defaultArray.filter(function (el) {
        return testData.filter(d => d[el] == "NA" || d[el] < 0 || !d.hasOwnProperty(el)).length == 0;
    });

    //Check that current variable is in the set of variables in the new data
    if (state.variables.indexOf(state.variable) == -1) {
        state.variable = "providerRate";
    }

}
