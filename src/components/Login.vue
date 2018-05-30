<template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green white-text center">
          <h3><i>Login</i></h3>
          <form @submit.prevent="login">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email">
              <!-- <label class="white-text active" for="email">Email Address</label> -->
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password">
              <!-- <label class="white-text active" for="password">Password</label> -->
            </div>
            <button class="btn btn-large btn-extended grey lighten-4 black-text">Login</button>
          </form>          
        </div>
      </div>
    </div>
    <button @click="dummyLogin" class="btn btn-large btn-extended green lighten-4 black-text">Use test account</button>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            //alert(`You are logged in as ${user.email}`);            
            //this.$router.go({ path: this.$router.path });
            M.toast({ html: `You are logged in as ${user.email}` });
            this.$router.go({ path: "/" });
            //this.$router.push("/view/cols")
          },
          err => {
            alert(err.message);
          }
        );         
    },
    dummyLogin: function(){
      this.email="test@ipsos.com"
      this.password="asdQWE123"
      this.login()
    }
  }
};
</script>
<style>
input{
  border-color: white !important;
}
</style>

