import mongoose, { Schema, Document } from "mongoose";

// 1. We explicitly tell TypeScript what a History item looks like
export interface IHistory {
  weekId: string;
  finalLevel: number;
  totalExp: number;
  completedAt: Date;
}

const HistorySchema = new Schema({
  weekId: { type: String, required: true },
  finalLevel: { type: Number, required: true },
  totalExp: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

// 2. We inject the IHistory type into our main Progress interface
export interface IProgress extends Document {
  username: string;
  activeWeekId: string;
  exp: number;
  currentSet: number;
  completedQuests: string[];
  history: IHistory[]; // <--- No more 'any'! It expects our exact History shape.
}

const ProgressSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    activeWeekId: { type: String, default: "week_1" },
    exp: { type: Number, default: 0 },
    currentSet: { type: Number, default: 0 },
    completedQuests: { type: [String], default: [] },
    history: [HistorySchema],
  },
  { timestamps: true },
);

export default mongoose.models.Progress ||
  mongoose.model<IProgress>("Progress", ProgressSchema);
