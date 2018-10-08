<template>
  <div class="form-horizontal">
    <h2>Manual Time Entry</h2>
    <div class="form-group">
      <div class="col-sm-6">
        <label>Date</label>
        <input
          type="datetime-local"
          class="form-control"
          v-model="timeEntry.date"
          placeholder="Date"
        />
      </div>
      <div class="col-sm-6">
        <label>Hours</label>
        <input
          type="number"
          class="form-control"
          v-model="timeEntry.totalTime"
          placeholder="Hours"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <label>Project/Comments</label>
        <input
          type="text"
          class="form-control"
          v-model="timeEntry.comment"
          placeholder="Comment"
        />
      </div>
    </div>
    <button class="log" @click="save()">Log</button>
    <button class="danger" @click="clear()">Clear</button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      // We default the user object on
      // the timeEntry to have some user details
      timeEntry: {
        user: {
          firstName: 'Steven',
          lastName: 'Price',
          email: 'sprice@hansondodge.com'
        }
      },
      logStatus: false
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    }
  },
  methods: {
    save () {
      let timeEntry = this.timeEntry
      let formatDate = this.$options.filters.formatDate
      let endDate = moment(timeEntry.date).add(timeEntry.totalTime, 'h')
      let duration = timeEntry.totalTime * 3600000 // milliseconds
      let newEntry = {
        user: {
          firstName: 'Steven',
          lastName: 'Price',
          email: 'sprice@hansondodge.com'
        },
        branch: timeEntry.comment,
        comment: timeEntry.comment,
        totalTime: duration,
        startDate: formatDate(timeEntry.date),
        endDate: formatDate(endDate)
      }
      this.$store.commit('logEntry', newEntry)
      this.timeEntry = {
        firstName: 'Steven',
        lastName: 'Price',
        email: 'sprice@hansondodge.com'
      }
    },
    clear () {
      this.timeEntry = {
        firstName: 'Steven',
        lastName: 'Price',
        email: 'sprice@hansondodge.com'
      }
    }
  }
}
</script>
