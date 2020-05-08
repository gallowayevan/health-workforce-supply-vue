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
        <symbol id="urbanized-area-icon" viewBox="0 0 512 475">
          <title>Urbanized Area Icon</title>
          <path
            d="M 487.5986 191.8041 489.3821 211.2503 483.6606 216.741 474.9328 206.3979 487.5986 191.8041 Z M 374.907 355.9353 363.3971 384.1934 393.456 395.5479 385.5865 403.7905 358.9696 393.3848 357.3349 411.4421 336.2303 404.1765 317.3233 381.3251 316.6375 363.6257 325.9087 353.2999 359.3406 356.9424 374.907 355.9353 Z M 238.7471 20.4225 242.4328 54.1648 238.512 73.4363 238.7471 20.4225 Z M 226.0835 1.0108 250.0521 1 238.7471 20.4225 222.2986 14.4982 226.0835 1.0108 Z M 166.3583 399.0308 141.5141 404.7265 137.7271 419.9651 149.3189 440.151 160.3672 445.4519 176.3822 441.6067 185.1984 462.0233 184.5859 474.4778 166.8004 473.3024 125.9433 460.4921 127.619 445.7927 119.3225 442.603 124.1188 419.8141 122.8227 399.3781 133.7589 389.9148 135.3462 377.1844 162.1766 388.4505 166.3583 399.0308 Z M 71.9784 121.8673 94.0341 127.9253 105.848 121.973 95.1404 135.9651 71.9784 121.8673 Z M 82.8974 57.1151 55.3768 30.9575 75.5131 23.7523 82.8974 57.1151 Z M 38.2382 188.0667 13.2776 185.3149 14.4422 164.5036 39.4481 179.1599 38.2382 188.0667 Z M 38.2382 188.0667 51.7472 185.6427 68.9268 195.2051 93.8141 196.0268 106.8444 184.5708 153.4941 212.0849 180.4927 212.1173 186.7533 219.1629 208.7659 220.1398 200.079 202.309 205.559 187.8661 236.2239 190.577 237.8845 160.0113 226.2237 155.297 237.5006 132.1716 221.2462 127.2653 214.2997 141.5378 193.51 136.0665 184.6032 138.5832 168.1914 130.3277 172.1876 119.7344 137.8176 104.6446 134.7294 116.0014 105.848 121.973 106.5036 98.2611 84.8211 64.3332 82.8974 57.1151 110.0534 67.4409 114.9295 61.6202 94.1851 39.0621 122.9025 44.7728 126.1892 51.5251 147.4857 56.2653 171.312 81.2324 181.9182 75.0473 197.3229 87.4047 204.1356 81.3015 230.5024 78.1226 224.9663 100.4716 225.0095 117.3988 230.5304 128.8203 246.498 129.7411 252.7133 108.1815 268.0296 127.3214 291.968 127.2071 318.3822 153.6148 307.3554 179.3928 328.831 194.0901 352.6658 169.8412 363.6753 174.245 348.8443 186.8223 338.4149 207.8536 353.4983 223.157 385.5887 212.5658 409.2252 222.2425 403.1974 226.1978 463.8133 246.1335 473.0458 242.6743 483.6606 216.741 489.8178 251.5984 483.4083 262.6704 464.0333 275.1119 454.8677 286.8503 434.2462 297.7304 374.7431 275.7761 349.7544 285.9963 360.2269 311.1554 379.9189 335.014 400.0941 319.3375 426.8856 328.6778 431.5267 338.7945 422.1584 350.9794 446.3491 366.1015 482.2739 379.7529 511 394.0771 507.1871 410.3682 490.5079 421.9384 484.7993 417.2995 505.3022 391.5797 485.1271 381.3229 445.866 366.3862 421.2698 351.1411 388.5281 339.7477 380.1605 340.1467 374.907 355.9353 375.0105 332.8444 358.2666 316.7604 323.8017 314.8281 314.0819 324.9857 311.0691 315.4319 295.2568 315.13 274.2277 337.8197 259.2802 322.5703 249.4892 332.4864 227.5974 321.0628 205.4512 291.8343 196.0807 296.9886 185.6988 323.9419 173.6131 323.461 135.3742 346.9206 120.3167 396.5076 99.6456 395.8391 81.9614 411.5306 71.2171 395.8369 56.3991 398.3817 18.1494 362.5539 26.3618 356.4852 46.4118 362.0622 84.862 355.0812 85.2826 347.5611 103.5059 334.8695 109.9736 318.8825 127.8972 324.2503 143.4011 340.5263 173.0459 320.7458 177.8379 304.1615 174.2126 293.6372 174.6418 268.5321 171.3681 239.4523 155.972 233.5993 140.3085 238.5207 125.3826 257.0934 110.0836 247.8933 121.9018 239.366 140.2201 235.6394 132.5792 225.801 105.449 215.749 98.4961 221.4295 19.4779 249.0794 14.5198 260.3909 1 256.675 12.8118 244.8201 3.5534 217.8948 28.0439 215.1128 38.2382 188.0667 Z"
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
