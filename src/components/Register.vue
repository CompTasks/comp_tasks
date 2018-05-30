<template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel grey lighten-4 black-text center">
          <h3>Register</h3>
          <form @submit.prevent="register">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email" required>
              <label for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password" required>
              <label for="password">Password</label>
            </div>
            <button class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from "./firebaseInit";

export default {
  name: 'register',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register: function(e) {
      //var allowedUsers=['ciprian.ciresaru@','ovidiu.calburean@','ionut.tuns@','anamaria.taras@']
      var allowedUsers="@ipsos.com"
      //if(allowedUsers.indexOf( this.email)!=-1){
        if(this.email.indexOf(allowedUsers)!=-1){
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // console.log(user);
            //alert(`Account Created for ${user.email}`);            
             M.toast({html: `Account Created for ${user.email}`})
              this.$router.go({ path: "/" });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
      }else{
        //alert ("You are not authorized to register.")
        M.toast({html: "You are not authorized to register."})
        this.email= '',
        this.password= ''
      }
      
    }
  }
};
</script>