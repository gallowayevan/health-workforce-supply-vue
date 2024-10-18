 <template>
 <g>  
<template v-for="item in dodgedData">      
<g :key="item.data[0] +'circle'">
<circle :class="[item.data[0] == hoveredRegion ? 'selectedCircle' : '', 'countyCircle']"  
        :cx="item.x" 
        :cy="height - chartMargin.bottom - radius - padding - item.y"
        :r="radius"
        :fill="item.data[0] == 'North Carolina' ? '#4B9CD3' : colorScale(item.data[1])" 
        @mouseover="mouseover(item.data[0])"
        @mouseout="mouseout"
        >
</circle>
</g>
</template>
<template v-for="item in dodgedData"> 
<g :key="item.data[0]" class="hoverBox" :transform="`translate(${item.x},${height - chartMargin.bottom - radius - padding - item.y - 25})`" v-if="item.data[0] == hoveredRegion">
<rect rx="5" ry="5" height=25 width=130 />
<text dx=5 dy=17>{{item.data[0]}}: {{valueFormatter(item.data[1])}}</text>
</g>
     </template>
<g class="swarmAxis" :transform="`translate(0,${height - 15})`">
    <line stroke="#000" :x2="xScale(xScale.domain()[1])" :x1="xScale(xScale.domain()[0])"></line>
    <template v-for="(item, index) in xAxisTicks">
        <g :key="index + 'value'" :transform="`translate(${xScale(item)},0)`">
            <line :y2="index % 2 == 0 ? 15 : 30" ></line>
            <text :dy="index % 2 == 0 ? 30 : 45" dx=-5>{{valueFormatter(item)}}</text>
        </g>
</template>
<text class="swarmTitle" dx=20 dy=65>{{chartTitle}}</text>
<g v-show="aggregationLevel == 'county'">
<g transform="translate(150,75)" v-show="variable.indexOf('percent') > -1">
    <rect height=25 width=25 :fill="colorScale(-9)" stroke="#ececec"/>
    <text dy=20 dx=35>NA ({{missingRegions}} counties)</text>
</g>
<g transform="translate(370,75)">
    <rect height=25 width=25 :fill="colorScale(0)" />
    <text dy=20 dx=35>0 ({{zeroRegions}} counties)</text>
</g>
<g class="ncCircleLegend" transform="translate(550,90)">
  <circle cx="0" cy="0" r="6" fill="#4B9CD3"></circle>
  <text dx=13 dy=5>North Carolina</text>
</g>
</g>
</g>
 </g>
 </template>

 <script>
import {extent, range, max} from 'd3-array'
import {scaleLinear, scaleLog, domain, rangeRound} from 'd3-scale'
import {formatter} from '../utility' 

