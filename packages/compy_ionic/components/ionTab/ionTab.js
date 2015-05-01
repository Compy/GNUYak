Tracker.autorun(function () {
  var ionTabCurrent = Session.get('ionTab.current');

  if( ionTabCurrent ){
    localStorage.setItem('ionTab.current', ionTabCurrent);
  }
});

Meteor.startup(function () {
  var ionTabCurrent = localStorage.getItem('ionTab.current');

  if( ionTabCurrent ){
    Session.set('ionTab.current', ionTabCurrent);
  }
});

Template.ionTab.events({
  'click': function (event, template) {
    if (template.data.path) {
      Session.set('ionTab.current', template.data.path);
    }

    if (template.data.view) {
      Session.set('ionTab.current', template.data.view);
    }

    // If the tab's content is being rendered inside of a ionNavView
    // we don't want to slide it in when switching tabs
    IonNavigation.skipTransitions = true;
  }
});

Template.ionTab.helpers({
  classes: function () {
    var classes = ['tab-item'];
    if (this.class) {
      classes.push(this.class);
    }
    if (this.badgeNumber) {
      classes.push('has-badge');
    }
    return classes.join(' ');
  },

  url: function () {
    if (this.href) {
      return this.href;
    }

    if (this.path && Router.routes[this.path]) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  },

  isActive: function () {
    var ionTabCurrent = Session.get('ionTab.current');

    if (this.path && this.path === ionTabCurrent) {
      return 'active';
    }

    if (this.view && this.view === ionTabCurrent) {
      return 'active positive';
    }

    // The initial case where there is no localStorage value and
    // no session variable has been set, this attempts to set the correct tab
    // to active based on the router
    var route = Router.routes[this.path];
    if(route && route.path(Template.parentData(1)) === ionTabCurrent){
      return 'active';
    }
  },

  activeIcon: function () {
    if (this.iconOn) {
      return this.iconOn;
    } else {
      return this.icon;
    }
  },

  defaultIcon: function () {
    if (this.iconOff) {
      return this.iconOff;
    } else {
      return this.icon;
    }
  },

  badgeNumber: function () {
    return this.badgeNumber;
  }
});