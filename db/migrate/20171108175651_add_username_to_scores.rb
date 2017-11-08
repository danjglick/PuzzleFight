class AddUsernameToScores < ActiveRecord::Migration[5.0]
  def change
    add_column :scores, :username, :string, null: false
  end
end
