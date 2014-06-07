/**
 * @author: Nathan Do
 * @email: nathan.dole@gmail.com
 * Infinite List with Lazy Loading Images
 **/

Ext.define('LazyLoad.view.InfiniteList', {
    extend: 'Ext.List',
    xtype: 'infinitelist',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        binded: false,
        infinite: true,
        /*
        No grouping, no headers
        */
        useHeaders: false,
        /*
        Buffer size can be changed based on image average height
        Default bufferSize from Sencha is 25, which means it will render 25 items
        as a buffer to smooth the scrolling.
        For list item contain images, the ViewPort contains less item, so we can make the
        bufferSize a bit lower
        */
        //bufferSize: 10,
        variableHeights: true,
        itemTpl:
            '<div class="infinite-item">' +
                '<div class="wrapper" style="position: relative; width:100%; padding-bottom: {[100*values.height/values.width]}%; background-color:#eee; border: 1px solid #aaa">' +
                    '<div class="inner" style="position:absolute; top:0; bottom:0; left:0; right:0 ">' +
                        '<img style="width: 100%; opacity:0; transition: opacity 3s" data-src="{src}" />' +
                    '</div>' +
                '</div>' +
            '</div>'
    },

    onScrollBinder: function(x,y) {
        var list = this;
        var windowHeight = Ext.Viewport.getWindowHeight();
        // Bind event - initialize
        if (!list.getBinded() && list.getViewItems().length>0)
        {
            list.itemHeights = {};
            list.itemScrollHeights = {};
            Ext.Array.each(list.getViewItems(), function(listItem, index){
                list.itemScrollHeights[0] = 0;
                listItem.on('painted', function(item){
                    list.itemHeights[index] = item.getHeight();
                    var tempIndex = index;
                    while (tempIndex>0) {
                        list.itemScrollHeights[tempIndex] = list.itemScrollHeights[tempIndex-1] + list.itemHeights[tempIndex];
                        tempIndex--;
                    }
                    //console.log("index", index, list.itemScrollHeights[index]);
                    if (list.itemScrollHeights[index]<windowHeight) {
                        list.showImage(item);
                    }
                });
            });
            list.setBinded(true);
        }
        else {
            //Reverse y
            var scrollY = -y;
            var listViewItems = list.getViewItems();
            for (var index in list.itemScrollHeights) {
                listItemHeight = list.itemScrollHeights[index];
                //console.log('scroller y', scrollY + windowHeight, listItemHeight, index);
                var listItemEl = listViewItems[index].element;
                if (listItemHeight < scrollY + windowHeight) {
                   list.showImage(listItemEl);
                }
            }
        }
    },

    showImage: function(listItemEl) {
        var img = listItemEl.down('img');
        if (img && !img.hasCls('loaded')) {
            img.set({"src": img.getAttribute("data-src")});
            img.applyStyles("opacity: 1;");
            img.addCls('loaded');
        }
    }
});
