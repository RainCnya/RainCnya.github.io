@echo off
:: 进入博客根目录（请根据你的实际路径修改）
cd /d G:\Hexo_Blog
:: 执行 Git 提交
git add .
git commit -m "Daily auto backup %date%"
git push origin main