Ext.define('LazyLoad.controller.MainController', {
    extend: 'Ext.app.Controller',
    requires: [],
    init: function() {
        this.fixOverflowChangedIssue();
    },
    /**
     * Fix a Sencha Touch Bug that was introduced with Google Chrome v43+
     *
     * See following Forum Thread for more Information:
     * https://www.sencha.com/forum/showthread.php?300288-Scrolling-Issues-in-latest-Google-Chrome
     */
    fixOverflowChangedIssue: function()
    {
        if (Ext.browser.is.WebKit) {
            console.info(this.$className + ': Fix a Sencha Touch Bug (TOUCH-5716 / Scrolling Issues in Google Chrome v43+)');

            Ext.override(Ext.util.SizeMonitor, {
                constructor: function (config) {
                    var namespace = Ext.util.sizemonitor;
                    return new namespace.Scroll(config);
                }
            });

            Ext.override(Ext.util.PaintMonitor, {
                constructor: function (config) {
                    return new Ext.util.paintmonitor.CssAnimation(config);
                }
            });
        }
    },
});
