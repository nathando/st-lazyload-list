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
        // console.log('view items', list.getViewItems());
        if (!list.getBinded() && list.getViewItems().length>0)
        {
            list.itemHeights = {};
            list.itemScrollHeights = {};
            Ext.Array.each(list.getViewItems(), function(listItem, index){
                list.itemScrollHeights[0] = 0;
                list.itemsPainted = 0;
                // Loop through and record item heights
                listItem.on('painted', function(item){
                    list.itemHeights[index] = item.getHeight();
                    list.itemsPainted ++;
                    // All items are painted.
                    if (list.itemsPainted == list.getViewItems().length) {
                        // Let's calculate their scroll heights
                        list.itemScrollHeights = list.calculateScrollHeights(list.itemHeights, list.getViewItems().length);
                        // Show all those already on screen
                        list.loadVisibleImage();
                    }
                });
            });

            list.setBinded(true);
        }
        else {
            // Offset the screen by -y amount
            list.loadVisibleImage(-y);
        }
    },

    /* Calculate scroll height of a list of items based on their heights */
    calculateScrollHeights: function(heights, len) {
        var scrollHeights = {};
        for (var i=0; i<len; i++) {
            scrollHeights[i] = (i>0 ? scrollHeights[i-1] : 0);
        }
        return scrollHeights;
    },

    /* Loop through images to decide which to show*/
    loadVisibleImage: function(offset) {
        var list = this;
        var windowHeight = Ext.Viewport.getWindowHeight();
        Ext.Array.each(list.getViewItems(), function(listItem, index){
            // Show any item that's on screen
            if (list.itemScrollHeights[index]<windowHeight + (offset||0)) {
                list.showImage(listItem.element);
            }
        });
    },

    /* Css manipulation to show image */
    showImage: function(listItemEl) {
        var img = listItemEl.down('img');
        if (img && !img.hasCls('loaded')) {
            img.set({"src": img.getAttribute("data-src")});
            img.applyStyles("opacity: 1;");
            img.addCls('loaded');
        }
    }
});
