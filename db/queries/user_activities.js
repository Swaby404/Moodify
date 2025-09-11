
import db from "#db/client";


export async function createUserActivity({user_Id, mood_id, description}) {
  const sql = `
  INSERT INTO user_activities
    (user_id, mood_id, description)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [userActivity],
  } = await db.query(sql, [user_Id, mood_id, description]);
  return userActivity;
}

export async function getUserActivities(user_id) {
  const sql = `
  SELECT *
  FROM user_activities
  WHERE user_id = $1
  `;
  const { rows: userActivities } = await db.query(sql, [user_id]);
  return userActivities;
}