<template>
  <div id="connect">
    <p>This is a oauth connection page</p>
    <AuthorizeAccount></AuthorizeAccount>
  </div>
</template>

<script>
import AuthorizeAccount from '@/components/AuthorizeAccount.vue'
import OAuth from 'oauth'
import fs from 'fs'

export default {
  name: 'connect',
  components: {
    AuthorizeAccount
  },
  mounted: function () {
    let jiraInit = {
      baseUrl: process.env.VUE_APP_HOST_URL,
      requestToken: '/plugins/servlet/oauth/request-token',
      accessToken: '/plugins/servlet/oauth/access-token',
      consumerKey: process.env.VUE_APP_CKEY
    }

    let oa = new OAuth(
      jiraInit.baseUrl + jiraInit.requestToken,
      jiraInit.baseUrl + jiraInit.accessToken,
      jiraInit.consumerKey,
      fs.readFileSync('jira.pem', 'utf8'),
      '1.0',
      jiraInit.baseUrl + '/connect/callback',
      'RSA-SHA1'
    )

    oa.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret) {
      if (error) {
        console.log({errorData: error.data})
        // eslint-disable-next-line
        response.send('Error getting OAuth access token')
      } else {
        // eslint-disable-next-line
        req.session.oa = oa
        // eslint-disable-next-line
        req.session.oauth_token = oauthToken
        // eslint-disable-next-line
        req.session.oauth_token_secret = oauthTokenSecret
        // eslint-disable-next-line
        return res.redirect(jiraInit.baseUrl + '/plugins/servlet/oauth/authorize?oauth_token=' + oauthToken)
      }
    })
  }
}
</script>
