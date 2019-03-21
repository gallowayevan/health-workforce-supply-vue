 <template>
 <g>
    <text class="bar-text"
    :x="barData.x + barData.width*0.5" 
    :y="barData.y - 4"
    v-show="showLabel"
    >
    {{barData.value}}
    </text>

    <text
    :x="barData.x + barData.width*0.5" 
    :y="barData.y + barData.height + 15"
    v-show="showLabel"
    class="bar-text yearLabel"
    >
    {{barData.year}}
    </text>
 </g>  
 </template>

 <script> 
export default {
  name: 'BarText',
  data () {
    return {
    }
  }, 
  props: ['barData'],
  computed: {
    hoveredYear() {
      return this.$store.state.hoveredYear;
    },
    showLabel() {
      //show labels if 
      //the default annotation should be on and this group contains one of the default annotations 
      //OR this group's rectangle is currently being hovered
      return (this.hoveredYear == 0 & this.barData.defaultAnnotation) || this.hoveredYear == this.barData.year ? true : false;
    }
  }
  }
</script>

<style >


  .bar-text {
    font-size: 1em; 
    text-anchor:middle;  
  }

  .yearLabel {
    fill: rgb(189, 189, 189);
  }

</style>
 
