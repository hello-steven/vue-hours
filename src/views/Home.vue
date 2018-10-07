<template>
  <div id="home">
    <Sidebar class="sidebar"></Sidebar>
    <div class="main">
      <h1>Time Tracker</h1>
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
          <div class="entry-options" v-if="!counter.counterStatus">
            <svg
              class="delete-button"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              title="delete entry"
              @click="deleteCurrent">
              <path fill="#000" fill-rule="evenodd" clip-rule="evenodd" d="M17.999 7H5.99902V19C5.99902 20.104 6.89502 21 8.00002 21H15.999C17.105 21 17.999 20.104 17.999 19V7ZM14.499 2.99902H9.499L8.5 4.00002H5.999C5.448 4.00002 5 4.44802 5 4.99902V6.00002H19V4.99902C19 4.44802 18.552 4.00002 17.999 4.00002H15.5L14.499 2.99902Z"/>
            </svg>
          </div>
        </div>
      </div>
      <hr>
      <TimeEntries class="entries"></TimeEntries>
      <hr>
      <LogTime class="logger"></LogTime>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import TimeEntries from '@/components/TimeEntries.vue'
import LogTime from '@/components/LogTime.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    Sidebar,
    LogTime,
    TimeEntries
  },
  computed: {
    ...mapGetters([
      'currentName',
      'counter',
      'getTimerSeconds',
      'timeEntries',
      'getRunningTotal'
    ]),
    currentProject: {
      set(currentProject) {
        this.$store.commit('updateProject', currentProject)
      },
      get() {
        return this.$store.state.currentProject
      }
    }
  },
  mounted () {
    this.$store.watch(
      (state)=>{
        return this.$store.getters.getTimerSeconds
      },
      (time)=> {
        document.title = time
      }
    )
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    },
    formatCounter: function (totalSeconds) {
      let hours = Math.floor(totalSeconds / 3600)
      let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
      let seconds = totalSeconds - (hours * 3600) - (minutes * 60)

      // round seconds
      seconds = Math.round(seconds * 100) / 100

      let result = (hours < 10 ? '0' + hours : hours)
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
    deleteCurrent () {
      this.$store.commit('deleteCurrent')
    }
  }
}
</script>
