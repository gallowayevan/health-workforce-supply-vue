 <template>
  <button class="button-icon" title="Download Data" @click="downloadData">
    <svg class="button-icon-svg has-fill-primary">
      <use xlink:href="#fa-file-csv" />
    </svg>
  </button>
  <!-- <button type="button" class="save-data" @click="downloadData">Download Data</button> -->
</template>

 <script>
import { csvFormat } from "d3-dsv";
import { group, range, extent } from "d3-array";

export default {
  name: "DownloadDataButton",
  data() {
    return {};
  },
  props: [],
  methods: {
    downloadData() {
      let notesText = document
        .querySelector(".notes-text")
        .innerText.replace(/\n/g, " ");

      //break up lines based on characters
      let length = notesText.length,
        step = 120,
        brokenNotesText = "",
        i = 0,
        j;

      while (i < length) {
        j = notesText.indexOf(" ", i + step);
        if (j === -1) {
          j = length;
        }

        brokenNotesText += '"' + notesText.slice(i, j) + '"' + "\n";
        i = j;
      }

      notesText = brokenNotesText;

      const yearExtent = extent(this.$store.state.data, d => d.year);
      const variable = this.$store.state.variable;
      const aggregationLevel = this.$store.state.aggregationLevel;
      const formattedData = Array.from(
        group(
          this.$store.state.data.filter(
            d => d.type == this.$store.state.aggregationLevel
          ),
          d => d.region
        )
      ).map(function(d) {
        let newRow = {};
        newRow[aggregationLevel] = d[0];
        d[1].forEach(function(e) {
          newRow[e.year] = e[variable];
        });
        return newRow;
      });
      console.log(formattedData);
      let csv = "State: North Carolina\n";
      csv += "Profession: " + this.$store.state.specialty.profession + "\n";
      csv += "Specialty/PAOP: " + this.$store.state.specialty.specialty + "\n";
      csv += `Variable: ${
        variable == "provider_rate" ? "rate per 10k" : variable
      }\n`;
      csv += notesText;
      csv += csvFormat(formattedData, [
        aggregationLevel,
        ...range(yearExtent[0], yearExtent[1] + 1)
      ]);

      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(
          new Blob([csv], { type: "text/csv;charset=utf-8;" }),
          "workforcedata.csv"
        );
      } else {
        var uri = "data:attachment/csv;charset=utf-8," + encodeURI(csv);
        var downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = "workforcedata.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  }
};
</script>

<style >
</style>