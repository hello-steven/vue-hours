<template>
  <div class="panel panel-default">
    <div class="panel-body text-center">
      <h2>Project Timer</h2>
      <p class="counter">{{counter.s | formatCounter}}</p>
      <button class="timer" :class="{'active': counter.counterStatus}" @click="$emit('toggle-time')">{{counter.counterStatus ? 'Pause' : 'Start'}}</button>
      <button class="log" :disabled="counter.s > 0 && !counter.counterStatus ? false : true" @click="$emit('log-time')">Log</button>
    </div>
    <div class="panel-heading">
      <h2 class="text-center">Total Time</h2>
    </div>
    <div class="panel-body">
      <h2 class="text-center">{{ timeEntries | formatRunningTotal }}</h2>
      <p class="text-center">hours : minutes : seconds</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    time: Number,
    counter: Object,
    timeEntries: Array,
    runningTotal: Number
  },
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
    formatRunningTotal: function (entries) {
      let newRunningTotal = 0
      entries.map((entry) => {
        newRunningTotal += entry.totalTime
      })

      // convert milliseconds to hh:mm:ss
      let date = new Date(null)
      date.setSeconds(newRunningTotal / 1000)
      let newTime = date.toISOString().substr(11, 8)

      return newTime
    }
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
  transition: background .25s;
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
    background-color: rgb(255, 133, 143);
  }
  &:disabled,
  &.log:disabled {
    background-color: gray;
  }
  &:active {
    box-shadow: none;
  }
}
</style>
