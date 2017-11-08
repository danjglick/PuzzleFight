class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :gamestates, :gamestate, :current_state
  end
end
