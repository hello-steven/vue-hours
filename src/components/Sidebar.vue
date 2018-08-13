<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h1 class="text-center">Total Time</h1>
    </div>
    <div class="panel-body">
      <h1 class="text-center">{{ time }} hours</h1>
    </div>
    <div class="panel-body text-center">
      <p class="counter">{{counter.s | formatCounter}}</p>
      <button class="timer" :class="{'active': counterStatus}" @click="toggleTime()">{{counterStatus ? 'Stop' : 'Start'}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    time: Number
  },
  data () {
    return {
      counter: {
        s: 0,
        m: 0,
        h: 0,
        d: 0
      },
      counterStatus: false,
      timer: null
    }
  },
  filters: {
    formatCounter: function(totalSeconds) {
      var hours   = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
      var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

      // round seconds
      seconds = Math.round(seconds * 100) / 100

      var result = (hours < 10 ? "0" + hours : hours);
          result += ":" + (minutes < 10 ? "0" + minutes : minutes);
          result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
      return result;
    }
  },
  methods: {
    toggleTime () {
      this.counterStatus = !this.counterStatus
      if (!this.counterStatus) {
        clearInterval(this.timer)
        this.timer = null
      }
      if (!this.counterStatus) return false
      this.timer = window.setInterval(() => {
        this.counter.s++;
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
      this.timer()
    }
  }
}
</script>

<style scss>
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
}
button.active {
  background-color: rgb(255, 133, 143);
}
button:active {
  box-shadow: none;
}
</style>
