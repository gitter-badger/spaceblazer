// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);

function connectCable(uid) {
  let cable_url = document.head.querySelector("[name~=action-cable-url][content]").content

  this.App = {};
  App.cable = ActionCable.createConsumer(cable_url + "/?uid=" + uid);

  App.commands = App.cable.subscriptions.create('CommandsChannel', {
    received: function(data) {
      debugLog(data);
      handleCommand(data);
    }
  });
};

class Cable {
  static send(action, data) {
    App.cable.subscriptions.subscriptions[0].perform(action, data);
  }
}
