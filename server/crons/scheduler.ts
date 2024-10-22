import nodeCron from "node-cron";
import { initialBinDump } from ".";

interface ICronConfig {
  [key: string]: {
    taskName: string;
    taskFrequency: string;
    taskHandler: () => Promise<void>
  }
}

const initCronJobs = async (config: ICronConfig) => {
  Object.keys(config).forEach((key) => {
    console.log(config[key].taskName + 'cron ::: scheduled');
    nodeCron.schedule(config[key].taskFrequency, config[key].taskHandler)
  })
  await initialBinDump()
}

export default initCronJobs;
