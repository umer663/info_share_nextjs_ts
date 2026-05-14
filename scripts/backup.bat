@echo off
:: === PostgreSQL Backup Script for Windows (Date + Time) ===

:: CONFIGURATION
set "PGPATH=C:\Program Files\PostgreSQL\18\bin"
set "DB_NAME=info_share_db"
set "DB_USER=postgres"
set "BACKUP_DIR=C:\pg_backup"

:: Extract date values (YYYY-MM-DD)
for /f "tokens=1-4 delims=/ " %%a in ("%date%") do (
    set YYYY=%%d
    set MM=%%b
    set DD=%%c
)

:: Extract time values (HH-MM-SS without colon)
set HH=%time:~0,2%
set MN=%time:~3,2%
set SC=%time:~6,2%

:: Fix leading space issue in hours
if "%HH:~0,1%"==" " set HH=0%HH:~1,1%

:: Final file name
set "FILE_NAME=%DB_NAME%_backup_%YYYY%-%MM%-%DD%_%HH%-%MN%-%SC%.dump"

:: Create backup dir if needed
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo Creating backup...
"%PGPATH%\pg_dump.exe" -U "%DB_USER%" -F c -d "%DB_NAME%" -f "%BACKUP_DIR%\%FILE_NAME%"

echo Backup completed:
echo %BACKUP_DIR%\%FILE_NAME%
pause