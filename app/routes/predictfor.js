import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    localmemory: service(),
    model(){
        var selectedFeatures =  this.get('localmemory').read('selectedfeatures');
        this.controllerFor('predictfor')
        .set('datasize',this.get('localmemory').read('data-size'));
        //var selectedFeatures = ['feature1', 'feature2', 'feature3'];

        var features = [];
        for(var i=0; i< selectedFeatures.length; i++){
            features.push({'name':selectedFeatures[i]});
        }

        return features;
    }
});
