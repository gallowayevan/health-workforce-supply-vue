 <template>
                <button type="button" class="save-data" @click="downloadData">Download Data</button>
 </template>

 <script>
import {csvFormat} from 'd3-dsv'

export default {
  name: "DownloadDataButton",
  data() {
    return {};
  },
  props: [],
  methods: {
    downloadData() {
      let notesText = document.querySelector(".notes-text").innerText.replace(/\n/g, " ");

    //break up lines based on characters
    let length = notesText.length, step = 120, brokenNotesText = "", i = 0, j;

    while (i < length) {
      j = notesText.indexOf(" ", i + step);
      if (j === -1) {
        j = length;
      }

      brokenNotesText += "\"" + notesText.slice(i, j) + "\"" + "\n";
      i = j;
    }

    notesText = brokenNotesText;

    let csv = "State: North Carolina\n";
    csv +=
      "Profession: " +
      this.$store.state.specialty.profession +
      "\n";
    csv +=
      "Specialty/PAOP: " +
      this.$store.state.specialty.specialty +
      "\n";
    csv += notesText;  
    csv += csvFormat(this.$store.state.data);

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