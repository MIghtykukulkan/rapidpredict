import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
var mycontroller;

export default Route.extend({

  model(){
    mycontroller = this.controllerFor('home')
  },

  uploadPhoto: task(function * (file) {
      let response = yield file.upload('http://localhost:3000/fileupload');   
      if(response.status === 200){
        alert("upload successfull")
        mycontroller.set('next', true)      
      }
  }).maxConcurrency(1).enqueue(),

  actions: {
    uploadImage(file) {
      console.log("uploadimage is being called")
      get(this, 'uploadPhoto').perform(file);
    }
  }
});