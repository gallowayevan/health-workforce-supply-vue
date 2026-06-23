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
      :searchable="searchable"
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
    // Counties are the only list long enough to need type-to-search; the other
    // geographies have a handful of options, so keep them as plain dropdowns to
    // match the other control-panel selects.
    searchable() {
      return this.aggregationLevel == "county";
    },
    // Label adapts to the current unit of geography.
    label() {
      switch (this.aggregationLevel) {
        case "ahec":
          return "Select an AHEC";
        case "medicaid":
          return "Select a Medicaid Region";
        case "ruralroots":
          return "Select a Rural Roots Hub";
        default:
          return "Select a county";
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
/* Fixed width (not min-width) so the box never resizes with the selected value
   and the controls/buttons after it don't shift around. */
.region-select {
  width: 220px;
}
.region-select label {
  display: block;
  white-space: nowrap;
}
/* Truncate long region names instead of letting them wrap/widen the box. */
.region-select >>> .multiselect__single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
