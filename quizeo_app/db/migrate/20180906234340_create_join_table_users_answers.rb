class CreateJoinTableUsersAnswers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :users, :answers do |t|
      # t.index [:user_id, :answer_id]
      # t.index [:answer_id, :user_id]
    end
  end
end
