@echo off
:: === PostgreSQL Restore Script for Windows ===

:: CONFIGURATION
set PGPATH="C:\Program Files\PostgreSQL\18\bin"
set DB_NAME=info_share_db
set DB_USER=postgres
set BACKUP_FILE=C:\pg_backup\info_share_db_backup.dump

echo Restoring database...
%PGPATH%\pg_restore.exe -U %DB_USER% -d %DB_NAME% -c "%BACKUP_FILE%"

echo Restore completed.
pause