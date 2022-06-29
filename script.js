
"use strict";

// convert component name to component group to group similar
// e.g. for "ui-macro" and "qt-ui" use the same "UI" filtering component
function component_group(name) {
  if (name == "zconfig" || name == "parser::yum" || name == "Progress++"
    || name == "parser++" || name == "parser" || name == "FileChecker"
    || name == "MODALIAS++" || name.match(/^zypp/) || name.match(/^librpm/)) {

    return "libzypp";
  }
  else if (name == "zypp::solver" || name.match(/^libsolv/)) {
    return "Solver";
  }
  else if (name == "Pkg" || name == "Pkg++") {
    return "Pkg-bindings";
  }
  else if (name == "bash" || name == "scr" || name.match(/^agent-/) || name.match(/^ag_/)) {
    return "Agents";
  }
  else if (name == "ui" || name == "libycp" || name.match(/^ui-/) || name.match(/-ui$/) || name.match(/^qt-/)) {
    return "UI";
  }
  else if (name == "liby2" || name == "wfm" || name == "liby2") {
    return "yast2-core"
  }
  else if (name == "Interpreter") {
    return "Ruby"
  }
  else {
    return name;
  }
}

function add_line(parent, entry) {
  var node = document.createElement("div");
  node.classList.add("log-level-" + entry.level)
  node.classList.add("log-component-" + entry.component_group);
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

function start_group(node, label, id) {
  console.log("Group", label);

  var summary = document.createElement("summary");
  summary.classList.add("log-group-header");
  summary.textContent = label;
  summary.id = "log-group-header-" + id;

  var details = document.createElement("details");
  details.appendChild(summary)

  node.appendChild(details);

  return details;
}

function add_pid_header(parent, pid) {
  var node = document.createElement("h3");
  node.textContent = "Process " + pid;
  node.id = "pid-header-" + pid;
  parent.appendChild(node);
}

function create_pid_index(pids) {
  var index = document.getElementById("index");
  pids.forEach((data, pid) => {
    if (data.summary) {
      var index_item = document.createElement("h4");
      var link = document.createElement("a");
      link.href = "#pid-header-" + pid;
      link.textContent = "Process " + pid + " - " + data.summary;
      index_item.appendChild(link);

      index.appendChild(index_item);
      index.appendChild(data.index);

      var pid_header = document.getElementById("pid-header-" + pid)
      pid_header.style.display = "";
      pid_header.textContent = link.textContent;

      document.getElementById("index-header").textContent = "Process Index";
    }
  });
}

function parse_y2log(name, y2log) {
  document.getElementById("file-header").textContent = "Rendered File \"" + name + "\"";

  var component_groups = new Set();
  var pids = new Map();
  var last_pid = null;
  // unique group id
  var group_id = 0;

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

      if (entry.pid != last_pid) {
        if (!pids.has(entry.pid))
        {
          var pid_item = {
            summary: null,
            index: document.createElement("div")
          };
          pids.set(entry.pid, pid_item);
          // add a PID header (invisible so far)
          var h3_node = document.createElement("h3");
          h3_node.classList.add("pid-header");
          h3_node.id = "pid-header-" + entry.pid;
          h3_node.style.display = "none";
          document.getElementById("content").appendChild(h3_node);
        }
        // restart from the top level
        parent_node = document.getElementById("content");
        // add_pid_header(parent_node, entry.pid);
        last_pid = entry.pid;
      }

      // some messages do not contain the file location
      res = entry.message.match(/^([^ ]*:\d+) (.*)/)
      if (res) {
        entry.location = res[1];
        entry.message = res[2];
      }

      var pid_entry = pids.get(entry.pid);

      res = entry.message.match(/y2base called with \["([^"]*)"/);
      if (res) {
        pid_entry.summary = "YaST client \"" + res[1] + "\"";
      }

      if (entry.location) {
        res = entry.message.match(/Number of modified files: (\d+)/);
        var res2 = entry.location.match(/\byupdate\b/);
        if (res && res2) {
          pid_entry.summary = "yupdate - updated " + res[1] + " files";
        }
      }

      // log group opened
      res = entry.message.match(/^::group::(.*)/);
      if (res) {
        parent_node = start_group(parent_node, res[1], group_id);

        var index_entry = document.createElement("a");
        index_entry.classList.add("index-entry");
        index_entry.textContent = res[1];
        index_entry.href = "#log-group-header-" + group_id;
        pid_entry.index.appendChild(index_entry);
        pid_entry.index = index_entry;

        group_id = group_id + 1;
      }

      entry.component_group = component_group(entry.component);
      component_groups.add(entry.component_group);

      // log group closed
      res = entry.message.match(/^::endgroup::(.*)/);
      if (res) {
        add_line(parent_node, entry);
        parent_node = parent_node.parentElement;
        if (pid_entry.index.parentElement) {
          pid_entry.index = pid_entry.index.parentElement;
        }
      }
      else {
        add_line(parent_node, entry);
      }
    }
    else {
      append_line(parent_node, line);
    }
  });

  create_pid_index(pids);
  add_component_filters(component_groups);
}

// load a local file selected by user
function load_file(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  // clean the previous content
  ["content", "file-header", "filter-group-components-list", "index-header",
    "index" ].forEach( id => {
    document.getElementById(id).textContent = "";
  });

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
  const new_style = event.srcElement.checked ? "initial" : "none";
  document.querySelectorAll(event.srcElement.dataset.selector).forEach(node => {
    node.style.display = new_style;
  });
}

function update_components(checkbox, group) {
  const new_style = checkbox.checked ? "" : "none";
  document.querySelectorAll(".log-component-" + group).forEach(node => {
    node.style.display = new_style;
  });
}

function add_component_filters(component_groups) {
  var parent = document.getElementById("filter-group-components-list")
  component_groups.forEach(group => {

    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.onclick = function (e) {
      update_components(input, group);
    }

    var span = document.createElement("span");
    span.classList.add("checkable");
    span.textContent = group;

    var label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(span);

    parent.appendChild(label);
  });
}

window.onload = function () {
  document.getElementById("file").addEventListener("change", load_file, false);

  // display filtering popup
  document.getElementById("filter").onclick = function () {
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
