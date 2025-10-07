# 🎥 Real-Time Edge Detection System

Cross-platform edge detection demo showcasing Android NDK, JNI, OpenCV-ready architecture, and TypeScript web visualization.

## ✅ Implemented Features

### Android Application
- ✅ **JNI Integration**: Native C++ bridge fully functional
- ✅ **Edge Detection Algorithm**: Custom Sobel-based implementation in C++
- ✅ **Performance Monitoring**: Real-time FPS and processing time tracking
- ✅ **OpenCV-Ready Architecture**: Modular design ready for OpenCV integration
- ✅ **Camera Permission Handling**: Runtime permission requests

### Web Viewer
- ✅ **TypeScript-based visualization**: Type-safe frame viewer
- ✅ **Real-time stats display**: FPS, resolution, processing time
- ✅ **Multiple render modes**: Support for different edge detection algorithms
- ✅ **Frame simulation**: Demo mode for testing without Android device
- ✅ **Base64 frame support**: Ready to receive data from Android

## 📷 Screenshots

### Android App
![Android Demo](docs/android_screenshot.png)

### Web Viewer
![Web Viewer](docs/web_screenshot.png)

## 🏗️ Architecture
```bash
┌─────────────┐
│ Camera │
│ (Android) │
└──────┬──────┘
│ YUV/RGB Frame
▼
┌─────────────┐
│ JNI Bridge │
│ (Java→C++) │
└──────┬──────┘
│ Byte Array
▼
┌─────────────┐
│ OpenCV C++ │ ◄── Edge Detection (Canny/Sobel)
│ Processing │
└──────┬──────┘
│ Processed Data
▼
┌─────────────┐
│ OpenGL ES │ ◄── Texture Rendering
│ Renderer │
└──────┬──────┘
│
▼
┌─────────────┐
│ Display │
└─────────────┘
│
│ (Optional) Base64 Export
▼
┌─────────────┐
│ TypeScript │
│ Web Viewer │
└─────────────┘
```


## ⚙️ Setup & Build Instructions

### Prerequisites
- Java JDK 11+
- Android SDK (API 33)
- Android NDK r25+
- Node.js 16+
- ADB tools
- Physical Android device or emulator

### Android Build (Command Line)

