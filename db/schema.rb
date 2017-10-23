# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171023050406) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "levels", force: :cascade do |t|
    t.integer  "num_blues_reds", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "scores", force: :cascade do |t|
    t.integer  "user_id",           null: false
    t.integer  "level_id",          null: false
    t.integer  "num_moves",         null: false
    t.boolean  "is_alltime_best?",  null: false
    t.boolean  "is_personal_best?", null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["level_id"], name: "index_scores_on_level_id", using: :btree
    t.index ["user_id"], name: "index_scores_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",   null: false
    t.string   "password",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
