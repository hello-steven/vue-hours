<template>
  <div id="connect">
    <p>This is a oauth connection page</p>
    <AuthorizeAccount></AuthorizeAccount>
  </div>
</template>

<script>
import AuthorizeAccount from '@/components/AuthorizeAccount.vue'
var OAuth = require('oauth')
var fs = require('fs')

export default {
  name: 'connect',
  components: {
    AuthorizeAccount
  },
  mounted: function () {
    let headers = new Headers()
    let init = { method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    }
    let jiraInit = {
      baseURL: process.env.VUE_APP_JIRA_URL,
      hostURL: process.env.VUE_APP_HOST_URL,
      requestToken: '/plugins/servlet/oauth/request-token',
      accessToken: '/plugins/servlet/oauth/access-token',
      consumerKey: process.env.VUE_APP_CKEY
    }

    console.log({
      mounted: true,
      baseURL: jiraInit.baseURL
    })

    let oa = new OAuth(
      jiraInit.baseURL + jiraInit.requestToken,
      jiraInit.baseURL + jiraInit.accessToken,
      jiraInit.consumerKey,
      fs.readFileSync('/jira.pem', 'utf8'),
      '1.0',
      jiraInit.hostURL + '/connect/callback',
      'RSA-SHA1'
    )

    let session = this.$session

    oa.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret) {
      if (error) {
        console.log({
          connect: true,
          errorData: error.data
        })
        // eslint-disable-next-line
        this.$router.push({path: '/', query: 'error'})
      } else {
        // eslint-disable-next-line
        session.oa = oa
        // eslint-disable-next-line
        session.oauth_token = oauthToken
        // eslint-disable-next-line
        session.oauth_token_secret = oauthTokenSecret

        let request = new Request(
          jiraInit.baseURL + '/plugins/servlet/oauth/authorize?oauth_token=' + oauthToken,
          init
        )

        fetch(request).then(function (response) {
          console.log({
            connect: true,
            blob: response.blob()
          })
          return response.blob()
        }).then(function (redirect) {
          console.log({
            connect: true,
            redirect: redirect
          })
          return this.$router.push({path: '/', query: redirect})
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  #connect {
    width: 90%;
    max-width: 1024px;
    margin: 3em auto 1em;
  }
</style>
