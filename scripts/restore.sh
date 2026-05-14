#!/bin/bash
# === PostgreSQL Restore Script for Linux ===

# CONFIGURATION
DB_NAME="info_share_db"
DB_USER="postgres"
BACKUP_FILE="/home/yourname/pg_backup/info_share_db_backup.dump"

echo "Restoring database..."
pg_restore -U $DB_USER -d $DB_NAME -c "$BACKUP_FILE"

echo "Restore completed."