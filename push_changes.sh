#!/usr/bin/env bash
set -e

git add .
# Commit message can be edited manually before commit if desired
git commit -m "Migrate storage to Supabase and add deployment scripts"

git push origin main
