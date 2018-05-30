<template>
  <nav>
    <div class="nav-wrapper brown lighten-1">
        <span v-if="isLoggedIn" style="margin-left:20px" class="brand-logo left hide-on-small-only"> <i class="large material-icons tooltipped" style="color:#8bbf8b"  data-position="right" v-bind:data-tooltip="currentUser">account_circle</i></span>
      <ul id="nav-mobile" class="right">       
        <li v-if="isLoggedIn"><router-link to="/" >View Dashboard</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login" class="">Login</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/register" class="">Register</router-link></li>
        <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {      
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
   mounted() {     
    $('.tooltipped').tooltip();
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
           this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>
<style>
.router-link-exact-active {
  background: #6e7686
}
</style>
