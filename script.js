
"use strict";

function add_line(parent, entry) {
  var node = document.createElement("div");
  node.classList.add("log-level-" + entry.level)
  node.classList.add("log-line")

  var span_node = document.createElement("span");
  span_node.textContent = entry.date + " ";
  span_node.classList.add("log-date");
  node.appendChild(span_node);

  span_node = document.createElement("span");
  span_node.textContent = entry.time + " ";
  span_node.classList.add("log-time");
  node.appendChild(span_node);

  span_node = document.createElement("span");
  span_node.textContent = "<" + entry.level + "> ";
  span_node.classList.add("log-level-item");
  node.appendChild(span_node);

  span_node = document.createElement("span");
  span_node.textContent = entry.host;
  span_node.classList.add("log-host");
  node.appendChild(span_node);

  span_node = document.createElement("span");
  span_node.textContent = "(" + entry.pid + ") ";
  span_node.classList.add("log-pid");
  node.appendChild(span_node);

  span_node = document.createElement("span");
  span_node.textContent = "[" + entry.component + "] ";
  span_node.classList.add("log-component");
  node.appendChild(span_node);

  if (entry.location) {
    span_node = document.createElement("span");
    span_node.textContent = entry.location + " ";
    span_node.classList.add("log-location");
    node.appendChild(span_node);
  }

  span_node = document.createElement("span");
  span_node.textContent = entry.message;
  span_node.classList.add("log-message");
  node.appendChild(span_node);

  parent.appendChild(node);
}

function append_line(parent, message) {
  console.log("Appending ", message);
  var message_node = document.createElement("div");
  message_node.textContent = message;
  message_node.classList.add("log-message");
  parent.lastChild.appendChild(message_node);
}

function start_group(node, label) {
  console.log("Group", label);

  var summary = document.createElement("summary");
  summary.classList.add("log-group-header");
  summary.textContent = label;

  var details = document.createElement("details");
  details.appendChild(summary)

  node.appendChild(details);

  return details;
}

function parse_y2log(name, y2log) {
  document.getElementById("file-header").textContent = "Rendered File \"" + name + "\"";

  var parent_node = document.getElementById("content");
  y2log.split("\n").forEach(line => {
    var res = line.match(/^(\d\d\d\d-\d\d-\d\d) (\d\d:\d\d:\d\d) <(\d)> (\w+)\((\d+)\) \[(\S+)\] (.*)/);

    if (res) {
      var entry = {
        date: res[1],
        time: res[2],
        level: res[3],
        host: res[4],
        pid: res[5],
        component: res[6],
        message: res[7],
        location: null
      };

      // some messages do not contain the file location
      res = entry.message.match(/^([^ ]*:\d+) (.*)/)
      if (res) {
        entry.location = res[1];
        entry.message = res[2];
      }

      // log group opened
      res = entry.message.match(/^::group::(.*)/);
      if (res) {
        parent_node = start_group(parent_node, res[1]);
      }

      // log group closed
      res = entry.message.match(/^::endgroup::(.*)/);
      if (res) {
        add_line(parent_node, entry);
        parent_node = parent_node.parentElement;
      }
      else {
        add_line(parent_node, entry);
      }
    }
    else {
      append_line(parent_node, line);
    }
  });
}

// load a local file selected by user
function load_file(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  // clean the previous content
  document.getElementById("content").textContent = "";
  document.getElementById("file-header").textContent = "";

  // HTML5 FileReader
  var reader = new FileReader();
  reader.onload = function (ev) {
    var contents = ev.target.result;
    parse_y2log(file.name, contents);
  };

  reader.readAsText(file);
}

// show/hide the selected log level messages
function update_log_level(event) {
  const new_style = event.srcElement.checked ? "" : "none";
  document.querySelectorAll(".log-level-" + event.srcElement.dataset.level).forEach(node => {
    node.style.display = new_style;
  });
}

// show/hide the selected data
function update_display(event) {
  console.log(event.srcElement.dataset.selector);
  const new_style = event.srcElement.checked ? "initial" : "none";
  document.querySelectorAll(event.srcElement.dataset.selector).forEach(node => {
    node.style.display = new_style;
  });
}

window.onload = function () {
  document.getElementById("file").addEventListener("change", load_file, false);

  // display filtering popup
  document.getElementById("filter").onclick = function() {
    document.getElementById("configuration_popup").checked = true;
  };

  // handle log level filters
  document.querySelectorAll("#filter-group-level input[type=checkbox]").forEach(checkbox => {
    checkbox.onclick = update_log_level;
  });

  // handle display filters
  document.querySelectorAll("#filter-group-data input[type=checkbox]").forEach(checkbox => {
    checkbox.onclick = update_display;
  });
};
