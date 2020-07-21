<template>
  <div class="layer-select">
    <label>Add a Layer</label>
    <multiselect
      :value="layers"
      :options="options"
      track-by="value"
      label="label"
      placeholder="Add a Layer"
      @input="updateLayers"
      :multiple="true"
      :searchable="false"
      :showLabels="false"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "LayerSelect",
  components: {
    Multiselect
  },
  data() {
    return {
      options: [
        { value: 0, label: "Rural Squares" },
        { value: 1, label: "Interstates" },
        { value: 2, label: "Urbanized Areas" }
      ]
    };
  },
  computed: {
    layers: function() {
      return this.$store.state.layers;
    }
  },
  methods: {
    updateLayers: function(layers) {
      this.$store.commit("updateLayers", layers);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
