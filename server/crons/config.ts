import { dailyBinDumpUpdate } from ".";

export default {
  // Update BINS everyday at midnight
  dailyBinDumpUpdate: {
    taskName: "DailyBinDumpUpdate",
    taskFrequency: '0 0 * * *',
    taskHandler: dailyBinDumpUpdate
  }
}

