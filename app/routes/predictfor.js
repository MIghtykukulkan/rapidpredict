import Route from '@ember/routing/route';

export default Route.extend({

    model(){
        let featureController = this.controllerFor('features')

        var selectedFeatures = featureController.get('selectedFeatures');

        console.log(selectedFeatures)

        return selectedFeatures;
    }
});
