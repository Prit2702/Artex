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


---

## ⚙️ Setup & Build Instructions

### Prerequisites
- Java JDK 11+
- Android SDK (API 33+)
- Android NDK r25+
- Node.js 16+
- ADB (Android Debug Bridge)
- Physical Android device or emulator

### Build Android App
```bash
git clone https://github.com/Prit2702/Artex.git
cd Artex
export ANDROID_HOME=~/Android/Sdk  # Adjust path as needed

./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk
```

## Run Web Viewer

```bash

cd web
npm install
npm run build
open index.html  # or serve via http-server
🔧 Tip: The web viewer works in demo mode by default. To connect to Android, you’ll need to implement data streaming (e.g., via WebSocket — see Future Work).
```

# 🧠 Technical Highlights
## ✅ What Works

1) End-to-end JNI call: Java → C++ → back to Java with processed data
2) Custom Sobel edge detector in C++ (no external libs)
3) Performance metrics calculated and displayed
4) Web viewer decoupled and testable independently

### OpenCV Integration Path (Ready to Enable)
```bash
# In CMakeLists.txt (uncomment when OpenCV SDK added)
find_package(OpenCV REQUIRED)
target_link_libraries(native-lib ${OpenCV_LIBS})
```
Then replace custom Sobel with:

### C++
```bash
cv::Canny(inputMat, outputMat, lowThresh, highThresh);

Artex/
├── app/
│   └── src/main/
│       ├── java/com/example/edge/MainActivity.java    # JNI calls + UI
│       ├── cpp/native-lib.cpp                         # C++ edge detection
│       └── cpp/CMakeLists.txt                         # NDK build config
├── web/
│   ├── src/viewer.ts                                  # TypeScript viewer
│   └── index.html                                     # Web UI
└── README.md

``` 

## 👨‍💻 Development Approach
1) Built without Android Studio — using VS Code + CLI only
2) Pure Gradle + NDK workflow — full understanding of build pipeline
3) Git-clean commits — logical progression from setup → JNI → C++ → Web
4) Cross-platform mindset — data format designed for Android ↔ Web compatibility