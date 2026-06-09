import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.log('⚠️ Usage: npx tsx scripts/createUser.ts <username> <password>');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const UserSchema = new mongoose.Schema({ username: String, passwordHash: String, role: String }, { strict: false });
  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  
  const ProgressSchema = new mongoose.Schema({ username: String, activeWeekId: String, exp: Number, currentSet: Number, completedQuests: [String], history: Array }, { strict: false });
  const Progress = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);

  await User.findOneAndUpdate(
    { username },
    { username, passwordHash: password, role: 'student' },
    { upsert: true }
  );

  await Progress.findOneAndUpdate(
    { username },
    {
      $setOnInsert: { exp: 0, currentSet: 0, completedQuests: [], history: [], activeWeekId: "week_1" }
    },
    { upsert: true }
  );
  
  console.log(`✅ Student account created! Username: ${username} | Password: ${password}`);
  await mongoose.disconnect();
  process.exit(0);
}
run();
