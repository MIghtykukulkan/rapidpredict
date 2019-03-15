import Route from '@ember/routing/route';

export default Route.extend({

    model(){
        let featureController = this.controllerFor('features')

        var selectedFeatures = featureController.get('selectedFeatures');

        selectedFeatures = ['feature1', 'feature2', 'feature3'];

        var features = [];
        for(var i=0; i< selectedFeatures.length; i++){
            console.log(i)
            features.push({'name':selectedFeatures[i]});
        }

        console.log(features)        
        return features;
    }
});
