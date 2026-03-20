#!/bin/bash
set -e

echo "Installing dependencies..."
npm install --progress=false

echo "Building..."
npm run build
