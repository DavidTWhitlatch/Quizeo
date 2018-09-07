class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :name
      t.string :url
      t.integer :playlist_id
      t.integer :order

      t.timestamps
    end
  end
end
