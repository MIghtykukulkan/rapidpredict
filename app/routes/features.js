import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({

    localmemory: service(),
    model(){
        var uploadInfo = this.get('localmemory').read("uploadinfo");
        
        var itemlist = {};
        itemlist.data = [];
        var headerArray = uploadInfo.headers;
        console.log(headerArray)
     
        for(var item=0;item< headerArray.length; headerArray){
            itemlist.data.push({"name":headerArray[item], "pre_checked":false})
        }

        return itemlist;
    }
});
