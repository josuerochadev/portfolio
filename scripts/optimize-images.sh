#!/bin/bash

# Portfolio Image Optimization Script
# Converts PNG to optimized WebP with multiple sizes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directories
INPUT_DIR="public/assets/images/projects"
OUTPUT_DIR="public/assets/images/projects/optimized"
BACKUP_DIR="public/assets/images/projects/backup"

echo -e "${GREEN}🚀 Portfolio Image Optimization Script${NC}"
echo "======================================"

# Create directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$BACKUP_DIR"

# Function to optimize image
optimize_image() {
    local input_file="$1"
    local filename=$(basename "$input_file" .png)
    
    echo -e "\n${YELLOW}📸 Optimizing: $filename${NC}"
    
    # Desktop version (1200px max, quality 85)
    magick "$input_file" \
        -resize 1200x800\> \
        -quality 85 \
        -define webp:method=6 \
        -define webp:alpha-quality=95 \
        "$OUTPUT_DIR/${filename}-desktop.webp"
    
    # Mobile version (800px max, quality 80) 
    magick "$input_file" \
        -resize 800x600\> \
        -quality 80 \
        -define webp:method=6 \
        -define webp:alpha-quality=90 \
        "$OUTPUT_DIR/${filename}-mobile.webp"
    
    # Thumbnail version (400px max, quality 75)
    magick "$input_file" \
        -resize 400x300\> \
        -quality 75 \
        -define webp:method=6 \
        -define webp:alpha-quality=85 \
        "$OUTPUT_DIR/${filename}-thumb.webp"
    
    # Get file sizes
    local original_size=$(du -h "$input_file" | cut -f1)
    local desktop_size=$(du -h "$OUTPUT_DIR/${filename}-desktop.webp" | cut -f1)
    local mobile_size=$(du -h "$OUTPUT_DIR/${filename}-mobile.webp" | cut -f1)
    local thumb_size=$(du -h "$OUTPUT_DIR/${filename}-thumb.webp" | cut -f1)
    
    echo -e "  Original: ${RED}$original_size${NC} → Desktop: ${GREEN}$desktop_size${NC}, Mobile: ${GREEN}$mobile_size${NC}, Thumb: ${GREEN}$thumb_size${NC}"
}

# Process all PNG files
echo -e "\n${YELLOW}📁 Processing PNG files...${NC}"
for file in "$INPUT_DIR"/project-*.png; do
    if [[ -f "$file" ]]; then
        optimize_image "$file"
    fi
done

# Clean up old assets
echo -e "\n${YELLOW}🧹 Cleaning up old assets...${NC}"

# Backup old files before deletion
echo "Backing up old files..."
for file in "$INPUT_DIR"/project[0-9].webp "$INPUT_DIR"/project[0-9]-*.webp; do
    if [[ -f "$file" ]]; then
        mv "$file" "$BACKUP_DIR/"
        echo -e "  Backed up: $(basename $file)"
    fi
done

# Remove the massive GIF if it exists
if [[ -f "public/assets/videos/profile1.gif" ]]; then
    mv "public/assets/videos/profile1.gif" "$BACKUP_DIR/"
    echo -e "  ${GREEN}✅ Moved profile1.gif (9.4M) to backup${NC}"
fi

# Summary
echo -e "\n${GREEN}✅ Optimization Complete!${NC}"
echo "======================================"
echo -e "📁 Optimized images: $OUTPUT_DIR"
echo -e "🗂️  Backups: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Update project data with new image paths"
echo "2. Test responsive images"
echo "3. Remove backup folder when satisfied"
echo ""
echo -e "${YELLOW}💡 Performance Impact:${NC}"
echo "- Desktop images: ~50-100KB (vs 3-4MB)"
echo "- Mobile images: ~30-70KB" 
echo "- Thumbnails: ~15-30KB"
echo "- Total savings: ~15MB+ → ~500KB"