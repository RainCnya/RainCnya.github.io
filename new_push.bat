@echo off
setlocal EnableExtensions

set "REPO_DIR=H:\Hexo_Blog"
set "REMOTE=origin"
set "BRANCH=main"
set "RESULT=FAILED: Unknown error."
set "EXIT_CODE=1"
set "PUSHED_DIR="

echo ==================================================
echo Blog repository sync
echo ==================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
    set "RESULT=FAILED: Git was not found in PATH."
    goto :finish
)

pushd "%REPO_DIR%" >nul 2>&1
if errorlevel 1 (
    set "RESULT=FAILED: Cannot enter blog directory: %REPO_DIR%"
    goto :finish
)
set "PUSHED_DIR=1"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    set "RESULT=FAILED: The blog directory is not a Git repository."
    goto :finish
)

set "CURRENT_BRANCH="
for /f "delims=" %%i in ('git branch --show-current 2^>nul') do set "CURRENT_BRANCH=%%i"
if not defined CURRENT_BRANCH (
    set "RESULT=FAILED: The repository is in detached HEAD state."
    goto :finish
)
if /i not "%CURRENT_BRANCH%"=="%BRANCH%" (
    set "RESULT=FAILED: Current branch is '%CURRENT_BRANCH%', expected '%BRANCH%'."
    goto :finish
)

echo Repository: %REPO_DIR%
echo Branch:     %CURRENT_BRANCH%
echo.
echo Local changes:
git status --short
if errorlevel 1 (
    set "RESULT=FAILED: Could not read repository status."
    goto :finish
)

echo.
echo Staging local changes...
git add -A
if errorlevel 1 (
    set "RESULT=FAILED: git add failed."
    goto :finish
)

git diff --cached --quiet
set "DIFF_STATUS=%ERRORLEVEL%"
if %DIFF_STATUS% EQU 1 (
    echo Creating commit...
    git commit -m "chore: update blog"
    if errorlevel 1 (
        set "RESULT=FAILED: git commit failed."
        goto :finish
    )
) else if %DIFF_STATUS% EQU 0 (
    echo No new local changes to commit.
) else (
    set "RESULT=FAILED: Could not inspect staged changes."
    goto :finish
)

echo.
echo Fetching remote updates...
git fetch %REMOTE% %BRANCH%
if errorlevel 1 (
    set "RESULT=FAILED: git fetch failed. Check the network and remote configuration."
    goto :finish
)

git show-ref --verify --quiet refs/remotes/%REMOTE%/%BRANCH%
if errorlevel 1 (
    set "RESULT=FAILED: Remote branch %REMOTE%/%BRANCH% was not found."
    goto :finish
)

set "BEHIND="
for /f %%i in ('git rev-list --count HEAD..%REMOTE%/%BRANCH% 2^>nul') do set "BEHIND=%%i"
if not defined BEHIND (
    set "RESULT=FAILED: Could not compare the local and remote branches."
    goto :finish
)

if %BEHIND% GTR 0 (
    echo Remote branch is ahead by %BEHIND% commit(s).
    echo Rebasing local commits onto %REMOTE%/%BRANCH%...
    git pull --rebase %REMOTE% %BRANCH%
    if errorlevel 1 (
        set "RESULT=FAILED: Rebase failed. Resolve conflicts, then run git rebase --continue or git rebase --abort."
        goto :finish
    )
) else (
    echo Remote branch has no newer commits.
)

set "AHEAD="
for /f %%i in ('git rev-list --count %REMOTE%/%BRANCH%..HEAD 2^>nul') do set "AHEAD=%%i"
if not defined AHEAD (
    set "RESULT=FAILED: Could not determine whether commits need to be pushed."
    goto :finish
)

if %AHEAD% GTR 0 (
    echo.
    echo Pushing %AHEAD% commit(s) to %REMOTE%/%BRANCH%...
    git push %REMOTE% %BRANCH%
    if errorlevel 1 (
        set "RESULT=FAILED: git push failed."
        goto :finish
    )
    set "RESULT=SUCCESS: Blog source was synchronized and pushed."
) else (
    set "RESULT=SUCCESS: Repository is already up to date."
)
set "EXIT_CODE=0"

:finish
if defined PUSHED_DIR popd >nul 2>&1

echo.
echo ==================================================
echo Result: %RESULT%
echo ==================================================
echo.
pause

endlocal & exit /b %EXIT_CODE%
