import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import defaultTheme from '../themes/default-theme';
import EmberObject, {
  observer
} from '@ember/object';

export default Controller.extend({
    localmemory: service(),
    xdata : [],
    actual : [],
    predicted : [],
    co:{},
    cd : {},
    chartOptions: observer('co', function() {
      // deal with the change
      this.set('chartOptions', this.get('co'));
    }),
    chartData: observer('cd', function() {
      // deal with the change
      this.set('chartData', this.get('cd'));
    }),     
    theme: defaultTheme,

      
    actions:{
        openModal: function(name) {
            console.log("yes somethig is happening");
            Ember.$('.ui.' + name + '.modal').modal('show');
          },
      
          closeModal: function(element, component) {
      
            return true;
          },
      
        predict:function(algo){

            var controller = this;
            
            Ember.$('.ui.' + 'waiting' + '.modal').modal('show');
            var testSize = this.get('localmemory').read('test-size');
            var features = this.get('localmemory').read('selectedfeatures');
            var label = this.get('localmemory').read('selectedLabel');
            var predictionPoint = this.get('localmemory').read('predictionPoint');
            var path = this.get('localmemory').read('uploadinfo').path;
            console.log(testSize, features, label, predictionPoint, path);
            
            if(algo === 'knn'){

              var xdata = [], actual=[], predicted = [];
                
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
                //var predictData = {"options":{"kvalue":10,"strategy":"OCC","testSize":"21","dataColumns":["cylinders","displacement"],"labelColumns":["mpg"]},"predictionPoint":[8,390],"path":"uploads/1a115c8cdcccc04838a74d7feae64bb4"};

                Ember.$.post(
                    'https://predictcore.herokuapp.com/predict-knn',
                    predictData, // or JSON.stringify ({name: 'jonas'}),
                    function(response) {
                        Ember.$('.ui.' + 'waiting' + '.modal').modal('hide');
                        console.log(JSON.stringify(response)); 
                    
                        controller.set('prediction', response.prediction);
                        controller.set('testreport', response.test_report);
                        var report = response.test_report;
                        var counter = 0;
                        for(var item of report)
                        {
                            xdata.push(counter++);
                            actual.push(item.actual);
                            predicted.push(item.predicted);
                        }

                        controller.set('xdata',xdata);
                        controller.set('actual',actual);
                        controller.set('predicted',predicted);

                        var co = 
                        {
                          chart: {
                            type: 'line'
                          },
                          title: {
                            text: 'Prediction'
                          },
                          xAxis: {
                            categories: xdata
                          },
                          yAxis: {
                            title: {
                              text: 'Accuracy'
                            }
                          }
                        };
                        var cd =  [{
                          name: 'Actual',
                          data: actual
                        }, {
                          name: 'Predicted',
                          data: predicted
                        }];

                        controller.set('co', co);
                        controller.set('cd', cd);


                      },
                        
                    'json');

            }
        }
    }
});



