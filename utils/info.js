const info = {
  title: process.title,
  platform: process.platform,
  node: process.version,
  memory: process.memoryUsage().rss,
  path: process.execPath,
  pid: process.pid,
  folder: process.cwd()
};

module.exports = info;