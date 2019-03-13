import Service from '@ember/service';

export default Service.extend({

    items: null,

    init() {
      this._super(...arguments);
      this.set('items', {});
    },
  
    add(key,value) {
      this.items[key] = value;
    },
     

    read(key){
        return this.items[key];
    }
  
  
});
