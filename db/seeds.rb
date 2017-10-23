User.create(
  username: 'danjglick', 
  password: 'Password1'
)

Level.create(num_blues_reds: 4)

Score.create(
  user_id: 1, 
  level_id: 1, 
  num_moves: 5, 
  is_personal_best?: false,
  is_alltime_best?: false
)