<template>
  <div id="app">
    <Sidebar class="sidebar" :timeEntries="timeEntries" :time="totalTime" :counter="counter" v-on:toggle-time="toggleTime" v-on:log-time="logTime"></Sidebar>
    <div class="main">
      <h1>Time Logs</h1>
      <hr>
      <div class="current-entry">
        <p>Current Entry:</p>
        <div class="list-group-item" v-if="counter.timestampStart.length">
          <div class="user-details">
            <p><strong>Start/Stop</strong></p>
            <p class="start-date">
              @
              {{counter.timestampStart[0] | formatDate}}
            </p>
            <p class="end-date" v-if="counter.timestampPause.length">
              @
              {{ counter.timestampPause[counter.timestampPause.length] | formatDate }}
            </p>
          </div>
          <div class="text-center time-block" v-if="counter.timestampPause.length">
            <h3 class="list-group-item-text total-time" :inner-html.prop="counter.timestampStart | formatTotal(counter.timestampPause)">
            </h3>
          </div>
          <div class="comment-section">
            <input type="text" placeholder="add comment" v-model="currentProject">
          </div>
          <div class="entry-options">
            <button
              class="btn btn-xs btn-danger delete-button"
              @click="deleteCurrent()">
              X
            </button>
          </div>
        </div>
      </div>
      <TimeEntries class="entries" :timeEntries="timeEntries" v-on:delete-entry="deleteEntry"></TimeEntries>
      <hr>
      <LogTime class="logger" v-on:log-entry="logEntry"></LogTime>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    Sidebar,
    LogTime,
    TimeEntries
  },
  data () {
    let existingEntry = {
      user: {
        firstName: 'Steven',
        lastName: 'Price',
        email: 'sprice@hansondodge.com'
      },
      branch: 'inpro-66-headline-styles',
      comment: 'inpro-66-headline-styles',
      totalTime: 3093450,
      startDate: '2016-04-08 10:15 am',
      endDate: '2016-04-08 12:00 pm'
    }
    return {
      // Start with the same value as our
      // first time entry. Hard-coded for now
      // because we'll use a different approach
      // in the next article anyway
      totalTime: 0,
      currentName: null,
      currentProject: null,
      counter: {
        s: 0,
        m: 0,
        h: 0,
        timestampStart: [],
        timestampPause: [],
        timestampEnd: 0,
        counterStatus: false,
        timer: null
      },
      timeEntries: [existingEntry]
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    },
    formatTotal: function (start, end) {
      let total = 0
      start.map((time, index) => {
        if (end[index]) total += end[index] - time
      })
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
    toggleTime () {
      this.counter.counterStatus = !this.counter.counterStatus
      if (!this.counter.counterStatus) {
        clearInterval(this.timer)
        this.timer = null
        if (!this.counter.timestampPause[0]) {
          this.counter.timestampPause = [Date.now()]
        } else {
          this.counter.timestampPause.push(Date.now())
        }
        this.counter.timestampEnd = Date.now()
      }
      if (!this.counter.counterStatus) return false
      if (!this.counter.timestampStart[0]) {
        this.counter.timestampStart = [Date.now()]
      } else {
        this.counter.timestampStart.push(Date.now())
      }
      this.timer = window.setInterval(() => {
        this.counter.s++
        // if (this.counter.s >= 59) {
        //   this.counter.s = 0
        //   this.counter.m++
        // } else {
        //   this.counter.s++
        // }
        // if (this.counter.m >= 59) {
        //   this.counter.m = 0
        //   this.counter.h++
        // }
        // if (this.counter.h >= 7) {
        //   this.counter.h = 0
        //   this.counter.d++
        // }
      }, 1000)
      return this.timer
    },
    logTime () {
      let formatDate = this.$options.filters.formatDate
      let newCounter = this.counter
      let total = 0
      newCounter.timestampStart.map((time, index) => {
        if (newCounter.timestampPause[index]) total += newCounter.timestampPause[index] - time
      })
      this.counter = {
        s: 0,
        m: 0,
        h: 0,
        timestampStart: [],
        timestampPause: [],
        timestampEnd: 0,
        counterStatus: false,
        timer: null
      }
      let newEntry = {
        user: {
          firstName: 'Steven',
          lastName: 'Price',
          email: 'sprice@hansondodge.com'
        },
        branch: this.currentProject,
        comment: this.currentProject,
        totalTime: total,
        startDate: formatDate(newCounter.timestampStart[0]),
        endDate: formatDate(newCounter.timestampEnd)
      }
      this.timeEntries.unshift(newEntry)
    },
    logEntry (timeEntry) {
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
      this.timeEntries.unshift(newEntry)
    },
    deleteCurrent () {
      if (this.counter.counterStatus) {
        this.toggleTime()
      }
      this.counter = {
        s: 0,
        m: 0,
        h: 0,
        timestampStart: [],
        timestampPause: [],
        timestampEnd: 0,
        counterStatus: false,
        timer: null
      }
    },
    deleteEntry (index) {
      this.timeEntries.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  width: calc(100% - 2em);
  max-width: 1024px;
  box-sizing: border-box;
  margin: 3em auto;
}
.main {
  flex: 1;
}
.sidebar {
  width: calc(25% - 3em);
  margin-right: 2em;
}
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
