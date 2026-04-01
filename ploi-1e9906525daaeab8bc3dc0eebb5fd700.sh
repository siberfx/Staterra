#!/bin/bash

set -e
cd /home/ploi/staterra.nl

git fetch -v --prune
git pull origin main

if [ ! -f .env.production ]; then
  if [ -f .env.production.test ]; then
    echo "⚠️  .env.production not found, generating from test ..."
    cp .env.production.test .env.production
  else
    echo "❌  .env.production.test also not found! Deploy aborting."
    exit 1
  fi
fi

npm ci
npm run build

# Stop any previous instance
pkill -f "serve dist" || true

# Start the static file server in the background
nohup npm run start > /dev/null 2>&1 &

echo "" | sudo -S service php8.4-fpm reload
echo "🚀 Repo: " Staterra
echo "🚀 Commit: " "Remove example environment configuration file (.env.example)"
echo "🚀 Released At: " $(date "+%Y-%m-%d %H:%M:%S")
echo "🚀 React Project has been deployed!"