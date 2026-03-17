#!/bin/bash

echo "🚀 Bắt đầu build tối ưu hóa..."

# Clean previous build
echo "🧹 Dọn dẹp build cũ..."
rm -rf dist

# Build with optimizations
echo "📦 Building với tối ưu hóa..."
npm run build

# Check bundle size
echo "📊 Kiểm tra kích thước bundle..."
du -sh dist/

# List largest files
echo "📋 Top 10 files lớn nhất:"
find dist -type f -exec du -h {} + | sort -rh | head -10

# Gzip simulation
echo "🗜️  Ước tính kích thước sau gzip:"
find dist -name "*.js" -o -name "*.css" | while read file; do
    original=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    gzipped=$(gzip -c "$file" | wc -c)
    echo "$(basename "$file"): ${original} bytes → ${gzipped} bytes ($(echo "scale=1; $gzipped * 100 / $original" | bc)%)"
done

echo "✅ Build hoàn thành! Kiểm tra thư mục dist/"