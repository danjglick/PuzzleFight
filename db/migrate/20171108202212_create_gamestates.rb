class CreateGamestates < ActiveRecord::Migration[5.0]
  def change
    create_table :gamestates do |t|
      t.json :gamestate
      t.timestamps
    end
  end
end