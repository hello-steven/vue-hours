import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
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
  timeEntries: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  toggleTime: (state) => {
    state.counter.counterStatus = !state.counter.counterStatus
    if (!state.counter.counterStatus) {
      clearInterval(state.timer)
      state.timer = null
      if (!state.counter.timestampPause[0]) {
        state.counter.timestampPause = [Date.now()]
      } else {
        state.counter.timestampPause.push(Date.now())
      }
      state.counter.timestampEnd = Date.now()
    }
    if (!state.counter.counterStatus) return false
    if (!state.counter.timestampStart[0]) {
      state.counter.timestampStart = [Date.now()]
    } else {
      state.counter.timestampStart.push(Date.now())
    }
    state.timer = window.setInterval(() => {
      state.counter.s++
    }, 1000)
    state.timer
  },
  logTime (state, newEntry) {
    state.counter = {
      s: 0,
      m: 0,
      h: 0,
      timestampStart: [],
      timestampPause: [],
      timestampEnd: 0,
      counterStatus: false,
      timer: null
    }
    state.timeEntries.unshift(newEntry)
    state.currentProject = null
  },
  logEntry (state, newEntry) {
    state.timeEntries.unshift(newEntry)
    state.currentProject = null
  },
  deleteCurrent (state) {
    state.counter = {
      s: 0,
      m: 0,
      h: 0,
      timestampStart: [],
      timestampPause: [],
      timestampEnd: 0,
      counterStatus: false,
      timer: null
    }
    state.currentProject = null
  },
  deleteEntry (state, entryId) {
    console.log({
      entryId: entryId
    })
    state.timeEntries.splice(entryId, 1)
  },
  updateProject (state, currentProject) {
    state.currentProject = currentProject
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  toggleTime: ({ commit }) => commit ('toggleTime'),
  deleteCurrent ({ commit, state }) {
    if (state.counter.counterStatus) commit('toggleTime')
    commit('deleteCurrent')
  },
  deleteEntry: ({ commit, entryId }) => commit ('deleteEntry', entryId),
  logTime: ({ commit, newEntry }) => commit ('logTime', newEntry),
  logEntry: ({ commit, newEntry }) => commit ('logEntry', newEntry)
}

// getters are functions
const getters = {
  currentName: state => state.currentName,
  currentProject: state => state.currentProject,
  counter: state => state.counter,
  getTimerSeconds: state => {
    let hours = Math.floor(state.counter.s / 3600)
    let minutes = Math.floor((state.counter.s - (hours * 3600)) / 60)
    let seconds = state.counter.s - (hours * 3600) - (minutes * 60)

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    let result = (hours < 10 ? '0' + hours : hours)
    result += ':' + (minutes < 10 ? '0' + minutes : minutes)
    result += ':' + (seconds < 10 ? '0' + seconds : seconds)
    return result
  },
  timeEntries: state => state.timeEntries,
  getRecentTimeEntries: state => {
    function sortRecentTime(a,b) {
      var dateA = new Date(a.endDate).getTime()
      var dateB = new Date(b.endDate).getTime()
      return dateB > dateA ? 1 : -1 
    }
    return state.timeEntries.sort(sortRecentTime)
  },
  getRunningTotal: state => {
    let newRunningTotal = 0
    state.timeEntries.map((entry) => {
      if (!entry.totalTime) return false
      newRunningTotal += entry.totalTime
    })
    return newRunningTotal
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
