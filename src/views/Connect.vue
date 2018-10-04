<template>
  <div id="connect">
    <p>This is a oauth connection page</p>
    <AuthorizeAccount></AuthorizeAccount>
  </div>
</template>

<script>
import AuthorizeAccount from '@/components/AuthorizeAccount.vue'
let OAuth = require('oauth')
let fs = require('fs')

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
      baseURL: jiraInit.baseUrl
    })

    let oa = new OAuth(
      jiraInit.baseUrl + jiraInit.requestToken,
      jiraInit.baseUrl + jiraInit.accessToken,
      jiraInit.consumerKey,
      fs.readFileSync('jira.pem', 'utf8'),
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
          jiraInit.baseUrl + '/plugins/servlet/oauth/authorize?oauth_token=' + oauthToken,
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
