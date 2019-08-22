class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.text :desc
      t.integer :no

      t.timestamps
    end
  end
end
