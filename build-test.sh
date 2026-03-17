#!/bin/bash

echo "🧹 Cleaning previous build..."
rm -rf dist

echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📊 Build size:"
    du -sh dist/
    echo "📋 Build contents:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi