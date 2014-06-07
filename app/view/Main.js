Ext.define('LazyLoad.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Normal 1',
                iconCls: 'info',
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Normal Image list without Infinite'
                    },
                    {
                        xtype: 'list',
                        id: 'mylist1',
                        variableHeights: true,
                        itemTpl:
                            '<img style="width: 100%; height: auto" src="{src}" />'
                        ,
                        store: 'imagestore'
                    }
                ]
            },
            {
                title: 'Normal 2',
                iconCls: 'info',
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Normal Image list with Infinite'
                    },
                    {
                        xtype: 'list',
                        id: 'mylist2',
                        infinite: true,
                        variableHeights: true,
                        itemTpl:
                            '<img style="width: 100%; height: auto" src="{src}" />'
                        ,
                        store: 'imagestore'
                    }
                ]
            },
            {
                title: 'Infinite Lazyload List Demo',
                iconCls: 'favorites',
                layout: 'fit',
                scrollable: true,
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Infinite Lazyload List Demo'
                    },
                    {
                        xtype: 'infinitelist',
                        id: 'mylist3',
                        store: 'imagestore'
                    }
                ]

            }

        ]
    }
});
