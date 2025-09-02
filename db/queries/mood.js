import db from "#db/client";

export async function createMood({name, description}) {
  const sql = `
  INSERT INTO moods
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [moods],
  } = await db.query(sql, [name, description]);
  return moods;
};



export async function getMoods() {
  const sql = `
  SELECT *
  FROM moods
  `;
  const { rows: moods } = await db.query(sql);
  return moods;
}
