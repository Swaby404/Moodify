///each user should have access to 8 moods
/// each mood should have 5 activities 

//imports here ...
import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createMood } from "#db/queries/mood";
import { createUserActivity } from "#db/queries/user_activities";



 
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");


async function seed() {
  // create User
  const user = await createUser("user", "password123");
  if (!user || !user.id) {
    throw new Error("User creation failed");
  }

  // create 8 moods for the user
  const moods = ['Angry', 'Happy', 'Sad', 'Love', 'Confident', 'Inspired', 'Anxious', 'Tired'];
  for (let i = 0; i < moods.length; i++) {
    const moodName = moods[i];
    try {
      // create mood for the user
      const mood = await createMood({ user_id: user.id, name:moodName});
      console.log(`Seeded mood (${i}): ${moodName}`);

      // each mood should have 5 activities
      for (let j = 1; j <= 5; j++) {
        const activity = {
          user_id: user.id,
          mood_id: mood.id,
          description: faker.lorem.sentence(),
        };
        const createdActivity = await createUserActivity(activity);
        if (!createdActivity || !createdActivity.id) {
          throw new Error("Activity creation failed");
        }
      }
    } catch (error) {
      console.error(`Error seeding mood ${moodName}:`, error);
    }
  }
}
