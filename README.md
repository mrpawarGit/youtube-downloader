# youtube-downloader

# YouTube Video Downloader - Installation Guide

This README provides detailed installation instructions for both the backend and frontend components of the YouTube Video Downloader application.

## Project Structure

```
youtube-downloader/
├── backend/           # Node.js Express API
├── frontend/          # React + Vite applications
└── README.md
```

## Tech Stack:

- Frontend: React 18, Vite, Axios
- Backend: Node.js, Express, @distube/ytdl-core
- Media Processing: FFmpeg for audio conversion
- UI: React Icons for interface elements

## Prerequisites

- **Node.js**: Version 20.18.1 or higher (required for @distube/ytdl-core)
- **npm**: Version 7.0.0 or higher
- **FFmpeg**: Required for audio processing (automatically installed via ffmpeg-static)

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Initialize Package

```bash
npm init -y
```

### 3. Install Production Dependencies

```bash
npm install @distube/ytdl-core@^4.16.12
npm install express@^4.18.2
npm install cors@^2.8.5
npm install ffmpeg-static@^5.2.0
npm install fluent-ffmpeg@^2.1.2
npm install fs-extra@^11.1.1
npm install multer@^1.4.5-lts.1
npm install path@^0.12.7
```

### 4. Install Development Dependencies

```bash
npm install --save-dev nodemon@^3.0.1
```

### 5. Alternative: Install All at Once

```bash
npm install @distube/ytdl-core@^4.16.12 express@^4.18.2 cors@^2.8.5 ffmpeg-static@^5.2.0 fluent-ffmpeg@^2.1.2 fs-extra@^11.1.1 multer@^1.4.5-lts.1 path@^0.12.7 && npm install --save-dev nodemon@^3.0.1
```

### Backend Dependencies Explained

| Package              | Purpose                                           | Version      |
| -------------------- | ------------------------------------------------- | ------------ |
| `@distube/ytdl-core` | YouTube video downloading and metadata extraction | ^4.16.12     |
| `express`            | Web framework for Node.js                         | ^4.18.2      |
| `cors`               | Cross-Origin Resource Sharing middleware          | ^2.8.5       |
| `ffmpeg-static`      | Static FFmpeg binary for audio processing         | ^5.2.0       |
| `fluent-ffmpeg`      | FFmpeg wrapper for Node.js                        | ^2.1.2       |
| `fs-extra`           | Extended file system operations                   | ^11.1.1      |
| `multer`             | Middleware for handling multipart/form-data       | ^1.4.5-lts.1 |
| `path`               | Utilities for working with file paths             | ^0.12.7      |
| `nodemon`            | Development tool for auto-restarting server       | ^3.0.1       |

### 6. Start Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Frontend Setup

### 1. Create Frontend with Vite

```bash
npm create vite@latest frontend -- --template react
cd frontend
```

### 2. Install Base Dependencies

```bash
npm install
```

### 3. Install Additional Dependencies

```bash
npm install axios@^1.6.2
npm install react-icons@^4.12.0
```

### 4. Alternative: Install All Frontend Dependencies

```bash
npm install axios@^1.6.2 react-icons@^4.12.0
```

### Frontend Dependencies Explained

| Package                | Purpose                                         | Version |
| ---------------------- | ----------------------------------------------- | ------- |
| `react`                | JavaScript library for building user interfaces | ^18.2.0 |
| `react-dom`            | React package for working with the DOM          | ^18.2.0 |
| `axios`                | HTTP client for making API requests             | ^1.6.2  |
| `react-icons`          | Icon library for React applications             | ^4.12.0 |
| `vite`                 | Build tool and development server               | ^5.0.8  |
| `@vitejs/plugin-react` | Vite plugin for React support                   | ^4.2.1  |

### 5. Start Frontend Development Server

```bash
npm run dev
```

## Complete Installation Script

For quick setup, you can use this complete installation script:

```bash
# Create project directory
mkdir youtube-downloader
cd youtube-downloader

# Setup Backend
mkdir backend
cd backend
npm init -y
npm install @distube/ytdl-core@^4.16.12 express@^4.18.2 cors@^2.8.5 ffmpeg-static@^5.2.0 fluent-ffmpeg@^2.1.2 fs-extra@^11.1.1 multer@^1.4.5-lts.1 path@^0.12.7
npm install --save-dev nodemon@^3.0.1
cd ..

# Setup Frontend
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios@^1.6.2 react-icons@^4.12.0
cd ..

echo "Installation complete!"
```

## Environment Requirements

### Node.js Version Compatibility

- **Minimum**: Node.js 20.18.1 (required by @distube/ytdl-core)
- **Recommended**: Latest LTS version

### Port Configuration

- **Backend**: Runs on port 5000 (configurable via PORT environment variable)
- **Frontend**: Runs on port 3000 (Vite default)

## Troubleshooting

### Common Installation Issues

1. **Node.js Version Error**

   ```bash
   # Check your Node.js version
   node --version

   # If below 20.18.1, update Node.js
   ```

2. **FFmpeg Installation Issues**

   - The `ffmpeg-static` package should automatically download FFmpeg
   - If issues persist, manually install FFmpeg on your system

3. **Permission Errors**

   ```bash
   # If you encounter permission errors, use:
   npm install --unsafe-perm
   ```

4. **Proxy/Network Issues**
   ```bash
   # Configure npm registry if behind corporate firewall
   npm config set registry https://registry.npmjs.org/
   ```

### Dependency Conflicts

If you encounter dependency conflicts:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

## Running the Application

### Development Mode

1. **Start Backend** (in `backend/` directory):

   ```bash
   npm run dev
   ```

2. **Start Frontend** (in `frontend/` directory):

   ```bash
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Build

1. **Build Frontend**:

   ```bash
   cd frontend
   npm run build
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

## Additional Notes

- Ensure both backend and frontend servers are running simultaneously
- The frontend is configured to proxy API requests to the backend
- Downloaded files will be stored in `backend/downloads/` directory
- All dependencies listed are the exact versions from the package-lock.json for compatibility
