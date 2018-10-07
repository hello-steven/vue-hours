<script>
var OAuth = require('oauth')

export default {
  name: 'callback',
  mounted: function () {
    let session = this.$session
    // eslint-disable-next-line
    let oa = new OAuth(session.oa._requestUrl,
      session.oa._accessUrl,
      session.oa._consumerKey,
      process.env.VUE_APP_PEM,
      session.oa._version,
      session.oa._authorize_callback,
      session.oa._signatureMethod
    )
    oa.getOAuthAccessToken(
      session.oauth_token,
      session.oauth_token_secret,
      this.$router.push({ path: '/', query: 'oauth_verifier' }),
      // eslint-disable-next-line
      function (error, oauth_access_token, oauth_access_token_secret, results2) {
        if (error) {
          console.log({ error: error })
        } else {
          // store the access token in the session
          // eslint-disable-next-line
          session.oauth_access_token = oauth_access_token
          // eslint-disable-next-line
          session.oauth_access_token_secret = oauth_access_token_secret
          this.$router.push({
            name: 'home',
            query: {
              message: 'success',
              // eslint-disable-next-line
              access_token: oauth_access_token,
              // eslint-disable-next-line
              secret: oauth_access_token_secret
            }
          })
        }
      }
    )
  }
}
</script>
