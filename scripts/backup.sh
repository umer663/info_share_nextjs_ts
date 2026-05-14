#!/bin/bash
# === PostgreSQL Backup Script for Linux ===

# CONFIGURATION
DB_NAME="info_share_db"
DB_USER="postgres"
BACKUP_DIR="/home/yourname/pg_backup"
FILE_NAME="${DB_NAME}_backup_$(date +%F).dump"

# Create backup folder if it does not exist
mkdir -p "$BACKUP_DIR"

echo "Creating backup..."
pg_dump -U $DB_USER -d $DB_NAME -F c -f "$BACKUP_DIR/$FILE_NAME"

echo "Backup saved to: $BACKUP_DIR/$FILE_NAME"