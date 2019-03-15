import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    localmemory: service(),
    actions:{
        predict:function(algo){
            
            
            var testSize = this.get('localmemory').read('test-size');
            var features = this.get('localmemory').read('selectedfeatures');
            var label = this.get('localmemory').read('selectedLabel');
            var predictionPoint = this.get('localmemory').read('predictionPoint');
            var path = this.get('localmemory').read('uploadinfo').path;
            console.log(testSize, features, label, predictionPoint, path);
            
            if(algo === 'knn'){
                
                var predictData = {};
                predictData.options = {
                    "kvalue": 10,
                    "strategy":"OCC",
                    "testSize": testSize,
                    "dataColumns":features,
                    "labelColumns": [label]
                }
                predictData.predictionPoint = predictionPoint;
                predictData.path = path;
                console.log(JSON.stringify(predictData))
               // var predictData = {"options":{"kvalue":10,"strategy":"OCC","testSize":"21","dataColumns":["cylinders","displacement"],"labelColumns":["mpg"]},"predictionPoint":[8,390],"path":"uploads/1a115c8cdcccc04838a74d7feae64bb4"};

                Ember.$.post(
                    'https://predictcore.herokuapp.com/predict-knn',
                    predictData, // or JSON.stringify ({name: 'jonas'}),
                    function(response) { console.log(response); },
                    'json');

            }
        }
    }
});
