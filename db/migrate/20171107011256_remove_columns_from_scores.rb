class RemoveColumnsFromScores < ActiveRecord::Migration[5.0]
  def change
    remove_column :scores, :is_alltime_best?
    remove_column :scores, :is_personal_best?
  end
end
