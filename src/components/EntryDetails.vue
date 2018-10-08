<template>
  <div class="entry-details-overlay">
    <div class="entry-details">
      <div class="fields" v-if="showDetail">
        <p><strong>Current Entry:</strong></p>
        <div class="list-group-item">
          <div class="user-details">
            <p><strong>Start/Stop</strong></p>
            <p class="start-date">
              <input
                type="datetime-local"
                class="form-control"
                v-model="updatedEntry.startDate"
                placeholder="Date"
              />
            </p>
            <p class="end-date">
              <input
                type="datetime-local"
                class="form-control"
                v-model="updatedEntry.endDate"
                placeholder="Date"
              />
            </p>
          </div>
          <div class="text-center time-block">
            <h3 class="list-group-item-text total-time">{{ updatedEntry.totalTime | formatTotal }}</h3>
            <p class="text-center">hours : minutes : seconds</p>
          </div>
          <div class="comment-section">
            <p><strong>Project/Comment</strong></p>
            <input type="text" placeholder="project-00-init-review" v-model="updatedEntry.comment">
          </div>
        </div>
      </div>
      <div class="tools">
        <button type="button" class="log" @click="updateEntry">update entry</button>
        <button type="button" class="danger" @click="closeDetail">cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'entry-details',
  data () {
    return {
      updatedEntry: null
    }
  },
  computed: mapGetters([
    'timeEntries',
    'showDetail',
    'showEntry'
  ]),
  created () {
    this.updatedEntry = this.timeEntries[this.showEntry]
  },
  filters: {
    formatTotal: function (total) {
      // convert milliseconds to hh:mm:ss
      let date = new Date(null)
      date.setSeconds(total / 1000)
      let formatted = date.toISOString().substr(11, 8)

      return formatted
    },
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    }
  },
  methods: mapActions([
    'closeDetail',
    'updateEntry'
  ])
}
</script>

<style lang="scss" scoped>
.entry-details-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255,255,255, .5);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
}
.entry-details {
  background-color: #fff;
  border: solid 4px #000;
  width: calc(100% - 1em);
  max-width: 750px;
  padding: 20px;
  margin-right: 5vw;
}
</style>
