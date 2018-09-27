<template>
  <div class="form-horizontal">
    <h2>Manual Time Entry</h2>
    <div class="form-group">
      <div class="col-sm-6">
        <label>Date</label>
        <input
          type="date"
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
        <label>Comment</label>
        <input
          type="text"
          class="form-control"
          v-model="timeEntry.comment"
          placeholder="Comment"
        />
      </div>
    </div>
    <button class="btn btn-primary" @click="save()">Start</button>
    <button class="btn btn-danger">Cancel</button>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // We default the user object on
      // the timeEntry to have some user details
      timeEntry: {
        user: {
          firstName: 'Steven',
          lastName: 'Price',
          email: 'sprice@hansondodge.com',
          image: './assets/logo.png'
        }
      },
      logStatus: false
    }
  },
  methods: {
    save () {
      let timeEntry = this.timeEntry
      // We dispatch the timeEntry so it can be pushed
      // onto the timeEntries array in the parent component
      this.$dispatch('timeUpdate', timeEntry)
      this.timeEntry = {}
    }
  }
}
</script>
