import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    localmemory: service(),
    isDisabled : false,
    next:false,
    actions:{
        redirectTo : function(){
            this.set('isDisabled', true);
        
                this.get('localmemory').add('selectedLabel',this.get('label'));  
          
                this.set('next', true);              
        }
    }
});
