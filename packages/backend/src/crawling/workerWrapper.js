const { workerData } = require("worker_threads");

if (workerData.fullpath.endsWith(".ts")) {
  // eslint-disable-next-line global-require
  require("ts-node").register();
}
// eslint-disable-next-line import/no-dynamic-require
module.exports = require(workerData.fullpath);
