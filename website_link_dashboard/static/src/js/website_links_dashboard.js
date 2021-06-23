odoo.define('website_link_dashboard.Dashboard', function (require) {
"use strict";

var AbstractAction = require('web.AbstractAction');
var ajax = require('web.ajax');
var ControlPanelMixin = require('web.ControlPanelMixin');
var core = require('web.core');
var rpc = require('web.rpc');
var session = require('web.session');
var web_client = require('web.web_client');

var _t = core._t;
var QWeb = core.qweb;

var WebsiteLinkDashboard = AbstractAction.extend(ControlPanelMixin, {
    template: 'WebsiteLinkDashboardMain',
    cssLibs: [
        '/web/static/lib/nvd3/nv.d3.css'
    ],
    jsLibs: [
        '/web/static/lib/nvd3/d3.v3.js',
        '/web/static/lib/nvd3/nv.d3.js',
        '/web/static/src/js/libs/nvd3.js'
    ],
    events: {

    },

    init: function(parent, context) {
        this._super(parent, context);

        this.date_range = 'week';  // possible values : 'week', 'month', year'
        this.date_from = moment().subtract(1, 'week');
        this.date_to = moment();
        this.dashboards_templates = ['WebsiteLinkDashboard'];


    },

    willStart: function() {
        var self = this;
        return $.when(ajax.loadLibs(this), this._super()).then(function() {
            return self.fetch_data();
        });
    },

    start: function() {
        var self = this;
        this.set("title", 'Website Links');
        return this._super().then(function() {
            self.update_cp();
            self.render_dashboards();
            self.$el.parent().addClass('oe_background_grey');
        });
    },

    fetch_data: function() {
        var self = this;
        var def =  this._rpc({
                model: 'admin.dashboard',
                method: 'get_general_details_website_link',
        }).done(function(result) {
            self.general_data =  result;
        });
        return $.when(def);
    },

    render_dashboards: function() {
        var self = this;

        _.each(this.dashboards_templates, function(template) {
                self.$('.o_hr_dashboard').append(QWeb.render(template, {widget: self}));
            });
    },


    on_reverse_breadcrumb: function() {
        var self = this;
        web_client.do_push_state({});
        this.update_cp();
        this.fetch_data().then(function() {
            self.$('.o_hr_dashboard').empty();
            self.render_dashboards();
        });
    },

    update_cp: function() {
        var self = this;
        this.update_control_panel(
            {breadcrumbs: self.breadcrumbs}, {clear: true}
        );
    },



});

core.action_registry.add('website_link_dashboard', WebsiteLinkDashboard);
return WebsiteLinkDashboard;

});
