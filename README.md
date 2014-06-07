Sencha touch Infinite lazy-loading images List  
================

The problem
================
Using Sencha Touch, when you try to load a long list of item with images (variable heights) inside,
it will takes time to load all the images. Therefore, at the beginning, there is lag when you scrolls
(before done loading)

Sencha Touch 2.1 helps by adding 'infinite' for list. This will help you by only rendering the needed
item in View Port. However, with 'infinite:true', your list item height might be wrong if the images
are not loaded.
