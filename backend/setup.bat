@echo off
REM AI Assistant Backend Setup Script for Windows

echo 🚀 Setting up AI Assistant Backend...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18.0.0 or higher.
    pause
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js version %NODE_VERSION% detected

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✅ .env file created from .env.example
    echo ⚠️  Please edit .env file and add your Google Gemini API key
) else (
    echo ✅ .env file already exists
)

REM Create logs directory
if not exist logs mkdir logs
echo ✅ Logs directory created

REM Run tests
echo 🧪 Running tests...
call npm test

if %ERRORLEVEL% EQU 0 (
    echo ✅ All tests passed
) else (
    echo ⚠️  Some tests failed, but setup continues...
)

echo.
echo 🎉 Backend setup completed!
echo.
echo Next steps:
echo 1. Edit .env file and add your Google Gemini API key
echo 2. Run 'npm run dev' to start the development server
echo 3. Visit http://localhost:5000 to verify the server is running
echo.
echo Available commands:
echo   npm run dev     - Start development server with auto-reload
echo   npm start       - Start production server
echo   npm test        - Run tests
echo   npm run lint    - Run linter
echo.

pause
