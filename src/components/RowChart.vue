 <template>
  <g>
    <g v-for="item in mapDataArray" :key="item[0]" :transform="`translate(0,${yScale(item[0])})`">
      <rect :width="xScale(+item[1])" :height="yScale.bandwidth()" :fill="colorScale(+item[1])">
        <title>{{hoverValueText(+item[1])}}</title>
      </rect>
      <text
        class="ahecLabel"
        dx="-10"
        :dy="yScale.bandwidth()/1.5"
      >{{item[0] == "Wake AHEC" ? "Wake" : aggregationLevel == "medicaid" ? getMedicaidRegionName(item[0]) : item[0]}}</text>
    </g>
    <g
      class="xAxis"
      v-for="(item, index) in xTicks"
      :transform="`translate(${xScale(item)},${height-5})`"
    >
      <line :y1="-height + 20"></line>
      <text dy="1.1em" v-if="index % 2== 0">{{axisValueFormatter(item)}}</text>
    </g>

    <text
      class="chartTitle"
      :x="chartMargin.left + (xScale.range()[1] - xScale.range()[0])/2"
      :dy="height + 40"
    >{{chartTitle}}</text>

    <g class="ncLine">
      <line :x2="xScale(ncData.value)" :x1="xScale(ncData.value)" y1="5" :y2="height - 5"></line>
      <text :x="xScale(ncData.value)">{{ncText}}</text>
    </g>
  </g>
</template>

 <script>
import { extent, range, max } from "d3-array";
import { scaleLinear, scaleBand } from "d3-scale";
import { format } from "d3-format";
import { formatter, medicaidRegionName } from "../utility";

export default {
  name: "RowChart",
  data() {
    return {
      width: 400,
      height: 230,
      chartMargin: { top: 15, right: 15, bottom: 15, left: 0 }
    };
  },
  props: ["colorScale", "mapData"],
  computed: {
    mapDataArray() {
      return [...this.mapData.entries()].sort((a, b) => a[1] - b[1]);
    },
    ncData() {
      return this.$store.getters
        .getDataByVariableForNorthCarolina(this.variable)
        .filter(d => d.year == this.$store.state.year)[0];
    },
    xScale: function() {
      const currDomain = this.mapDataArray.map(d => d[1]);
      return scaleLinear()
        .domain([0, Math.max(...currDomain)])
        .nice()
        .range([this.chartMargin.left, this.width - this.chartMargin.right]);
    },
    xTicks() {
      return this.xScale.ticks();
    },
    yScale() {
      return scaleBand()
        .domain(this.mapDataArray.map(d => d[0]))
        .range([this.height - this.chartMargin.bottom, this.chartMargin.top])
        .paddingInner(0.1);
    },
    hoverValueText() {
      let variableText = "";
      switch (this.variable) {
        case "providerRate":
          variableText = "per 10,000 population";
          break;
        case "percentFemale":
          variableText = "female";
          break;
        case "percentAge":
          variableText = "65 or older";
          break;
        case "percentUnderrepresented":
          variableText = "underrepresented minority";
          break;
        case "total":
          variableText = "total";
          break;
      }

      return function(valueToFormat) {
        const formattedValue = this.valueFormatter(valueToFormat);
        return `${formattedValue} ${variableText}`;
      };
    },
    chartTitle() {
      let currentChartTitle = "Histogram";
      switch (this.variable) {
        case "providerRate":
          currentChartTitle = "Rate per 10,000 Population";
          break;
        case "percentFemale":
          currentChartTitle = "Percent Female";
          break;
        case "percentAge":
          currentChartTitle = "Percent 65 or Older";
          break;
        case "percentUnderrepresented":
          currentChartTitle = "Percent Underrepresented Minority";
          break;
        case "total":
          currentChartTitle = "Total";
          break;
      }
      return currentChartTitle;
    },
    ncText() {
      let txt = "State ";
      txt =
        this.variable == "providerRate"
          ? txt + "Rate"
          : this.variable == "total"
          ? "Median"
          : txt + "Percentage";

      return `${txt}: ${this.valueFormatter(this.ncData.value)}`;
    },

    valueFormatter: function() {
      return formatter(this.variable);
    },
    variable: function() {
      return this.$store.state.variable;
    },
    aggregationLevel: function() {
      return this.$store.state.aggregationLevel;
    }
  },
  methods: {
    axisValueFormatter(currValue) {
      let formatted = currValue;
      if (this.variable.indexOf("percent") > -1) {
        formatted = Math.round(currValue * 100) + "%";
      } else if (this.variable == "providerRate") {
        formatted = format("")(currValue);
      } else {
        formatted = this.valueFormatter(currValue);
      }
      return formatted;
    },
    getMedicaidRegionName: function(numericRegionName) {
      return medicaidRegionName.get(numericRegionName);
    }
  }
};
</script>

<style scoped>
.ncLine text {
  fill: #007fae;
  font-weight: 600;
  font-size: 1em;
  text-anchor: middle;
}

.ncLine line {
  stroke: #007fae;
  stroke-width: 3px;
}

.ahecLabel {
  text-anchor: end;
}

.xAxis line {
  stroke: #bdbdbd;
}

.xAxis text {
  text-anchor: middle;
}

.chartTitle {
  font-size: 1em;
  font-weight: 600;
  text-anchor: middle;
}
</style>
 