cd %~dp0
echo off
echo	To ensure that the exact versions of dependencies specified in your package.json file are installed, you can follow these steps:
echo	1. Use Specific Versioning in package.json without using caret ^ or tilde ~ symbols.
echo		These symbols allow for flexible versioning and may not install the exact version.
echo	2. Delete package-lok.json and package.json (Optional)
echo		if you want to ensure a fresh installation without any inconsistencies:
echo		del package-lock.json (In Powershell:- Remove-Item package-lock.json)
echo		rmdir /s /q node_modules (In Powershell:- Remove-Item -Recurse -Force node_modules)
echo	3. Run npm install
echo		After updating package.json, run:
echo		npm install
echo		This will install the exact versions specified in package.json and generate a 
echo		package-lock.json file to lock those versions.
echo	4. Use  for Consistency (Optional)
echo		If you’re in a CI/CD environment or need reproducible builds, use npm ci instead of npm install.
echo		This ensures that the versions in  are used without any deviation:
echo		npm ci
echo	5. Freeze Dependency Versions (Optional)
echo		You can freeze all installed versions by regenerating package-lock.json with the --package-lock-only flag.
echo		npm install --package-lock-only
echo	6. Verify Installed Versions
echo		Check the installed versions to confirm that they match your specifications
echo		npm list
pause
echo	----------------------------------------------------------------------------
git config --global core.ignorecase false
pause
echo
echo	2.1	del package-lock.json		will now execute
pause
del package-lock.json
echo	2.2	rmdir /s /q node_modules 	will now execute
pause
rmdir /s /q node_modules
echo	3	npm install			will now execute
pause
npm install
echo	4	...no
echo	5	...no
echo	6	npm list			will now execute
pause
npm list
echo	npx npm-check-updates -u		will now execute
pause
npx npm-check-updates -u
pause
