# Ylogviewer

## :warning: This project is obsolete! See the [newer version](https://github.com/lslezak/ylogviewer2) based on React and PatternFly.

This is an experimental YaST log (y2log) viewer.

The online version is available at https://lslezak.github.io/ylogviewer/.

## Features

- Colorization depending on level (orange warnings, red errors)
- Show/hide message components (date, time, severity, PID, ...)
- Filtering
  - By severity (warning, error,...)
  - By component (libzypp, UI, storage, ...)
- Displays list of the found YaST processes, useful if the log contains several
  YaST runs
- Can read compressed log files (\*.gz, \*.bz2, \*.xz), even whole tar archives
  created by the [save_y2logs](
  https://github.com/yast/yast-yast2/blob/master/scripts/save_y2logs) script
- Local processing, the selected log file is NOT uploaded anywhere, the
  ylogviewer uses some HTML5 features processes the log completely locally!
  That has several advantages:
  - Speed - nothing is uploaded or downloaded, no bandwidth limitations
  - Security - the logs might potentially contain sensitive data, all data
    stay at your machine!
  - Offline mode - the viewer can be used without internet connection, just
    open the `index.html` file in your web browser

## TODO

Here are some ideas how to improve the viewer:

- Do not load the hidden components, if you user wants to see them then reload
  the log
- Two passes, first scan the files, display a summary, then let the user
  choose which parts/files will be loaded
- Allow to not load the debug messages (just hiding them is not nice, they still
  take lot of memory)
- Load other files from tarball archives
- Bookmarks to easily mark some interesting parts and easily navigate between
  them (e.g. like in Visual Studio Code)
- Improve the code, add comments
- Use some tools for merging/minifying all used Javascript files
- Use [Sass](https://sass-lang.com/)?

## Used Libraries

- [Picnic CSS](https://picnicss.com/) - Lightweight CSS framework
- [xzwasm](https://github.com/SteveSanderson/xzwasm) - XZ decompression library
- [bz2.js](https://github.com/SheetJS/bz2) - Bzip2 decompression library
- [pako](https://github.com/nodeca/pako) - Gzip decompression library
- [js-untar](https://github.com/InvokIT/js-untar) - Reading TAR archive
