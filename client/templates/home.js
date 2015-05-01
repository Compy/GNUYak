Template.home.rendered = function() {
  Session.setDefault("latLng", false);
  Tracker.autorun(function() {
    var latLng = Geolocation.latLng();
    if (!latLng || latLng === null) return;
    Session.set("latLng", latLng);
    console.log("Got coordinates " + latLng.lat + "," + latLng.lng);

    // Now subscribe to the local yaks
    Meteor.subscribe("yaks", latLng);
  });
};
Template.home.helpers({
  yaks: function() {
    return Yaks.find({},{sort: {date: -1, score: -1}});
  }
});

Template.home.events({
  'click .upvote': function(e,t) {
    e.preventDefault();
    GNUYak.upvote(this._id);
  },
  'click .downvote': function(e,t) {
    e.preventDefault();
    GNUYak.downvote(this._id);
  }
});

Template._newYak.events({
  'submit #addYakForm': function(e,t) {
    e.preventDefault();

    var latLng = Session.get("latLng");
    if (!latLng) latLng = {lat: 37.774936, lng: -122.415463};

    var text = t.$("#yakText").val();

    if (text == "") {
      IonLoading.show({
        customTemplate: '<p>Yak text cannot be blank!</p>',
        duration: 2000
      });
      return;
    }

    t.$("#yakText").val("");
    Yaks.insert({
      text: text,
      date: new Date(),
      location: [latLng.lat,latLng.lng],
      score: 0,
      comments: []
    });
    IonModal.close();
  }
});
