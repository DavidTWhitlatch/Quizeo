class CreatePlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :playlists do |t|
      t.string :name
      t.integer :video_id
      t.integer :quiz_id
      t.integer :user_id
      t.boolean :is_last

      t.timestamps
    end
  end
end
