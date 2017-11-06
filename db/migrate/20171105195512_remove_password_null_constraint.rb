class RemovePasswordNullConstraint < ActiveRecord::Migration[5.0]
  def up
    change_column :users, :password, :string, null: true
  end
  
  def down
    change_column :users, :password, :string, null: false
  end
end
