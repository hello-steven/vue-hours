<script>
import OAuth from 'oauth'
import fs from 'fs'

export default {
  name: 'callback',
  mounted: function () {
    // eslint-disable-next-line
    var oa = new OAuth(req.session.oa._requestUrl,
      // eslint-disable-next-line
      req.session.oa._accessUrl,
      // eslint-disable-next-line
      req.session.oa._consumerKey,
      fs.readFileSync('./jira.pem', 'utf8'),
      // eslint-disable-next-line
      req.session.oa._version,
      // eslint-disable-next-line
      req.session.oa._authorize_callback,
      // eslint-disable-next-line
      req.session.oa._signatureMethod
    )
    oa.getOAuthAccessToken(
      // eslint-disable-next-line
      req.session.oauth_token,
      // eslint-disable-next-line
      req.session.oauth_token_secret,
      // eslint-disable-next-line
      req.param('oauth_verifier'),
      // eslint-disable-next-line
      function (error, oauth_access_token, oauth_access_token_secret, results2) {
        if (error) {
          console.log({error: error})
        } else {
          // store the access token in the session
          // eslint-disable-next-line
          req.session.oauth_access_token = oauth_access_token
          // eslint-disable-next-line
          req.session.oauth_access_token_secret = oauth_access_token_secret
          // eslint-disable-next-line
          res.send({
            message: 'successfully authenticated.',
            // eslint-disable-next-line
            access_token: oauth_access_token,
            // eslint-disable-next-line
            secret: oauth_access_token_secret
          })
        }
      }
    )
  }
}
</script>
