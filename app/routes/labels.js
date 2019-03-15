import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    localmemory: service(),

    model(){

            var labelArray =  this.get('localmemory').read('remainingfeatures');
           // var reducedArray = labelArray.map(x => x.name);
            console.log(labelArray);
            return labelArray;
            
    }
});
