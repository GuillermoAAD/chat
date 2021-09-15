<template>

  <div class="home">
    <!--
    <h3>Please login with your google account to continue</h3>
    <button @click="login">Login with google</button>
    -->

    <!-- The surrounding HTML is left untouched by FirebaseUI.
     Your app may use that space for branding, controls and other customizations.-->
    <h1>Welcome to My Awesome App</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script>
  //import firebase from 'firebase';
  //import firebaseui from 'firebaseui';

  import firebase from 'firebase/app';
  import * as firebaseui from 'firebaseui';
  import 'firebaseui/dist/firebaseui.css';
  

  export default {
    
    methods:{

      login(){
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...

          //Guardar los datos del usuario en la coleccion users

          this.$router.push('/');
          //this.$router.push('/').catch(()=>{});
          //if (this.$router.path != '/login') {
            //this.$router.push('/login')
          //}

        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

      }
    },
    mounted(){
      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      var uiConfig = {
        
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
              type: 'image', // 'audio'
              size: 'invisible', // 'invisible' or 'compact'
              badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
            },
            defaultCountry: 'MX',
            defaultNationalNumber: '1234567890',
            loginHint: '+521234567890'
          }
        ],
      };
      

      ui.start('#firebaseui-auth-container', uiConfig);

    },

  }
</script>
