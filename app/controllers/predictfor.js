import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
   localmemory: service(),
   actions:{
    redirectTo:function(){
        if(this.get('progressOne')===undefined){
            alert('you have not selected the test datasize');
        }

        
        var model = this.get('model');
        var predictfor = [];
        for(var i=0;i<model.length;i++){
            predictfor.push(parseInt(model[i].val));
        }

        
        this.get('localmemory').add('test-size', this.get('progressOne'));
        this.get('localmemory').add('predictionPoint', predictfor);
        this.transitionToRoute('results');
    }
   }
});