/*
{"prediction":13,"test_report":[{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":36,"predicted":43,"accuracy-trend":-0.19444444444444445},{"actual":22,"predicted":19,"accuracy-trend":0.13636363636363635},{"actual":12,"predicted":13,"accuracy-trend":-0.08333333333333333},{"actual":21.6,"predicted":43,"accuracy-trend":-0.9907407407407406},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":23.5,"predicted":19,"accuracy-trend":0.19148936170212766},{"actual":26.6,"predicted":13,"accuracy-trend":0.5112781954887218},{"actual":24,"predicted":43,"accuracy-trend":-0.7916666666666666},{"actual":20,"predicted":19,"accuracy-trend":0.05},{"actual":24,"predicted":43,"accuracy-trend":-0.7916666666666666},{"actual":22,"predicted":19,"accuracy-trend":0.13636363636363635},{"actual":16,"predicted":13,"accuracy-trend":0.1875},{"actual":30,"predicted":43,"accuracy-trend":-0.43333333333333335},{"actual":28,"predicted":43,"accuracy-trend":-0.5357142857142857},{"actual":16,"predicted":13,"accuracy-trend":0.1875},{"actual":31,"predicted":43,"accuracy-trend":-0.3870967741935484},{"actual":32.3,"predicted":43,"accuracy-trend":-0.33126934984520134},{"actual":32.2,"predicted":43,"accuracy-trend":-0.3354037267080744},{"actual":18.1,"predicted":13,"accuracy-trend":0.28176795580110503},{"actual":25,"predicted":43,"accuracy-trend":-0.72},{"actual":23,"predicted":43,"accuracy-trend":-0.8695652173913043},{"actual":24.2,"predicted":19,"accuracy-trend":0.21487603305785122},{"actual":15.5,"predicted":13,"accuracy-trend":0.16129032258064516},{"actual":30.5,"predicted":43,"accuracy-trend":-0.4098360655737705},{"actual":28.1,"predicted":43,"accuracy-trend":-0.5302491103202847},{"actual":44.3,"predicted":43,"accuracy-trend":0.029345372460496552},{"actual":18.2,"predicted":13,"accuracy-trend":0.2857142857142857},{"actual":16.5,"predicted":19,"accuracy-trend":-0.15151515151515152},{"actual":27.2,"predicted":43,"accuracy-trend":-0.5808823529411765},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":32,"predicted":43,"accuracy-trend":-0.34375},{"actual":15,"predicted":13,"accuracy-trend":0.13333333333333333},{"actual":20,"predicted":43,"accuracy-trend":-1.15},{"actual":25,"predicted":43,"accuracy-trend":-0.72},{"actual":30.5,"predicted":43,"accuracy-trend":-0.4098360655737705},{"actual":32.7,"predicted":19,"accuracy-trend":0.4189602446483181},{"actual":23,"predicted":43,"accuracy-trend":-0.8695652173913043},{"actual":24,"predicted":43,"accuracy-trend":-0.7916666666666666},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":27,"predicted":43,"accuracy-trend":-0.5925925925925926},{"actual":20.2,"predicted":13,"accuracy-trend":0.3564356435643564},{"actual":27.5,"predicted":43,"accuracy-trend":-0.5636363636363636},{"actual":11,"predicted":13,"accuracy-trend":-0.18181818181818182},{"actual":18,"predicted":19,"accuracy-trend":-0.05555555555555555},{"actual":21,"predicted":19,"accuracy-trend":0.09523809523809523},{"actual":12,"predicted":13,"accuracy-trend":-0.08333333333333333},{"actual":31.5,"predicted":43,"accuracy-trend":-0.36507936507936506},{"actual":18,"predicted":19,"accuracy-trend":-0.05555555555555555},{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":22.5,"predicted":19,"accuracy-trend":0.15555555555555556},{"actual":16,"predicted":13,"accuracy-trend":0.1875},{"actual":14.5,"predicted":13,"accuracy-trend":0.10344827586206896},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":18.6,"predicted":19,"accuracy-trend":-0.021505376344085943},{"actual":23.9,"predicted":43,"accuracy-trend":-0.7991631799163181},{"actual":30,"predicted":43,"accuracy-trend":-0.43333333333333335},{"actual":18,"predicted":19,"accuracy-trend":-0.05555555555555555},{"actual":29,"predicted":43,"accuracy-trend":-0.4827586206896552},{"actual":31,"predicted":43,"accuracy-trend":-0.3870967741935484},{"actual":31.3,"predicted":43,"accuracy-trend":-0.3738019169329073},{"actual":16.9,"predicted":13,"accuracy-trend":0.2307692307692307},{"actual":32,"predicted":43,"accuracy-trend":-0.34375},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":20.2,"predicted":19,"accuracy-trend":0.059405940594059375},{"actual":34,"predicted":43,"accuracy-trend":-0.2647058823529412},{"actual":15.5,"predicted":13,"accuracy-trend":0.16129032258064516},{"actual":38.1,"predicted":43,"accuracy-trend":-0.1286089238845144},{"actual":34.5,"predicted":43,"accuracy-trend":-0.2463768115942029},{"actual":29,"predicted":43,"accuracy-trend":-0.4827586206896552},{"actual":34.4,"predicted":43,"accuracy-trend":-0.25000000000000006},{"actual":15,"predicted":13,"accuracy-trend":0.13333333333333333},{"actual":20.5,"predicted":19,"accuracy-trend":0.07317073170731707},{"actual":19.2,"predicted":13,"accuracy-trend":0.32291666666666663},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":15,"predicted":19,"accuracy-trend":-0.26666666666666666},{"actual":33.5,"predicted":43,"accuracy-trend":-0.2835820895522388},{"actual":19.2,"predicted":13,"accuracy-trend":0.32291666666666663},{"actual":18,"predicted":19,"accuracy-trend":-0.05555555555555555},{"actual":31,"predicted":43,"accuracy-trend":-0.3870967741935484},{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":20,"predicted":43,"accuracy-trend":-1.15},{"actual":29,"predicted":43,"accuracy-trend":-0.4827586206896552},{"actual":19.1,"predicted":19,"accuracy-trend":0.005235602094240912},{"actual":20.2,"predicted":19,"accuracy-trend":0.059405940594059375},{"actual":20.2,"predicted":19,"accuracy-trend":0.059405940594059375},{"actual":15,"predicted":13,"accuracy-trend":0.13333333333333333},{"actual":23.7,"predicted":23,"accuracy-trend":0.029535864978902926},{"actual":27.9,"predicted":43,"accuracy-trend":-0.5412186379928317},{"actual":22.4,"predicted":19,"accuracy-trend":0.15178571428571422},{"actual":24,"predicted":43,"accuracy-trend":-0.7916666666666666},{"actual":30,"predicted":43,"accuracy-trend":-0.43333333333333335},{"actual":25,"predicted":19,"accuracy-trend":0.24},{"actual":41.5,"predicted":43,"accuracy-trend":-0.03614457831325301},{"actual":17.5,"predicted":13,"accuracy-trend":0.2571428571428571},{"actual":26.8,"predicted":19,"accuracy-trend":0.291044776119403},{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":37.7,"predicted":43,"accuracy-trend":-0.14058355437665773},{"actual":22.3,"predicted":43,"accuracy-trend":-0.9282511210762331},{"actual":29.8,"predicted":43,"accuracy-trend":-0.44295302013422816},{"actual":16,"predicted":19,"accuracy-trend":-0.1875},{"actual":20,"predicted":19,"accuracy-trend":0.05},{"actual":29.5,"predicted":43,"accuracy-trend":-0.4576271186440678},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":18,"predicted":19,"accuracy-trend":-0.05555555555555555},{"actual":31,"predicted":43,"accuracy-trend":-0.3870967741935484},{"actual":20.8,"predicted":19,"accuracy-trend":0.08653846153846156},{"actual":28.4,"predicted":43,"accuracy-trend":-0.5140845070422536},{"actual":27,"predicted":43,"accuracy-trend":-0.5925925925925926},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":17.7,"predicted":19,"accuracy-trend":-0.07344632768361586},{"actual":29,"predicted":43,"accuracy-trend":-0.4827586206896552},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":19,"predicted":19,"accuracy-trend":0},{"actual":25,"predicted":43,"accuracy-trend":-0.72},{"actual":21,"predicted":19,"accuracy-trend":0.09523809523809523},{"actual":34,"predicted":43,"accuracy-trend":-0.2647058823529412},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":39.1,"predicted":43,"accuracy-trend":-0.09974424552429663},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":19,"predicted":43,"accuracy-trend":-1.263157894736842},{"actual":19,"predicted":19,"accuracy-trend":0},{"actual":22,"predicted":43,"accuracy-trend":-0.9545454545454546},{"actual":21,"predicted":19,"accuracy-trend":0.09523809523809523},{"actual":16,"predicted":13,"accuracy-trend":0.1875},{"actual":28,"predicted":43,"accuracy-trend":-0.5357142857142857},{"actual":12,"predicted":13,"accuracy-trend":-0.08333333333333333},{"actual":37.3,"predicted":43,"accuracy-trend":-0.1528150134048258},{"actual":25,"predicted":43,"accuracy-trend":-0.72},{"actual":20.3,"predicted":43,"accuracy-trend":-1.1182266009852215},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":25.1,"predicted":43,"accuracy-trend":-0.7131474103585657},{"actual":21.1,"predicted":43,"accuracy-trend":-1.037914691943128},{"actual":16,"predicted":13,"accuracy-trend":0.1875},{"actual":33.5,"predicted":43,"accuracy-trend":-0.2835820895522388},{"actual":18,"predicted":23,"accuracy-trend":-0.2777777777777778},{"actual":15,"predicted":13,"accuracy-trend":0.13333333333333333},{"actual":19.4,"predicted":13,"accuracy-trend":0.3298969072164948},{"actual":36,"predicted":43,"accuracy-trend":-0.19444444444444445},{"actual":28,"predicted":43,"accuracy-trend":-0.5357142857142857},{"actual":26.6,"predicted":43,"accuracy-trend":-0.6165413533834586},{"actual":18.5,"predicted":19,"accuracy-trend":-0.02702702702702703},{"actual":25.8,"predicted":43,"accuracy-trend":-0.6666666666666666},{"actual":10,"predicted":13,"accuracy-trend":-0.3},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":39.4,"predicted":43,"accuracy-trend":-0.09137055837563456},{"actual":28,"predicted":43,"accuracy-trend":-0.5357142857142857},{"actual":9,"predicted":13,"accuracy-trend":-0.4444444444444444},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":44.6,"predicted":43,"accuracy-trend":0.03587443946188344},{"actual":19,"predicted":23,"accuracy-trend":-0.21052631578947367},{"actual":25,"predicted":43,"accuracy-trend":-0.72},{"actual":17.5,"predicted":19,"accuracy-trend":-0.08571428571428572},{"actual":32,"predicted":43,"accuracy-trend":-0.34375},{"actual":23.8,"predicted":43,"accuracy-trend":-0.8067226890756302},{"actual":32,"predicted":43,"accuracy-trend":-0.34375},{"actual":13,"predicted":13,"accuracy-trend":0},{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":20.6,"predicted":19,"accuracy-trend":0.07766990291262142},{"actual":23,"predicted":43,"accuracy-trend":-0.8695652173913043},{"actual":29.5,"predicted":43,"accuracy-trend":-0.4576271186440678},{"actual":18,"predicted":19,"accuracy-trend":-0.05555555555555555},{"actual":27,"predicted":43,"accuracy-trend":-0.5925925925925926},{"actual":32.9,"predicted":43,"accuracy-trend":-0.30699088145896664},{"actual":33,"predicted":43,"accuracy-trend":-0.30303030303030304},{"actual":15,"predicted":13,"accuracy-trend":0.13333333333333333},{"actual":19,"predicted":43,"accuracy-trend":-1.263157894736842},{"actual":19.2,"predicted":19,"accuracy-trend":0.01041666666666663},{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":28,"predicted":43,"accuracy-trend":-0.5357142857142857},{"actual":33.7,"predicted":43,"accuracy-trend":-0.27596439169139453},{"actual":20.5,"predicted":19,"accuracy-trend":0.07317073170731707},{"actual":24,"predicted":43,"accuracy-trend":-0.7916666666666666},{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":26,"predicted":43,"accuracy-trend":-0.6538461538461539},{"actual":33.8,"predicted":43,"accuracy-trend":-0.27218934911242615},{"actual":29.9,"predicted":43,"accuracy-trend":-0.4381270903010034},{"actual":30,"predicted":43,"accuracy-trend":-0.43333333333333335},{"actual":15,"predicted":13,"accuracy-trend":0.13333333333333333},{"actual":27,"predicted":43,"accuracy-trend":-0.5925925925925926},{"actual":14,"predicted":13,"accuracy-trend":0.07142857142857142},{"actual":16,"predicted":19,"accuracy-trend":-0.1875},{"actual":30,"predicted":43,"accuracy-trend":-0.43333333333333335},{"actual":23.2,"predicted":43,"accuracy-trend":-0.8534482758620691},{"actual":17,"predicted":13,"accuracy-trend":0.23529411764705882},{"actual":18,"predicted":19,"accuracy-trend":-0.05555555555555555},{"actual":18,"predicted":13,"accuracy-trend":0.2777777777777778},{"actual":15,"predicted":19,"accuracy-trend":-0.26666666666666666},{"actual":25,"predicted":43,"accuracy-trend":-0.72},{"actual":37.2,"predicted":43,"accuracy-trend":-0.15591397849462357},{"actual":17.5,"predicted":19,"accuracy-trend":-0.08571428571428572},{"actual":17,"predicted":13,"accuracy-trend":0.23529411764705882},{"actual":34.1,"predicted":43,"accuracy-trend":-0.2609970674486803},{"actual":40.8,"predicted":43,"accuracy-trend":-0.05392156862745105},{"actual":31.6,"predicted":43,"accuracy-trend":-0.360759493670886}]}
*/