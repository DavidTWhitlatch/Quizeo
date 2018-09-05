class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.string :option
      t.boolean :is_correct
      t.integer :quiz_id

      t.timestamps
    end
  end
end
