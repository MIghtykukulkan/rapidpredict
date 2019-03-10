import Route from '@ember/routing/route';

export default Route.extend({


    model(){
        return {"data":["passedemissions","mpg","cylinders","displacement","horsepower",	
        "weight",	"acceleration",	"modelyear",	"carname"]}
    }
});