export default {
  name: "BeeswarmChart",
  data() {
    return {
        width: 600,
        height: 200, 
        chartMargin : { top: 15, right: 15, bottom: 15, left: 25 },
        radius: 6, 
        padding: 1.5
    };
  },
  props: {},
  computed: {
    hoveredRegion() {
      return this.$store.state.hoveredRegion;
    },
    mapData: function(){
        return this.$store.getters
        .getDataByCurrentVariableForCurrentRegionTypeCurrentYear;
    },
    ncData() {
      return this.$store.getters.getDataByVariableForNorthCarolina(this.variable).filter(d=>d.year == this.$store.state.year)[0];
    },
    swarmData: function() {
      //not sure why ncData doesn't update in time for this function
      let ncData = 0;
      if(typeof this.ncData !== 'undefined'){ ncData = this.ncData.value};
      let sData = Array.from(this.mapData).filter(d=>d[1] != null && d[1] > 0);
      sData.push(["North Carolina", +ncData]);
      return sData;
    },
    missingRegions() {return Array.from(this.mapData).filter(d=>d[1] == null || d[1]  < 0).length},
    zeroRegions(){return Array.from(this.mapData).filter(d=>d[1] == 0).length},
    chartWidth: function(){return this.width - this.chartMargin.left - this.chartMargin.right},
    chartHeight: function(){return this.height - this.chartMargin.top - this.chartMargin.bottom},
    xScale: function() {
        const currDomain = this.variable.indexOf("percent") > -1 ? extent(this.colorScale().domain().map(d=>d*.01)) : extent(this.colorScale().domain());
        if (this.variable == "total"){
            return scaleLog()
              .domain(currDomain)
              .range([this.chartMargin.left, this.width - this.chartMargin.right])
        } else {
      return scaleLinear()
              .domain(currDomain)
              .range([this.chartMargin.left, this.width - this.chartMargin.right])
        }
    },
    xAxisTicks: function() {
        const scaleTicks = this.variable.indexOf("percent") > -1 ? this.colorScale().clusters().map(d=>d*.01): this.colorScale().clusters();
        const scaleExtent = this.xScale.domain();
        const axisTicks = scaleTicks[scaleTicks.length-1] >= scaleExtent[1] ? [scaleExtent[0], ...scaleTicks.slice(0,-1), scaleExtent[1]] : [scaleExtent[0], ...scaleTicks, scaleExtent[1]];
        // console.log(axisTicks)
        return axisTicks;
    },
    colorScale: function() {
      return this.$store.getters.getColorScaleForCurrentVariable;
    },
    chartTitle(){
            let currentChartTitle = "Beeswarm Plot"
            switch (this.variable) {
                case "provider_rate":
                    currentChartTitle = "Rate per 10,000 Population";
                    break;
                case "percent_female":
                currentChartTitle = "Percent Female";
                    break;
                case "percent_age":
                    currentChartTitle = "Percent 65 or Older";
                    break;  
                case "percent_underrepresented":
                    currentChartTitle = "Percent Underrepresented Minority";
                    break;
                case "total":
                    currentChartTitle = "Total (log scale)";
                    break;
            }
            return currentChartTitle;
        },
    dodgedData: function () {
    //   https://beta.observablehq.com/@mbostock/d3-beeswarm
      const radius = this.radius;
      const padding = this.padding;
      const circles = this.swarmData.map(d => ({x: this.xScale(d[1]), data: d})).sort((a, b) => a.x - b.x);
      const epsilon = 1e-3;
      let head = null, tail = null;
        
      // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
      function intersects(x, y) {
        let a = head;
        while (a) {
          if ((radius * 2 + padding - epsilon) ** 2 > (a.x - x) ** 2 + (a.y - y) ** 2) {
            return true;
          }
          a = a.next;
        }
        return false;
      }
      
      // Place each circle sequentially.
      for (const b of circles) {
        
        // Remove circles from the queue that can’t intersect the new circle b.
        while (head && head.x < b.x - (radius * 2 + padding)) head = head.next;
        
        // Choose the minimum non-intersecting tangent.
        if (intersects(b.x, b.y = 0)) {
          let a = head;
          b.y = Infinity;
          do {
            let y = a.y + Math.sqrt((radius * 2 + padding) ** 2 - (a.x - b.x) ** 2);
            if (y < b.y && !intersects(b.x, y)) b.y = y;
            a = a.next;
          } while (a);
        }
        
        // Add b to the queue.
        b.next = null;
        if (head === null) head = tail = b;
        else tail = tail.next = b;
      }
      
      return circles;
    },
    variable: function() {
      return this.$store.state.variable;
    },
    valueFormatter: function(){
        return formatter(this.variable)
    },
    aggregationLevel: function(){
      return this.$store.state.aggregationLevel;
    }
  },
  methods: {
    mouseover: function(region){
      this.$store.commit('changeHoveredRegion', region)
    },
    mouseout: function(){
      this.$store.commit('changeHoveredRegion', -9)
    }
  },
};
</script>

<style scoped>
.xAxisText {
  font-weight: 600;
}
text {
    font-size: 1.1em;
    fill: #4b4b4b
}

line {
    stroke: #4b4b4b
}

.swarmTitle {
    font-size: 1.1em;
    font-weight: 600;
}

.hoverBox rect {
  fill: rgb(163, 49, 128);
  opacity: 0.85;
}

.hoverBox text {
  fill: #fff;
}

.selectedCircle {
    stroke:rgb(163, 49, 128);
    stroke-width: 3px;
    fill:#808080
}
</style>
 