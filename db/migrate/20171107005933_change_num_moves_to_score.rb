class ChangeNumMovesToScore < ActiveRecord::Migration[5.0]
  def up
    rename_column :scores, :num_moves, :score
  end
  
  def down
    rename_column :scores, :score, :num_moves
  end
end
