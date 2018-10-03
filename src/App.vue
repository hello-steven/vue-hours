<template>
  <div id="app">
    <Sidebar class="sidebar" :timeEntries="timeEntries" :time="totalTime" :runningTotal="runningTotal" :counter="counter" v-on:toggle-time="toggleTime" v-on:log-time="logTime"></Sidebar>
    <div class="main">
      <h1>Time Logs</h1>
      <hr>
      <div class="current-entry">
        <p><strong>Current Entry:</strong></p>
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
            <h3 class="list-group-item-text total-time" :inner-html.prop="counter.timestampStart | formatTotal(counter.timestampPause)"></h3>
            <p class="text-center">hours : minutes : seconds</p>
          </div>
          <div class="comment-section">
            <p><strong>Project/Comment</strong></p>
            <input type="text" placeholder="project-00-init-review" v-model="currentProject">
          </div>
          <div class="entry-options">
            <!-- <button
              class="delete-button danger"
              title="delete entry"
              @click="deleteCurrent()">
            </button> -->
            <svg
              class="delete-button"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              title="delete entry"
              @click="deleteCurrent()">
              <path fill="#000" fill-rule="evenodd" clip-rule="evenodd" d="M17.999 7H5.99902V19C5.99902 20.104 6.89502 21 8.00002 21H15.999C17.105 21 17.999 20.104 17.999 19V7ZM14.499 2.99902H9.499L8.5 4.00002H5.999C5.448 4.00002 5 4.44802 5 4.99902V6.00002H19V4.99902C19 4.44802 18.552 4.00002 17.999 4.00002H15.5L14.499 2.99902Z"/>
            </svg>
          </div>
        </div>
      </div>
      <hr>
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
    // let existingEntry = {
    //   user: {
    //     firstName: 'Steven',
    //     lastName: 'Price',
    //     email: 'sprice@hansondodge.com'
    //   },
    //   branch: 'inpro-66-headline-styles',
    //   comment: 'inpro-66-headline-styles',
    //   totalTime: 3093450,
    //   startDate: '2016-04-08 10:15 am',
    //   endDate: '2016-04-08 12:00 pm'
    // }
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
      timeEntries: [],
      runningTotal: 0
    }
  },
  mounted () {
    console.log({
      created: true
    })
    let newRunningTotal = 0
    this.timeEntries.map((entry) => {
      if (!entry.totalTime) return false
      newRunningTotal += entry.totalTime
    })
    this.runningTotal = newRunningTotal
    document.title = this.$options.filters.formatCounter(this.counter.s)
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    },
    formatCounter: function (totalSeconds) {
      var hours = Math.floor(totalSeconds / 3600)
      var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
      var seconds = totalSeconds - (hours * 3600) - (minutes * 60)

      // round seconds
      seconds = Math.round(seconds * 100) / 100

      var result = (hours < 10 ? '0' + hours : hours)
      result += ':' + (minutes < 10 ? '0' + minutes : minutes)
      result += ':' + (seconds < 10 ? '0' + seconds : seconds)
      return result
    },
    formatTotal: function (start, end) {
      let total = 0
      start.map((time, index) => {
        if (end[index]) total += end[index] - time
      })

      // convert milliseconds to hh:mm:ss
      let date = new Date(null)
      date.setSeconds(total / 1000)
      let formatted = date.toISOString().substr(11, 8)

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
        document.title = this.$options.filters.formatCounter(this.counter.s)
      }, 1000)
      return this.timer
    },
    getRunningTotal: function () {
      let newRunningTotal = 0
      this.timeEntries.map((entry) => {
        console.log({
          entry: entry
        })
        if (!entry.totalTime) return false
        newRunningTotal += entry.totalTime
      })
      this.runningTotal = newRunningTotal
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
      this.getRunningTotal()
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
      document.title = this.$options.filters.formatCounter(this.counter.s)
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
    align-items: flex-start;
    width: calc(100% - 2em);
    max-width: 1024px;
    box-sizing: border-box;
    margin: 3em auto;
  }
  .main {
    flex: 1;
  }
  .sidebar {
    width: calc(30% - 3em);
    margin-right: 2em;
    margin-bottom: 0;
    .panel-body:first-child {
      margin-bottom: 20px;
    }
  }
  .list-group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
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
    width: 200px;
  }
  .comment-section {
    padding: 20px;
    flex: 1;

    input {
      padding-left: .25em;
    }
  }
  .entry-options {
    align-self: flex-start;
  }
  .entries,
  .current-entry {
    background-color: #ffef85;
    padding: 1em;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .entries {
    background-color: #85e9ff;
  }
  .delete-button {
    width: 30px;
    height: 30px;
    padding: .25em;
    font-size: 12px;
    line-height: 1;
    border-radius: 3px;
    border: solid 2px #000;
    background-color: rgb(255, 133, 133);

    path {
      fill: #fff;
    }
  }

  /* bootstrap overrides */
  .panel-default {
    border-color: #333;
    border-radius: 0;
    border-width: 4px;
  }
  .panel-default > .panel-heading {
    border: none;
  }
</style>
