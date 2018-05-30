<template>
  <div id="dashboard" style="margin: 0px 50px;">    
    <div class="row z-depth-3 teal darken-1 white-text hide-on-small-only">      
        <h6 class="col m2 s12">Task name</h6>
        <h6 class="col m3 s12">Description</h6>        
        <h6 class="col m2 s12">Project</h6>
        <h6 class="col m1 s12">Env</h6>
        <h6 class="col m2 s12">Status</h6>
        <h6 class="col m1 s12">Deadline</h6>        
        <h6 class="col m1 iconContainer">
          <span class="red-text">Close</span>
          <span class="white-text">Edit</span>
        </h6>
    </div>
    <!-- view in progress -->
    <div  v-for="task in tasks" v-bind:key="task.id" class="row z-depth-2">        
        <div class="col m2 s12 truncate"><b>{{task.task_name}}</b></div>
        <div class="col m3 s12" v-html="task.task_description"></div>               
    </div>
    
  </div>  
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase";

export default {
  name: "dashboard",
  data() {
    return {
      isLoggedIn: false,
      hasDone: false,
      viewDone: null,
      tasks: [],
      logData: []
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      db
        //.collection(firebase.auth().currentUser.uid)        
        .collection("Tasks")                
        .onSnapshot(querySnapshot => {
          this.tasks = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              task_name: doc.data().tName,
              task_description: doc.data().tDescription.replace(/\n/g, "<br/>"),              
            };
            this.tasks.push(data);
          });
        });
      
    }
  }
};
</script>

<style scoped>
.iconContainer {
  float: right;
  text-align: right;
}
.fa-trash-alt {
  color: #f5764e;
}
.fa-edit {
  color: #00bcd4;
}
.fas {
  opacity: 0.6;
}
.fas:hover {
  opacity: 1;
}
</style>


