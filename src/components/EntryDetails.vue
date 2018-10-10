<template>
  <div class="entry-details-overlay">
    <div class="entry-details">
      <div class="fields" v-if="showDetail && updatedEntry != null">
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
            <h3 class="list-group-item-text total-time">{{ updatedEntry.startDate | calcDuration(updatedEntry.endDate) }}</h3>
            <p class="text-center">hours : minutes : seconds</p>
          </div>
          <div class="comment-section">
            <p><strong>Project/Comment</strong></p>
            <input type="text" placeholder="project-00-init-review" v-model="updatedEntry.comment">
          </div>
        </div>
      </div>
      <div class="tools">
        <button type="button" class="log" @click="updateEntry()">update entry</button>
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
      updatedEntry: {}
    }
  },
  computed: mapGetters([
    'showDetail',
    'getEditableEntry'
  ]),
  mounted () {
    let startDate = moment(this.getEditableEntry.startDate).format().slice(0, -6)
    let endDate = moment(this.getEditableEntry.endDate).format().slice(0, -6)
    this.$set(this.updatedEntry, 'branch', this.getEditableEntry.comment)
    this.$set(this.updatedEntry, 'comment', this.getEditableEntry.comment)
    this.$set(this.updatedEntry, 'totalTime', this.getEditableEntry.totalTime)
    this.$set(this.updatedEntry, 'user', this.getEditableEntry.user)
    // this.updatedEntry = this.getEditableEntry
    this.$set(this.updatedEntry, 'startDate', startDate)
    this.$set(this.updatedEntry, 'endDate', endDate)
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MM-DD-YYYY h:mm:ss a')
    },
    formatDatepicker: function (date) {
      return moment(date).format()
    },
    calcDuration: function (start, end) {
      let total = 0
      total += moment(end) - moment(start)

      // convert milliseconds to hh:mm:ss
      let date = new Date(null)
      date.setSeconds(total / 1000)
      if (!(date instanceof Date) || isNaN(date)) return 0
      let formatted = date.toISOString().substr(11, 8)

      return formatted
    }
  },
  methods: {
    ...mapActions([
      'closeDetail'
    ]),
    updateEntry () {
      let formatDate = this.$options.filters.formatDate
      let newUpdatedEntry = {
        branch: this.updatedEntry.comment,
        comment: this.updatedEntry.comment,
        startDate: formatDate(this.updatedEntry.startDate),
        endDate: formatDate(this.updatedEntry.endDate),
        totalTime: this.updatedEntry.totalTime,
        user: this.updatedEntry.user
      }
      this.$store.commit('updateEntry', newUpdatedEntry)
    }
  }
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
