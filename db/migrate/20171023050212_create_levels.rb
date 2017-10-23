class CreateLevels < ActiveRecord::Migration[5.0]
  def change
    create_table :levels do |t|
      t.integer :num_blues_reds, null: false
      t.timestamps
    end
  end
end
