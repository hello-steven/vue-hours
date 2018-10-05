<template>
  <div class="authorize-wrapper">
    <h1>Jira Sign In</h1>
    <p>Please sign in to Jira to connect the time tracker app.</p>
    <div class="panel panel-default jira-form">
      <label>Username</label><br>
      <input class="form-control" type="text" name="username" id="username" placeholder="username" v-model="jiraUser"><br>
      <label>Password</label><br>
      <input class="form-control" type="password" name="jira_password" id="jira_password" v-model="jiraPass"><br>
      <button type="button" :disabled="authorized === true" @click="connect()">Connect</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorizeAccount',
  data () {
    return {
      authorized: false,
      jiraUser: null,
      jiraPass: null
    }
  },
  mounted () {
    // this.authorized = true
    // let request = new Request('http://jira.hansondodge.com/rest/auth/1/session', {
    //   method: 'get',
    //   headers: new Headers({
    //     'Content-Type': 'application/json'
    //   })
    // })
    // fetch(request).then(function (response) {
    //   console.log({
    //     response: response
    //   })
    //   // this.$emit('jira-connect', {token: true})
    // }).catch(function (err) {
    //   console.log({
    //     error: err
    //   })
    //   // this.authorized = false
    // })
  },
  methods: {
    connect () {
      this.authorized = true
      let request = new Request('https://jira.hansondodge.com/rest/api/2/myself', {
        method: 'get',
        mode: 'no-cors',
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(this.jiraUser + ':' + this.jiraPass),
          'Content-Type': 'application/json'
        })
      })
      fetch(request).then(function (response) {
        console.log({
          response: response
        })
        // this.$emit('jira-connect', {token: true})
      }).catch(function (err) {
        console.log({
          error: err
        })
        this.authorized = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .jira-form {
    max-width: 300px;
    padding: 1em;
    display: block;
  }
  input {
    color: #000;
    border: 2px solid #000;
  }
</style>
