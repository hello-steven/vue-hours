<template>
  <div class="panel panel-default">
    <div class="panel-body text-center">
      <h2>Project Timer</h2>
      <p class="counter">{{counter.s | formatCounter}}</p>
      <button class="timer" :class="{'active': counter.counterStatus}" @click="toggleTime">{{counter.counterStatus ? 'Pause' : 'Start'}}</button>
      <button class="log" :disabled="counter.s > 0 && !counter.counterStatus ? false : true" @click="logTime">Log</button>
    </div>
    <div class="panel-heading">
      <h2 class="text-center">Total Time</h2>
    </div>
    <div class="panel-body">
      <h2 class="text-center">{{ getRunningTotal | formatRunningTotal }}</h2>
      <p class="text-center">hours : minutes : seconds</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Sidebar',
  computed: mapGetters([
    'counter',
    'currentProject',
    'getRunningTotal',
  ]),
  filters: {
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
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    },
    formatRunningTotal: function (runningTotal) {
      // convert milliseconds to hh:mm:ss
      let date = new Date(null)
      date.setSeconds(runningTotal / 1000)
      let newTime = date.toISOString().substr(11, 8)
      return newTime
    }
  },
  methods: {
    ...mapActions([
      'toggleTime'
    ]),
    logTime () {
      let formatDate = this.$options.filters.formatDate
      let newCounter = this.counter
      let total = 0
      newCounter.timestampStart.map((time, index) => {
        if (newCounter.timestampPause[index]) total += newCounter.timestampPause[index] - time
      })
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
      this.$store.commit('logTime', newEntry)
    },
  }
}
</script>

<style lang="scss">
.counter {
  font-size: 28px;
  font-weight: bold;
}
button {
  background-color: rgb(133, 255, 216);
  padding: 1em;
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  transition: background .25s, box-shadow .05s;
  border: solid #000 2px;
  box-shadow: 3px 3px 0px #000;
  border-radius: 4px;
  &:first-of-type {
    margin-right: .5em;
  }
  &.log {
    background-color: rgb(133, 233, 255);
  }
  &.active,
  &.log.active {
    background-color: rgb(255, 239, 133);
  }
  &:disabled,
  &.log:disabled {
    background-color: gray;
  }
  &.danger {
    background-color: rgb(255, 133, 133);
  }
  &:active {
    box-shadow: none;
  }
  &:hover {
    box-shadow: 1px 1px 0px #000;
  }
}
</style>
