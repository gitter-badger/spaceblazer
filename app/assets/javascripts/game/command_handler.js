function handleCommand(data) {
  debugLog("Command received: " + data);

  let parsed = JSON.parse(data);
  let id = parsed.id;

  if (id == "system") {
    handleSystemCommand(data);
    return;
  };

  let command = parsed.command;

  debugLog(command);

  let player = Player.activePlayers[id]

  if (player || command == 's') {
    if (command == 's' && Spaceblazer.reset) {
      Spaceblazer.reset = false;
      Spaceblazer.newGame();
      Spaceblazer.restart();
    }
    else if (command == 's') {
      if (!Player.activePlayers[id]) {
        App.cable.subscriptions.subscriptions[0].perform("register_player",  { id: id })
      }

      if (!game.scene.isActive('main')) {
        game.scene.switch('title', 'main');
      }
    }
    else if (command == 'n') {
      App.cable.subscriptions.subscriptions[0].perform(
        "new_game",
        {
          id: game.fingerprint,
        }
      );
    }
    else if (command == 'u') {
      moveUp(Player.activePlayers[id]);
    }
    else if (command == 'd') {
      moveDown(Player.activePlayers[id]);
    }
    else if (command == 'l') {
      moveLeft(Player.activePlayers[id]);
    }
    else if (command == 'r') {
      moveRight(Player.activePlayers[id]);
    }
    else if (command == '9' || command == '0') {
      stopY(Player.activePlayers[id]);
    }
    else if (command == '-' || command == '=') {
      stopX(Player.activePlayers[id]);
    }
    else if (command == 'b') {
      Player.activePlayers[id].fire();
    }
  };
};

function handleSystemCommand(data) {
  debugLog("System command: " + data);

  let parsed = JSON.parse(data);

  if (parsed.notice) {
    debugLog("System command: notice - " + parsed);
  }
  else if (parsed.player_created) {
    Player.create(parsed.player_created, game.mainScene);
    debugLog("System command: player_created - " + parsed);
  }
  else if (parsed.command == "start_game") {
    scene.started = true;
    debugLog("System command: start_game - " + parsed);
  }
  else if (parsed.commmand == "stop_game") {
    debugLog("System command: stop_game - " + parsed);
  }
  else if (parsed.command == "online") {
    App.cable.subscriptions.subscriptions[0].perform("register_laserbonnet", parsed)
    debugLog("System command: online - " + parsed);
  }
  else {
    debugLog("System command: unrecognized - " + parsed);
  }
};
