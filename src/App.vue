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
        <symbol
          id="urbanized-area-icon"
          viewBox="0 0 35 33"
          width="25"
          height="24"
          fill="none"
          stroke="#333"
        >
          <title>Urbanized Area Icon</title>
          <path
            d="M 32.4858 13.3461 32.6012 14.6044 32.231 14.9597 31.6662 14.2905 32.4858 13.3461 Z M 25.194 23.9664 24.4492 25.7949 26.3942 26.5296 25.885 27.0629 24.1627 26.3896 24.057 27.558 22.6914 27.0879 21.468 25.6093 21.4236 24.464 22.0235 23.7959 24.1867 24.0316 25.194 23.9664 Z M 16.3836 2.2567 16.6221 4.4401 16.3684 5.6871 16.3836 2.2567 Z M 15.5642 1.0007 17.1151 1 16.3836 2.2567 15.3193 1.8734 15.5642 1.0007 Z M 11.6997 26.7549 10.0921 27.1235 9.847 28.1095 10.5971 29.4157 11.312 29.7587 12.3483 29.5098 12.9187 30.8309 12.8791 31.6368 11.7283 31.5607 9.0846 30.7318 9.193 29.7807 8.6562 29.5743 8.9665 28.0997 8.8826 26.7774 9.5903 26.1651 9.693 25.3413 11.4291 26.0703 11.6997 26.7549 Z M 5.5927 8.8208 7.0199 9.2128 7.7843 8.8277 7.0914 9.733 5.5927 8.8208 Z M 6.2992 4.631 4.5185 2.9384 5.8214 2.4722 6.2992 4.631 Z M 3.4095 13.1043 1.7944 12.9263 1.8698 11.5796 3.4878 12.528 3.4095 13.1043 Z M 3.4095 13.1043 4.2836 12.9475 5.3953 13.5662 7.0056 13.6194 7.8488 12.8781 10.8673 14.6584 12.6142 14.6605 13.0193 15.1164 14.4437 15.1796 13.8816 14.0259 14.2362 13.0913 16.2204 13.2667 16.3278 11.289 15.5733 10.9839 16.303 9.4876 15.2512 9.1701 14.8017 10.0936 13.4565 9.7396 12.8802 9.9024 11.8183 9.3683 12.0768 8.6828 9.8529 7.7064 9.6531 8.4413 7.7843 8.8277 7.8267 7.2934 6.4237 5.098 6.2992 4.631 8.0564 5.2991 8.3719 4.9225 7.0296 3.4628 8.8878 3.8324 9.1005 4.2693 10.4785 4.576 12.0202 6.1915 12.7065 5.7913 13.7032 6.5909 14.1441 6.196 15.8502 5.9903 15.4919 7.4364 15.4947 8.5317 15.852 9.2707 16.8852 9.3303 17.2873 7.9353 18.2784 9.1737 19.8273 9.1663 21.5365 10.8751 20.823 12.5431 22.2126 13.4941 23.7548 11.925 24.4672 12.21 23.5076 13.0238 22.8327 14.3846 23.8087 15.3749 25.8851 14.6896 27.4146 15.3157 27.0245 15.5716 30.9467 16.8616 31.5441 16.6377 32.231 14.9597 32.6294 17.2152 32.2147 17.9316 30.961 18.7367 30.3679 19.4962 29.0336 20.2002 25.1834 18.7796 23.5665 19.4409 24.2441 21.0689 25.5183 22.6127 26.8237 21.5983 28.5573 22.2027 28.8576 22.8573 28.2514 23.6457 29.8167 24.6242 32.1413 25.5075 34 26.4344 33.7533 27.4885 32.674 28.2372 32.3047 27.937 33.6313 26.2728 32.3259 25.6091 29.7854 24.6426 28.1939 23.6562 26.0754 22.919 25.5339 22.9448 25.194 23.9664 25.2007 22.4723 24.1172 21.4316 21.8872 21.3065 21.2582 21.9638 21.0633 21.3456 20.0401 21.3261 18.6794 22.7942 17.7122 21.8075 17.0787 22.4491 15.6622 21.7099 14.2292 19.8187 13.6229 20.1522 12.9511 21.8962 12.1691 21.8651 9.6948 23.3831 8.7205 26.5917 7.383 26.5484 6.2387 27.5637 5.5435 26.5483 4.5846 26.7129 2.1097 24.3947 2.6411 24.002 3.9384 24.3628 6.4264 23.9111 6.4536 23.4245 7.6327 22.6033 8.0512 21.5689 9.211 21.9162 10.2142 22.9693 12.1324 21.6894 12.4425 20.6163 12.2079 19.9353 12.2356 18.3109 12.0238 16.4293 11.0276 16.0505 10.0141 16.369 9.0483 17.5707 8.0584 16.9754 8.8231 16.4237 10.0084 16.1826 9.514 15.5459 7.7585 14.8955 7.3086 15.2631 2.1956 17.0522 1.8748 17.7841 1 17.5437 1.7643 16.7766 1.1652 15.0344 2.7499 14.8544 3.4095 13.1043 Z"
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
        <svg class="scaling-svg dashboard" viewBox="0 0 960 720">
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
          <rect width="960" height="720" fill="#fff" @click="rectClicked" />
          <Map v-if="dataAvailable"/>
          <text v-else transform="translate(200, 300)" fill="#000" font-size="24px" text-anchor="middle">Physician data from 2020 and 2021 are unavailable.</text>
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
      <!-- <div id="region-select-group">
        <label for="region-select" id="region-select-label">See Data By</label>
        <select id="region-select" :value="aggregationLevel" @change="changeAggregation">
          <option value="county">County</option>
          <option value="ahec">AHEC</option>
          <option value="medicaid" :disabled="!medicaidRegions">Medicaid Region</option>
        </select>
      </div>-->
      <div class="layer-select">
        <label>See Data By</label>
        <multiselect
          :value="aggregationSelectValue"
          :options="aggregationSelect"
          track-by="value"
          label="label"
          @input="changeAggregation"
          :multiple="false"
          :searchable="false"
          :showLabels="false"
        ></multiselect>
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
import {
  getSourceText,
  getPhysicianGroupText,
  getLayerText,
  getFooterText
} from "./chart-text";
import Multiselect from "vue-multiselect";
// import debounce from "lodash/debounce";

export default {
  name: "App",
  components: {
    SparkBarChartGroup,
    Map,
    SpecialtySelect,
    LayerSelect,
    DownloadImageButton,
    DownloadDataButton,
    Multiselect
  },
  data: function() {
    return {
      aggregationSelect: [
        { value: "county", label: "County" },
        { value: "ahec", label: "AHEC" },
        { value: "medicaid", label: "Medicaid Region" }
      ],
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
    profession() {
      return this.$store.state.specialty.profession;
    },
    medicaidRegions() {
      return this.$store.state.medicaidRegions;
    },
    aggregationSelectValue() {
      return this.aggregationSelect.find(
        ({ value }) => value == this.aggregationLevel
      );
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
    layers() {
      return this.$store.state.layers;
    },
    dataAvailable(){
      return !(this.profession == "Physician" & (this.year == 2020 | this.year == 2021));
    },
    noteText() {
      const sourceText = getSourceText(this.$store.state.specialty.profession);
      const professionGroupText = getPhysicianGroupText(
        this.$store.state.specialty
      );
      const layerText = getLayerText(this.layers);
      const footerText = getFooterText();

      return professionGroupText + sourceText + layerText + footerText;
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
      this.$store.commit("changeAggregation", e.value);
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
