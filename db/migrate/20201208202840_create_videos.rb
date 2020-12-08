class CreateVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :videos do |t|
      t.string :name
      t.string :url
      t.integer :order
      t.references :playlist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
