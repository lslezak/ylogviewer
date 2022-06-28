
"use strict";

function add_line(parent, prefix, level, component, message) {
  var node = document.createElement("div");
  node.classList.add("log-level-" + level)
  node.classList.add("log-line")

  var prefix_node = document.createElement("span");
  prefix_node.textContent = prefix;
  prefix_node.classList.add("log-data");
  node.appendChild(prefix_node);

  var message_node = document.createElement("span");
  message_node.textContent = message;
  message_node.classList.add("log-message");
  node.appendChild(message_node);

  parent.appendChild(node);
}

function append_line(parent, message) {
  console.log("Appending ",message);
  var message_node = document.createElement("div");
  message_node.textContent = message;
  message_node.classList.add("log-message");
  parent.lastChild.appendChild(message_node);
}

function parse_y2log(y2log) {
  const content = document.getElementById("content");

  y2log.split("\n").forEach(line => {
    var res = line.match(/^(\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d <(\d)> \w+\(\d+\) \[(\S+)\] )(.*)/);

    if (res) {
      var prefix = res[1];
      var level = res[2];
      var component = res[3];
      var message = res[4];

      // some messages do not contain the file location
      res = message.match(/^([^ ]*:\d+ )(.*)/)
      if (res) {
        console.log(res);
        prefix = prefix.concat(res[1]);
        message = res[2];
      }

      add_line(content, prefix, level, component, message);
    }
    else {
      append_line(content, line);
    }
  });
}


function load_file(e) {
  // clean the previous content
  document.getElementById("content").textContent = "";

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  // HTML5 FileReader
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    parse_y2log(contents);
  };

  reader.readAsText(file);
}

window.onload = function () {
  document.getElementById("file").addEventListener("change", load_file, false);
};
