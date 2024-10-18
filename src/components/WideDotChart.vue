 <template>
 <g>    
<circle class="countyBar" 
         v-for="item in barData" 
        :key="item[0]"  
        :cx="xScale(item[0])" 
        :cy="yScale(item[1])"
        r=5
        :fill="colorScale(item[1])" >
</circle>
<text class="xAxisText" transform="translate(325,175)">Counties</text>
 </g>
 </template>

 <script>
import {extent, range, max} from 'd3-array'
import {scaleBand, scaleLinear, domain, rangeRound, padding} from 'd3-scale'

export default {
  name: "WideDotChart",
  data() {
    return {
        width: 600,
        height: 200, 
        chartMargin : { top: 15, right: 15, bottom: 15, left: 25 }
    };
  },
  props: {},
  computed: {
    barData: function() {
      let newData = this.$store.getters
        .getDataByCurrentVariableForCurrentRegionTypeCurrentYear;
      return Array.from(newData).filter(d=>!(d[1] === null) && d[1] > 0).sort((a,b)=>b[1] - a[1]);
    },
    chartWidth: function(){return this.width - this.chartMargin.left - this.chartMargin.right},
    chartHeight: function(){return this.height - this.chartMargin.top - this.chartMargin.bottom},
    xScale: function() {
      const xDomain = this.barData.map(d=>d[0]);
      return scaleBand()
        .domain(xDomain)
        .rangeRound([0, Math.min(this.chartWidth, xDomain.length*15)])
        .padding(0.1);
    },
    bandwidth: function() {
      return this.xScale.bandwidth();
    },
    yScale: function() {
      const yMax = max(this.barData, function(d) {
        return d[1];
      });
      return scaleLinear()
        .domain([0, yMax])
        .rangeRound([this.chartHeight, 0]);
    },
    barHeight: function() {
      const height = this.chartHeight;
      const yScale = this.yScale;
      return function(value) {
        return height - yScale(value);
      };
    },
    colorScale: function() {
      return this.$store.getters.getColorScaleForCurrentVariable;
    },
    windowResize(){
      return this.$store.state.windowResize;
    }  
  },
  methods: {},
 watch:{
    windowResize() {
        this.width = document.querySelector("#map-container").clientWidth;
    }
  },
  mounted(){
    this.width = document.querySelector("#map-container").clientWidth;
  }
};
</script>

<style scoped>

.xAxisText{
   font-weight: 600;
}
</style>
 