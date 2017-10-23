class CreateScores < ActiveRecord::Migration[5.0]
  def change
    create_table :scores do |t|
      t.belongs_to :user, null: false
      t.belongs_to :level, null: false
      t.integer :num_moves, null: false
      t.boolean :is_alltime_best?, null: false
      t.boolean :is_personal_best?, null: false
      t.timestamps
    end
  end
end
