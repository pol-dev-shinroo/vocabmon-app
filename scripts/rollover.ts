import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load the environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in .env.local');
  process.exit(1);
}

async function run() {
  const username = process.argv[2];
  const newWeekId = process.argv[3];

  if (!username || !newWeekId) {
    console.log('⚠️ Usage: npx tsx scripts/rollover.ts <username> <new_week_id>');
    console.log('Example: npx tsx scripts/rollover.ts jaylee week_5');
    process.exit(1);
  }

  console.log(`⏳ Connecting to MongoDB...`);
  await mongoose.connect(MONGODB_URI as string);
  
  // Define a flexible schema for the script
  const ProgressSchema = new mongoose.Schema({
    username: String,
    activeWeekId: String,
    exp: Number,
    currentSet: Number,
    completedQuests: [String],
    history: Array
  }, { strict: false });

  const Progress = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
  const userProgress = await Progress.findOne({ username });

  if (!userProgress) {
    console.error(`❌ Could not find progress for user: ${username}`);
    process.exit(1);
  }

  console.log(`👤 Found user: ${username} (Currently on ${userProgress.activeWeekId} with ${userProgress.exp} EXP)`);

  // 1. Calculate final level
  const rawLevel = Math.floor(userProgress.exp / 150) + 1;
  const finalLevel = Math.min(rawLevel, 10);

  // 2. Archive to history
  const historyEntry = {
    weekId: userProgress.activeWeekId,
    finalLevel: finalLevel,
    totalExp: userProgress.exp,
    completedAt: new Date()
  };
  
  userProgress.history.push(historyEntry);

  // 3. Reset stats for the new week
  userProgress.activeWeekId = newWeekId;
  userProgress.exp = 0;
  userProgress.currentSet = 0;
  userProgress.completedQuests = [];

  await userProgress.save();

  console.log(`🎉 Successfully archived ${historyEntry.weekId} to the Hall of Fame!`);
  console.log(`🆕 Reset stats for ${newWeekId}. Ready to learn!`);

  await mongoose.disconnect();
  process.exit(0);
}

run();
