<template>
<rect class="bars"
    :x="barData.x" 
    :y="barData.y"
    :width="barData.width" 
    :height="barData.height" 
    @mouseover="mouseover"
    @mouseout="mouseout"
    @click="click"
    :style= "{ fill:fill }"
    :class="{barHovered:isHovered}"
     >
    </rect>
</template>

<script>
export default {
  name: 'BarRect',
  data () {
    return {
    }
  }, 
  props: ['barData'],
  computed: {
    hoveredYear() {
      return this.$store.state.hoveredYear;
    },
    isHovered(){
      return this.hoveredYear == this.barData.year;
    }, 
    selectedVariable(){
      return this.$store.state.variable;
    },
    selectedYear(){
      return this.$store.state.year;
    },
    fill(){
      let rectFill;

      if(this.barData.variable == this.selectedVariable){
        rectFill = this.barData.year == this.selectedYear ? "#a33180" : "#be8edd";
      } else {
        rectFill = this.barData.year == this.selectedYear ? "#31a354": "#addd8e";
      }

      return rectFill;
    }
  },
  methods: {
    mouseover: function(){
      this.$store.commit('changeHoveredYear', this.barData.year)
    },
    mouseout: function(){
      this.$store.commit('changeHoveredYear', 0)
    }, 
    click: function(){
      this.$store.commit('changeYear', this.barData.year);
      this.$store.commit('changeVariable', this.barData.variable)
    }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .bars {
  fill: rgb(173, 221, 142); 
  stroke-width: 2;
  }

.barHovered {
  stroke: rgb(90, 90, 90); 
}

</style>