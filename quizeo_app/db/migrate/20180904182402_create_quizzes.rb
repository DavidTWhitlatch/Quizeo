class CreateQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzes do |t|
      t.string :question
      t.integer :user_id

      t.timestamps
    end
  end
end
