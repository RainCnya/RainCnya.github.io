@echo off
setlocal

cd /d G:\Hexo_Blog
if errorlevel 1 (
    echo Cannot enter blog directory.
    exit /b 1
)

echo Checking repository...
git status --short

git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo No changes to commit.
    exit /b 0
)

git commit -m "chore: update blog"
if errorlevel 1 (
    echo Commit failed.
    exit /b 1
)

git push origin main
if errorlevel 1 (
    echo Push failed.
    exit /b 1
)

echo Blog source pushed successfully.