class CreateQuizzes < ActiveRecord::Migration[6.0]
  def change
    create_table :quizzes do |t|
      t.string :question
      t.references :video, null: false, foreign_key: true

      t.timestamps
    end
  end
end
