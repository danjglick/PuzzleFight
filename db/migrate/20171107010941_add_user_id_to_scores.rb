class AddUserIdToScores < ActiveRecord::Migration[5.0]
  def change
    add_column :scores, :user_id, :integer, null: false
  end
end
