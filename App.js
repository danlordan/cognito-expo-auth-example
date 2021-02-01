import * as React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useAuthRequest } from 'expo-auth-session'
import {Button, Alert } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

export default function AuthFlowNav () {
  const [loggedIn, setLoggedIn] = React.useState(null)
  // Endpoint
  const discoveryDocument = {
    authorizationEndpoint:
      'https://<YOUR DOMAIN>.auth.us-east-1.amazoncognito.com/login'
      // Your domain can be found at User Pool -> Domain Name (under App integration)
  }
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '<YOUR CLIENT ID>',
      // clientID can be found at App Client Settings (Under App integration) 
      scopes: ['email', 'openid', 'aws.cognito.signin.user.admin'],
      responseType: 'code',
      redirectUri: '<YOUR REDIRECT URI>'
      // Redirect URI is the Callback URL(s) in App Client Settings (Under App integration)
    },
    discoveryDocument
  )
  React.useEffect(() => {
    if (response) {
      if (response.error) {
        Alert.alert(
          'Authentication error',
          response.params.error_description || 'something went wrong'
        )
        return
      }
      if (response.type === 'success') {
        setLoggedIn(true)
      }
    }
  }, [response])
  console.log(response)
  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}

