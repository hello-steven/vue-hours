<template>
  <div>
    <p><strong>Recent Entries:</strong></p>
    <div class="time-entries">
      <p v-if="!getRecentTimeEntries.length">- No time entries yet -</p>
      <div class="list-group">
        <a class="list-group-item" v-for="(timeEntry, entryId) in getRecentTimeEntries" @click="openDetails(entryId)" :key="entryId">
          <div class="user-details">
            <p><strong>Start/Stop</strong></p>
            <p class="start-date">
              @
              {{ timeEntry.startDate | formatDate }}
            </p>
            <p class="end-date">
              @
              {{ timeEntry.endDate | formatDate }}
            </p>
          </div>
          <div class="text-center time-block">
            <h3 class="list-group-item-text total-time">{{ timeEntry.startDate | calcDuration(timeEntry.endDate) }}</h3>
            <p class="text-center">hours : minutes : seconds</p>
          </div>
          <div class="comment-section">
            <p><strong>Project/Comment</strong></p>
            <p>{{ timeEntry.comment }}</p>
          </div>
          <div class="entry-options">
            <svg
              class="delete-button"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              title="delete entry"
              @click="deleteTimeEntry(entryId)">
              <path fill="#000" fill-rule="evenodd" clip-rule="evenodd" d="M17.999 7H5.99902V19C5.99902 20.104 6.89502 21 8.00002 21H15.999C17.105 21 17.999 20.104 17.999 19V7ZM14.499 2.99902H9.499L8.5 4.00002H5.999C5.448 4.00002 5 4.44802 5 4.99902V6.00002H19V4.99902C19 4.44802 18.552 4.00002 17.999 4.00002H15.5L14.499 2.99902Z"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  computed: mapGetters([
    'getRecentTimeEntries'
  ]),
  filters: {
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    },
    formatTotal: function (total) {
      // convert milliseconds to hh:mm:ss
      let date = new Date(null)
      date.setSeconds(total / 1000)
      let formatted = date.toISOString().substr(11, 8)

      return formatted
    },
    calcDuration: function (start, end) {
      let total = 0
      total += moment(end) - moment(start)

      // convert milliseconds to hh:mm:ss
      let date = new Date(null)
      date.setSeconds(total / 1000)
      let formatted = date.toISOString().substr(11, 8)

      return formatted
    }
  },
  methods: {
    openDetails (entryId) {
      this.$store.commit('showEntry', entryId)
    },
    deleteTimeEntry (entryId) {
      console.log({
        deleteEntry: entryId
      })
      if (window.confirm('Are you sure you want to delete this time entry?')) {
        this.$store.commit('deleteEntry', entryId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .time-entries {
    max-height: 350px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .list-group {
    margin-bottom: 0;
  }
  .list-group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;

    &:last-child {
      margin-bottom: 0;
    }
  }
  .list-group-item-text {
    margin: 0;
  }
  .user-details {
    border-right: 1px solid #ddd;
    padding-right: 20px;
    margin: 0;
  }
  .comment-section {
    padding: 20px;
    flex: 1;
  }
  .entry-options {
    align-self: flex-start;
  }
</style>
