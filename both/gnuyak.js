GNUYak = {
  upvote: function(yakId) {
    var upvotes = localStorage.getObject("upvotes") || [];
    var downvotes = localStorage.getObject("downvotes") || [];

    // If the person already voted and is clicking upvote again, undo the previous
    // vote
    if (_.indexOf(upvotes, yakId) > -1) {
      Meteor.call("downvote", {yakId: yakId, factor: -1});
      upvotes = _.without(upvotes, yakId);

      // Save the objects to disk
      localStorage.setObject("downvotes", downvotes);
      localStorage.setObject("upvotes", upvotes);
      return;
    }

    // If the person previously downvoted, and is clicking the upvote
    // up them by a factor of 2, effectively replacing the vote
    if (_.indexOf(downvotes, yakId) > -1) {
      Meteor.call("upvote", {yakId: yakId, factor: 2});
      downvotes = _.without(downvotes, yakId);
      upvotes.push(yakId);

      // Save the objects to disk
      localStorage.setObject("downvotes", downvotes);
      localStorage.setObject("upvotes", upvotes);
      return;
    }

    // Normal upvote
    Meteor.call("upvote", {yakId: yakId, factor: 1});
    upvotes.push(yakId);
    localStorage.setObject("downvotes", downvotes);
    localStorage.setObject("upvotes", upvotes);
  },
  downvote: function(yakId) {
    var upvotes = localStorage.getObject("upvotes") || [];
    var downvotes = localStorage.getObject("downvotes") || [];

    // If the person already voted and is clicking downvote again, undo the previous
    // vote
    if (_.indexOf(downvotes, yakId) > -1) {
      Meteor.call("upvote", {yakId: yakId, factor: 1});
      downvotes = _.without(downvotes, yakId);

      // Save the objects to disk
      localStorage.setObject("downvotes", downvotes);
      localStorage.setObject("upvotes", upvotes);
      return;
    }

    // If the person previously upvoted, and is clicking the downvote
    // down them by a factor of 2, effectively replacing the vote
    if (_.indexOf(upvotes, yakId) > -1) {
      Meteor.call("downvote", {yakId: yakId, factor: -2});
      upvotes = _.without(upvotes, yakId);
      downvotes.push(yakId);

      // Save the objects to disk
      localStorage.setObject("downvotes", downvotes);
      localStorage.setObject("upvotes", upvotes);
      return;
    }

    // Normal downvote
    Meteor.call("downvote", {yakId: yakId, factor: -1});
    downvotes.push(yakId);
    localStorage.setObject("downvotes", downvotes);
    localStorage.setObject("upvotes", upvotes);
  },
  comment: function(yakId, comment) {
    Meteor.call("comment", {yakId: yakId, comment: comment});
  }
};
