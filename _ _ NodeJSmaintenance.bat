@echo off
cd /d %~dp0

echo ----------------------------------------
echo Node.js Project Maintenance Script
echo ----------------------------------------

echo 1. Setting Git to be case-sensitive...
git config --global core.ignorecase false
echo Done.
echo.
pause

echo 2. Deleting package-lock.json and node_modules...
IF EXIST package-lock.json (
    del package-lock.json
    echo Deleted package-lock.json
) ELSE (
    echo package-lock.json not found
)

IF EXIST node_modules (
    rmdir /s /q node_modules
    echo Deleted node_modules folder
) ELSE (
    echo node_modules folder not found
)
echo.
pause

echo 3. Running npm-check-updates to upgrade package.json versions...
echo This command will run in a separate window:- start /wait cmd /k "npx npm-check-updates -u & pause"
start /wait cmd /c "npx npm-check-updates -u & pause"
echo.
pause

echo 4. Installing updated dependencies...
echo This command will run in a separate window:- start /wait cmd /k "npm install"
start /wait cmd /c "npm install & pause"
echo.
pause

echo 5. Listing installed packages...
echo This command will run in a separate window:- start /wait cmd /k "npm list --depth=0"
start /wait cmd /c "npm list --depth=0 & pause"
echo.
pause

echo ----------------------------------------
echo All steps completed.
echo ----------------------------------------
pause