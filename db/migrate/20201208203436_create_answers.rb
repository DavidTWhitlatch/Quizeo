class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.string :option
      t.boolean :is_correct
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
