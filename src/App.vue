<template>
    <div id="app">
        <specialty-select></specialty-select>
        <div v-if="loadFailed" class="failed">We're sorry - we couldn't find that dataset. 
            Please try selecting another profession or try the same profession again.
            If the problem persists, contact us at <a href="mailto:hpds_online@unc.edu?subject=Problem%20with%20HPDS%20website">hpds_online@unc.edu</a>.
        </div>
        <div v-else>
            <div v-if="dataLoaded" class="scaling-svg-container" id="dashboard" style="padding-bottom: 62%">
                <svg class="scaling-svg dashboard" viewBox="0 0 960 600" >
                        <defs> <pattern id="NApattern" patternUnits="userSpaceOnUse" width="8" height="8"> <image xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgogIDxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyNmZmYnLz4KICA8cGF0aCBkPSdNMCAwTDggOFpNOCAwTDAgOFonIHN0cm9rZS13aWR0aD0nMC41JyBzdHJva2U9JyNhYWEnLz4KPC9zdmc+Cg==" x="0" y="0" width="8" height="8"> </image> </pattern> </defs>
                    <rect width=960 height=600 fill="#fff" @click="rectClicked"></rect>
                    <Map></Map>
                    <spark-bar-chart-group></spark-bar-chart-group>
                </svg>
            </div>

        </div>
       
            <div id="control-panel">
                <div id="yearSlider" ><div >Select a Year: {{year}}</div>
                    <input  :min="yearExtent[0]" :max="yearExtent[1]" step="1" :value="year" @input="updateYear" type="range">
                   <!-- <label for="scaleCheckBox"><input id="scaleCheckBox" type="checkbox" :value="$store.state.freezeScale" @input="$store.commit('changeFreezeScale')">Freeze Color Scale</label> -->
                 </div>
                <download-image-button></download-image-button>
                <download-data-button></download-data-button>
                <button type="button" class="aggregate" id="aggregate" @click="changeAggregation">{{aggregationText}}</button>
                <button type="button" @click="runTutorial">Tutorial</button>
      
        </div>
          
            <div class="notes">
                <p class="notes-text" v-html="noteText"></p></div>

                <v-tour name="userTour" :steps="steps"></v-tour>
    </div>
</template>

<script>
import SparkBarChartGroup from "./components/SparkBarChartGroup";
import SpecialtySelect from "./components/SpecialtySelect";
import DownloadImageButton from "./components/DownloadImageButton";
import DownloadDataButton from "./components/DownloadDataButton";
import Map from "./components/Map";
import { getSourceText, getPhysicianGroupText } from "./chart-text";
// import debounce from "lodash/debounce";

export default {
  name: "App",
  components: {
    SparkBarChartGroup,
    Map,
    SpecialtySelect,
    DownloadImageButton,
    DownloadDataButton
  },
  data: function() {
    return {
      steps: [
        {
          target: ".profession-select",
          content: `Welcome!<br>To begin, you can select a health profession. For some professions, you can also select a specialty or primary area of practice.`
        },
        {
          target: ".counties",
          content: `The map shows all the counties in North Carolina. Darker shades of green indicate higher values. Hover on a county to get the name and value or click to filter the charts to the right.`
        },
        {
          target: ".histogram-legend",
          content:
            "The histogram summarizes the data in the map and also shows the relationship between the colors and values for the map.",
          params: {
            placement: "top"
          }
        },
        {
          target: "#bar-chart-group",
          content:
            "These mini charts show longitudinal demographic data for the selected profession and region. For instance, you can see the longitudinal trends for a given county by clicking on the map. Click again on the same county to reset.",
          params: {
            placement: "left"
          }
        },
        {
          target: "#control-panel",
          content:
            "Down here you can change the mapped year of data, download the dashboard as an image, download the data for the dashboard, or change the unit of geography from county to AHEC.",
          params: {
            placement: "top"
          }
        }
      ]
    };
  },
  computed: {
    loadFailed() {
      return this.$store.state.loadFailed;
    },
    dataLoaded() {
      return this.$store.state.dataLoaded;
    },
    aggregationText() {
      const aggReverse = this.aggregationLevel == "county" ? "ahec" : "county";
      return `See Data by ${aggReverse}`;
    },
    aggregationLevel() {
      return this.$store.state.aggregationLevel;
    },
    year() {
      return this.$store.state.year;
    },
    yearExtent() {
      return this.$store.state.yearExtent;
    },
    noteText() {
      const sourceText = getSourceText(this.$store.state.specialty.profession);
      const professionGroupText = getPhysicianGroupText(
        this.$store.state.specialty
      );

      return professionGroupText + sourceText;
    }
  },
  mounted() {
    const currIntro = localStorage.getItem("intro");
    if(currIntro != "seen"){
      this.$tours["userTour"].start();
      localStorage.setItem("intro", "seen");
    }
  },
  methods: {
    rectClicked: function() {
      this.$store.commit("changeRegion", "North Carolina");
    },
    changeAggregation() {
      this.$store.commit("changeAggregation");
    },
    updateYear(e) {
      this.$store.commit("changeYear", e.target.value);
    }, 
    runTutorial(){
       this.$tours["userTour"].start();
    }
  }
  //   mounted() {
  //     window.addEventListener(
  //       "resize",
  //       debounce(this.handleResize, 150, { leading: true })
  //     );
  //   },
  //   beforeDestroy() {
  //     window.removeEventListener("resize");
  //   }
};
</script>

<style>
.v-step {
  background: #006837 !important;
  font-size: 18px !important;
  line-height: 1.3 !important;
}

.v-step__button {
    font-size: 1.2rem !important;
}

#control-panel {
  display:flex;
  flex-wrap: wrap;
  margin: 1rem 0;
}

#control-panel>*{
  margin-right: 5px;
}

#yearSlider {
  margin-bottom: 1rem;
  font: 700 1.3rem sans-serif;
}

#yearSlider input {
  margin-bottom: 0;
}

#yearSlider input[type="checkbox"] {
  margin-bottom: 0;
  margin-right: 5%;
}

/* .barChartGroup {
  margin-left: 0;
  margin-top: 10px;
  min-height: 481px;
} */

.failed {
  height: 400px;
  padding: 30px;
  color: red;
  font-size: 15px;
}

.scaling-svg-container {
  position: relative;
  height: 0;
  width: 100%;
  padding: 0;
  padding-bottom: 100%;
  /* override this inline for aspect ratio other than square */
}
.scaling-svg {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.notes-text {
  margin-top: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.paop-note {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  /* background-color: #d9f0a3; */
  /* color: #000; */
  padding: 10px;
  border: 3px solid #31a354;
  border-radius: 15px;
}
</style>
