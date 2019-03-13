import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

var mycontroller;

export default Route.extend({
  localmemory: service(),

  model(){
    mycontroller = this.controllerFor('home')
    mycontroller.set('next', false)  
  },

  uploadPhoto: task(function * (file) {
      let response = yield file.upload('https://predictcore.herokuapp.com/uploadscv');
     
      if(response.status === 200){
      
        this.get('localmemory').add("uploadinfo", response.body)
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