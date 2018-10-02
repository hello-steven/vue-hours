<template>
  <div>
    <button
      v-if="false"
      class="btn btn-primary">
      Log Time
    </button>
    <hr>
    <div class="time-entries">
      <p>Recent Entries:</p>
      <p v-if="!timeEntries.length">- No time entries yet -</p>
      <div class="list-group">
        <a class="list-group-item" v-for="(timeEntry, entryId) in timeEntries" :key="entryId">
          <div class="user-details">
            <p><strong>Start/Stop</strong></p>
            <p class="start-date">
              @
              {{ timeEntry.startDate}}
            </p>
            <p class="end-date">
              @
              {{ timeEntry.endDate}}
            </p>
          </div>
          <div class="text-center time-block">
            <h3 class="list-group-item-text total-time" :inner-html.prop="timeEntry.totalTime | formatTotal">
            </h3>
          </div>
          <div class="comment-section">
            <p>{{ timeEntry.comment }}</p>
          </div>
          <div class="entry-options">
            <button
              class="btn btn-xs btn-danger delete-button"
              @click="deleteTimeEntry(timeEntry)">
              X
            </button>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    timeEntries: Array
  },
  filters: {
    formatTotal: function (total) {
      let s = moment.duration(total).seconds()
      let m = moment.duration(total).minutes()
      let h = moment.duration(total).hours()

      let formatted = '<i class="glyphicon glyphicon-time"></i> ' + s + ' <small>seconds</small>'
      if (m >= 1) {
        formatted = '<i class="glyphicon glyphicon-time"></i> ' + m + ' <small>minutes</small>'
      }
      if (h >= 1) {
        formatted = '<i class="glyphicon glyphicon-time"></i> ' + h + ' <small>hours</small>'
      }
      return formatted
    }
  },
  methods: {
    // Get the index of the clicked time entry and splice it out
    deleteTimeEntry (timeEntry) {
      let index = this.timeEntries.indexOf(timeEntry)
      if (window.confirm('Are you sure you want to delete this time entry?')) {
        this.$emit('delete-entry', index)
      }
    }
  },
  events: {
    timeUpdate (timeEntry) {
      this.timeEntries.push(timeEntry)
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-group-item-text {
    margin: 0;
  }
  .user-details {
    border-right: 1px solid #ddd;
    padding-right: 20px;
    margin: 0;
  }
  .time-block {
    padding: 0 10px 10px;
    border-right: 1px solid #ddd;
    width: 150px;
  }
  .comment-section {
    padding: 20px;
    flex: 1;
  }
  .entry-options {
    align-self: flex-start;
  }
</style>
