<template>
  <div class="region-select">
    <label>{{ label }}</label>
    <multiselect
      :value="selectedOption"
      :options="options"
      track-by="value"
      label="label"
      @input="changeRegion"
      :multiple="false"
      :searchable="true"
      :showLabels="false"
      :allow-empty="false"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapState } from "vuex";
import { medicaidRegionName } from "../utility";

export default {
  name: "RegionSelect",
  components: { Multiselect },
  computed: {
    ...mapState(["data", "aggregationLevel", "region"]),
    // Label adapts to the current unit of geography.
    label() {
      switch (this.aggregationLevel) {
        case "ahec":
          return "Or select an AHEC";
        case "medicaid":
          return "Or select a Medicaid Region";
        case "ruralroots":
          return "Or select a Rural Roots Hub";
        default:
          return "Or select a county";
      }
    },
    allOption() {
      return { value: "North Carolina", label: "All of North Carolina" };
    },
    // Display label for a region value. Only Medicaid regions are stored under a
    // different name than they are displayed; the rest display as stored.
    regionLabel() {
      const level = this.aggregationLevel;
      return regionValue =>
        level == "medicaid"
          ? medicaidRegionName.get(regionValue) || regionValue
          : regionValue;
    },
    options() {
      const level = this.aggregationLevel;
      const regions = [
        ...new Set(this.data.filter(d => d.type == level).map(d => d.region))
      ];
      const opts = regions
        .map(r => ({ value: r, label: this.regionLabel(r) }))
        .sort((a, b) =>
          a.label > b.label ? 1 : a.label < b.label ? -1 : 0
        );
      return [this.allOption, ...opts];
    },
    selectedOption() {
      return this.region == "North Carolina"
        ? this.allOption
        : { value: this.region, label: this.regionLabel(this.region) };
    }
  },
  methods: {
    changeRegion(option) {
      this.$store.commit("setRegion", option.value);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.region-select {
  min-width: 220px;
}
.region-select label {
  display: block;
}
</style>
