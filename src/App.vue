<template>
  <div id="app">
    <svg
      aria-hidden="true"
      style="position: absolute; width: 0; height: 0; overflow: hidden;"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <!--
 * Font Awesome Free 5.12.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
        -->
        <symbol id="fa-image" viewBox="0 0 512 512">
          <title>Save Image</title>
          <path
            d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
          />
        </symbol>
        <symbol id="fa-info-circle" viewBox="0 0 512 512">
          <title>Information</title>
          <path
            d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
          />
        </symbol>
        <symbol id="fa-file-csv" viewBox="0 0 384 512">
          <title>Download csv</title>
          <path
            d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-96 144c0 4.42-3.58 8-8 8h-8c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h8c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-8c-26.51 0-48-21.49-48-48v-32c0-26.51 21.49-48 48-48h8c4.42 0 8 3.58 8 8v16zm44.27 104H160c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h12.27c5.95 0 10.41-3.5 10.41-6.62 0-1.3-.75-2.66-2.12-3.84l-21.89-18.77c-8.47-7.22-13.33-17.48-13.33-28.14 0-21.3 19.02-38.62 42.41-38.62H200c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-12.27c-5.95 0-10.41 3.5-10.41 6.62 0 1.3.75 2.66 2.12 3.84l21.89 18.77c8.47 7.22 13.33 17.48 13.33 28.14.01 21.29-19 38.62-42.39 38.62zM256 264v20.8c0 20.27 5.7 40.17 16 56.88 10.3-16.7 16-36.61 16-56.88V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v20.8c0 35.48-12.88 68.89-36.28 94.09-3.02 3.25-7.27 5.11-11.72 5.11s-8.7-1.86-11.72-5.11c-23.4-25.2-36.28-58.61-36.28-94.09V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8zm121-159L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
          />
        </symbol>
        <symbol id="fa-question-circle" viewBox="0 0 512 512">
          <title>Question Circle</title>
          <path
            d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"
          />
        </symbol>
      </defs>
    </svg>
    <specialty-select></specialty-select>
    <div v-if="loadFailed" class="failed">
      We're sorry - we couldn't find that dataset.
      Please try selecting another profession or try the same profession again.
      If the problem persists, contact us at
      <a
        href="mailto:nchealthworkforce@unc.edu?subject=Problem%20with%20HPDS%20website"
      >nchealthworkforce@unc.edu</a>.
    </div>
    <div
      v-else-if="!medicaidRegions & aggregationLevel == 'medicaid'"
      class="failed"
    >We do not have data for medicaid regions for this profession. Please select another choice.</div>
    <div v-else>
      <div
        v-if="dataLoaded"
        class="scaling-svg-container"
        id="dashboard"
        style="padding-bottom: 62%"
      >
        <svg class="scaling-svg dashboard" viewBox="0 0 960 600">
          <defs>
            <pattern id="NApattern" patternUnits="userSpaceOnUse" width="8" height="8">
              <image
                xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgogIDxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyNmZmYnLz4KICA8cGF0aCBkPSdNMCAwTDggOFpNOCAwTDAgOFonIHN0cm9rZS13aWR0aD0nMC41JyBzdHJva2U9JyNhYWEnLz4KPC9zdmc+Cg=="
                x="0"
                y="0"
                width="8"
                height="8"
              />
            </pattern>
          </defs>
          <rect width="960" height="600" fill="#fff" @click="rectClicked" />
          <Map />
          <spark-bar-chart-group />
        </svg>
      </div>
    </div>

    <div id="control-panel">
      <div id="yearSlider">
        <div>Select a Year: {{year}}</div>
        <input
          :min="yearExtent[0]"
          :max="yearExtent[1]"
          step="1"
          :value="year"
          @input="updateYear"
          type="range"
        />
        <!-- <label for="scaleCheckBox"><input id="scaleCheckBox" type="checkbox" :value="$store.state.freezeScale" @input="$store.commit('changeFreezeScale')">Freeze Color Scale</label> -->
      </div>
      <div id="region-select-group">
        <label for="region-select" id="region-select-label">See Data By</label>
        <select id="region-select" :value="aggregationLevel" @change="changeAggregation">
          <option value="county">County</option>
          <option value="ahec">AHEC</option>
          <option value="medicaid" :disabled="!medicaidRegions">Medicaid Region</option>
        </select>
      </div>
      <layer-select></layer-select>
      <download-image-button></download-image-button>
      <download-data-button></download-data-button>
      <!-- <button type="button" class="aggregate" id="aggregate" @click="changeAggregation">{{aggregationText}}</button> -->
      <!-- <button type="button" @click="runTutorial">Tutorial</button> -->
      <button class="button-icon" title="Launch Tutorial" @click="runTutorial">
        <svg class="button-icon-svg has-fill-primary">
          <use xlink:href="#fa-question-circle" />
        </svg>
      </button>
    </div>

    <div class="notes">
      <p class="notes-text" v-html="noteText"></p>
    </div>

    <v-tour name="userTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
import SparkBarChartGroup from "./components/SparkBarChartGroup";
import SpecialtySelect from "./components/SpecialtySelect";
import LayerSelect from "./components/LayerSelect";
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
    LayerSelect,
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
    medicaidRegions() {
      return this.$store.state.medicaidRegions;
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
    if (currIntro != "seen") {
      this.$tours["userTour"].start();
      localStorage.setItem("intro", "seen");
    }
  },
  methods: {
    rectClicked: function() {
      this.$store.commit("changeRegion", "North Carolina");
    },
    changeAggregation(e) {
      this.$store.commit("changeAggregation", e.target.value);
    },
    updateYear(e) {
      this.$store.commit("changeYear", e.target.value);
    },
    runTutorial() {
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
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
}

/* #region-select-group {
  font: 700 1.3rem sans-serif;
} */

#region-select-label {
  /* display: inline-block; */
  margin-right: 5px;
}

#control-panel > * {
  margin-right: 5px;
}
#control-panel > div {
  margin-right: 20px;
}

#yearSlider {
  margin-bottom: 1rem;
  font-weight: 600;
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
