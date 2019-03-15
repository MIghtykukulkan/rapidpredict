import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    next:false,
    localmemory: service(),
    selectedFeatures: Ember.computed.filterBy('model.data','pre_checked',true),
    init(){
      this._super(...arguments);
     // this.set('AllCountries',[{"code":"US", "name":"USA"}]);
      //this.set('countries',["US", "CA"]);
    },
    remainingFeatures: Ember.computed.filterBy('model.data','pre_checked',false),
   
    actions:{
      
      redirectolabel: function(){
        this.set('next', true)
        this.get('localmemory').add("selectedfeatures", this.get('selectedFeatures').map(x => x.name));
        this.get('localmemory').add("remainingfeatures", this.get('remainingFeatures').map(x => x.name));
      }
    }

});
