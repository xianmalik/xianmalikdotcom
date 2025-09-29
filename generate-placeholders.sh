#!/bin/bash

# Create placeholder images using ImageMagick if available, otherwise just create empty files
if command -v convert >/dev/null 2>&1; then
    echo "Creating placeholder images with ImageMagick..."
    
    # Dark keyboard-style image
    convert -size 800x600 xc:"#2a2a2a" -fill white -pointsize 32 -gravity center -annotate +0+0 "Keys and Quests\nKeyboard Blog" static/projects/keyboard-blog.jpg
    
    # Portfolio gradient
    convert -size 800x600 gradient:"#667eea"-"#764ba2" -fill white -pointsize 32 -gravity center -annotate +0+0 "Portfolio Site" static/projects/portfolio.jpg
    
    # E-commerce with blue tones
    convert -size 800x600 gradient:"#4facfe"-"#00f2fe" -fill white -pointsize 32 -gravity center -annotate +0+0 "E-Commerce App" static/projects/ecommerce.jpg
    
    # Task manager with green tones
    convert -size 800x600 gradient:"#43e97b"-"#38f9d7" -fill black -pointsize 32 -gravity center -annotate +0+0 "Task Manager" static/projects/tasks.jpg
    
    # Weather dashboard with orange/yellow
    convert -size 800x600 gradient:"#fa709a"-"#fee140" -fill white -pointsize 32 -gravity center -annotate +0+0 "Weather Dashboard" static/projects/weather.jpg
else
    echo "ImageMagick not found. Creating placeholder files..."
    # Just create empty files as placeholders
    touch static/projects/keyboard-blog.jpg
    touch static/projects/portfolio.jpg
    touch static/projects/ecommerce.jpg
    touch static/projects/tasks.jpg
    touch static/projects/weather.jpg
fi

echo "Placeholder images created!"