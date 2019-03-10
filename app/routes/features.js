import Route from '@ember/routing/route';

export default Route.extend({


    model(){
        return {"data":[{"name":"passedemissions", "pre_checked":false},
        {"name":"mpg", "pre_checked":true},
        {"name":"speed", "pre_checked":false},
    ]}
    }
});
