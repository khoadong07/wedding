#!/bin/bash

echo "🔍 Debug build process..."

echo "📋 Checking TypeScript..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found!"
    exit 1
fi

echo "✅ TypeScript OK"

echo "📦 Attempting build..."
NODE_OPTIONS="--max-old-space-size=2048" npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📊 Build size:"
    du -sh dist/
else
    echo "❌ Build failed!"
    exit 1
fi