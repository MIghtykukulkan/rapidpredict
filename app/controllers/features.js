import Controller from '@ember/controller';

export default Controller.extend({
    selectedFeatures: Ember.computed.filterBy('model.data','pre_checked',true),
    init(){
      this._super(...arguments);
     // this.set('AllCountries',[{"code":"US", "name":"USA"}]);
      //this.set('countries',["US", "CA"]);
    }

});
