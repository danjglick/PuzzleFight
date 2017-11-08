class AddAllTimeBestToLevels < ActiveRecord::Migration[5.0]
  def change
    add_column :levels, :all_time_best, :integer
  end
end
