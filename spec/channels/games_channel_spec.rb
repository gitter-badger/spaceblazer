require 'rails_helper'
require './spec/channels/fake_object_builder'
include FakeObjectBuilder

RSpec.describe GamesChannel, :type => :channel do
  context "#create_player" do
    let(:game) { Game.current }
    let(:device) { Device.create(external_id: SecureRandom.uuid) }

    it "creates a player for the current game" do
      channel = build_fake('create_player', described_class)

      expect {
        channel.create_player(
          { game_id: game.id, device_id: device.id }
        )
      }.to change {
        Game.current.players.count
      }.from(0).to(1)
    end
  end
end
