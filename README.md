Sencha touch Infinite Lazyload List  
================

The problem
================
Using Sencha Touch, when you try to load a long list of item with images (variable heights) inside,
it will takes time to load all the images. Therefore, at the beginning, there is lag when you scrolls
(before done loading)

Sencha Touch 2.1 helps by adding 'infinite' for list. This will help you by only rendering the needed
item in View Port. However, with 'infinite:true', your list item height might be wrong if the images
are not loaded.

Lazy load images
================
By combining infinite feature of Sencha Touch list and fix the container of the image, we can make it
load correctly using infinite.

Do note that this means you need to pass back the width & height (or ratio height/width) from server  
Sample data:
```javascript
[
    { src: 'http://lorempixel.com/400/200/sports/', width: 400, height: 200},
    { src: 'http://lorempixel.com/400/200/nightlife/', width: 400, height: 200 },
    { src: 'http://lorempixel.com/400/200/animals/', width: 400, height: 200 }
]
```

Adding lazy load effect will help smoothen the user experience when scroll through list

Demo
================
Here is the [Demo](http://st-touch-lazyload-list.herokuapp.com/)

There are 3 tabs:  

- Normal List: A bit lag when scroll right at the beginning
- Infinite List: Layout was messed up
- Infinite Lazyload: Lazyloading the images along the way

How to use
================
Use infinitelist as your **xtype**, override **itemTpl** if neccessary
```javascript
{
    xtype: 'infinitelist',
    store: 'imagestore',
    itemTpl:
    '<div class="infinite-item">' +
        '<div class="wrapper" style="position: relative; width:100%; padding-bottom: {[100*values.height/values.width]}%; background-color:#eee; border: 1px solid #aaa">' +
            '<div class="inner" style="position:absolute; top:0; bottom:0; left:0; right:0 ">' +
                '<img style="width: 100%; opacity:0; transition: opacity 3s" data-src="{src}" />' +
            '</div>' +
        '</div>' +
    '</div>'
}
```

Notes
================
- Initially, I wanted to use **painted** to wire all the lazyload handler. However, using 'infinite list',
**getViewItems** cannot be used to retrieve all list items as **painted** triggered.
Therefore, I ended up overriding  **onScrollBinder** for this purpose.
