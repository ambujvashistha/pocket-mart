#!/bin/bash

echo "Starting build process..."

# backend
cd server
npm install

# frontend
cd ../client
npm install
npm run build

echo "Build completed!"