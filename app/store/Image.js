/**
 * @author: Nathan Do
 * @email: nathan.dole@gmail.com
 * Sample store
 **/
Ext.define("LazyLoad.store.Image", {
    extend: "Ext.data.Store",
    config: {
        storeId: 'imagestore',
        autoLoad: true,
        fields: [
            {name: "src", type: "string"},
            {name: "width", type: "int"},
            {name: "height", type: "int"}
        ],
        proxy: {
          type: 'ajax',
          url: 'resources/data/sample.json'
      }
    }
});
