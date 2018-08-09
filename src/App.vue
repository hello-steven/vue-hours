<template>
  <div id="app">
    <Sidebar class="sidebar" :time="totalTime"></Sidebar>
    <div class="main">
      <h1>Log Time</h1>
      <LogTime class="logger"></LogTime>
      <TimeEntries class="entries"></TimeEntries>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'

export default {
  name: 'app',
  components: {
    Sidebar,
    LogTime,
    TimeEntries
  },
  data () {
    return {
      // Start with the same value as our
      // first time entry. Hard-coded for now
      // because we'll use a different approach
      // in the next article anyway
      totalTime: 1.5
    }
  },
  events: {
    // Increment the totalTime value based on the new
    // time entry that is dispatched up
    timeUpdate (timeEntry) {
      this.totalTime += parseFloat(timeEntry.totalTime)
    },
    // Decrement totalTime when a time entry is deleted
    deleteTime (timeEntry) {
      this.totalTime -= parseFloat(timeEntry.totalTime)
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
</style>
