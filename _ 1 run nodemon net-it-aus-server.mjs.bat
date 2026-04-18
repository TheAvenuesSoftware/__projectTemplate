REM The keyword "set" creates an environment variable that is:
REM     ✅ Available to:
REM     The current batch script
REM     Any programs launched from that script (like node index.mjs)
set serverLog=true
set consoleLog=true

REM This sets the timezone for the Node process.
REM      Node (via the underlying system libraries) will automatically apply it to all date/time operations.
REM No coding required.
set TZ=Australia/Sydney

REM      (less impactful on Windows, but still relevant for some ICU behavior)
set LANG=en_AU.UTF-8

REM memory / performance
REM      Increases heap size (in MB)
REM      Very useful for large apps or builds
set NODE_OPTIONS=--max-old-space-size=4096 --enable-source-maps

REM thread pool tuning
REM      Default is 4
REM      Helps if you do heavy:
REM           file I/O
REM           crypto
REM           compression
REM      Don’t set this too high (8–16 is typical max)
set UV_THREADPOOL_SIZE=8

start /max nodemon net-it-aus-server.mjs --ignore sessions/ --ignore logs/