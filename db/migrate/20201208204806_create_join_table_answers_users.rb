class CreateJoinTableAnswersUsers < ActiveRecord::Migration[6.0]
  def change
    create_join_table :answers, :users do |t|
      # t.index [:answer_id, :user_id]
      # t.index [:user_id, :answer_id]
    end
  end
end
