#!/bin/bash

# Script to check if images are properly loaded in Docker container

echo "🔍 Checking Docker container for images..."
echo ""

# Check if container is running
if ! docker ps | grep -q wedding-invitation; then
    echo "❌ Container 'wedding-invitation' is not running"
    echo "Starting container..."
    docker-compose up -d
    sleep 5
fi

echo "📁 Checking assets directory:"
docker exec wedding-invitation ls -lah /usr/share/nginx/html/assets/ | head -20

echo ""
echo "📁 Checking optimized directory:"
docker exec wedding-invitation ls -lah /usr/share/nginx/html/optimized/ | head -20

echo ""
echo "🌐 Testing image URLs:"
echo ""

# Test a few image URLs
IMAGES=(
    "assets/A%20KHOA%20-%20C%20HANG_01.jpg"
    "optimized/A%20KHOA%20-%20C%20HANG_01-480.webp"
    "optimized/A%20KHOA%20-%20C%20HANG_01-768.webp"
)

for img in "${IMAGES[@]}"; do
    echo "Testing: $img"
    docker exec wedding-invitation wget -q -O /dev/null "http://localhost/$img" && echo "✅ OK" || echo "❌ FAILED"
done

echo ""
echo "📊 Total files in assets:"
docker exec wedding-invitation find /usr/share/nginx/html/assets -type f | wc -l

echo ""
echo "📊 Total files in optimized:"
docker exec wedding-invitation find /usr/share/nginx/html/optimized -type f | wc -l
