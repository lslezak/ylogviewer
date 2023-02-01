

export default function y2logparser(y2log) {
  console.time("Parsing y2log");
  let ret = [];
  const log_regexp = /^(\d\d\d\d-\d\d-\d\d) (\d\d:\d\d:\d\d) <(\d)> (\w+)\((\d+)\) \[(\S+)\] (.*)/;

  y2log.split("\n").forEach((line) => {
    let res = line.match(log_regexp);

    if (res) {
      let entry = {
        date: res[1],
        time: res[2],
        level: res[3],
        host: res[4],
        pid: res[5],
        component: res[6],
        message: res[7],
        location: null
      };

      // Ruby locations might contains spaces, parse it specifically
      res = entry.message.match(/^([^ ]*:\d+) (.*)/) ||
        entry.message.match(/^(.*\(block in .*\):\d+) (.*)/) ||
        entry.message.match(/^(.*\(block \(\d+ levels\) in .*\):\d+) (.*)/) ||
        entry.message.match(/^(.*\(ensure in .*\):\d+) (.*)/);

      if (res) {
        entry.location = res[1];
        entry.message = res[2];
      }

      ret.push(entry);
    }
    else if (ret.length > 0) {
      let last_item = ret[ret.length - 1];
      last_item.message = (last_item.message || "") + line;
      ret[ret.length - 1] = last_item;
    }
  });

  console.time("Parsing y2log");
  console.log("Loaded " + ret.length + " lines");

  return ret;
};
