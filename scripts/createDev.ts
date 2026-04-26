import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const UserSchema = new mongoose.Schema({ username: String, passwordHash: String, role: String }, { strict: false });
  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  
  await User.findOneAndUpdate(
    { username: 'dev' },
    { username: 'dev', passwordHash: 'dev123', role: 'dev' },
    { upsert: true }
  );
  
  console.log('✅ Developer account created! Username: dev | Password: dev123');
  await mongoose.disconnect();
  process.exit(0);
}
run();
