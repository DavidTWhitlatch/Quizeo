class CreateQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzes do |t|
      t.string :question
      t.integer :playlist_id
      t.integer :order

      t.timestamps
    end
  end
end
