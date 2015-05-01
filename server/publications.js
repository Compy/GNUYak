Meteor.publish("yaks", function(latLng) {
  return Yaks.find({
    location: {
      $near: [latLng.lat,latLng.lng],
      $maxDistance: (5.0 / 69.0)
    }
  });
});
