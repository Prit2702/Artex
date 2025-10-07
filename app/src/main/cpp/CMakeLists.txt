STEP 6: NATIVE C++ CODE (45 MIN)
app/src/main/cpp/CMakeLists.txt:

cmake

cmake_minimum_required(VERSION 3.22.1)
project("native-lib")

add_library(native-lib SHARED
    native-lib.cpp)

target_link_libraries(native-lib
    android
    log)
app/src/main/cpp/native-lib.cpp:

C++

#include <jni.h>
#include <string>
#include <android/log.h>
#include <cmath>

#define LOG_TAG "EdgeDetection"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)

// Simple edge detection without OpenCV (demonstrating C++ processing)
int simpleEdgeDetection(unsigned char* data, int width, int height) {
    int edgeCount = 0;
    
    // Simple Sobel-like edge detection
    for (int y = 1; y < height - 1; y++) {
        for (int x = 1; x < width - 1; x++) {
            int idx = y * width + x;
            
            // Horizontal gradient
            int gx = data[idx + 1] - data[idx - 1];
            
            // Vertical gradient
            int gy = data[idx + width] - data[idx - width];
            
            // Gradient magnitude
            int magnitude = abs(gx) + abs(gy);
            
            if (magnitude > 50) {
                edgeCount++;
            }
        }
    }
    
    return edgeCount;
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_example_edge_MainActivity_getNativeMessage(
        JNIEnv* env,
        jobject /* this */) {
    
    LOGI("JNI method called successfully");
    std::string message = "Native C++ initialized - Ready for OpenCV integration";
    return env->NewStringUTF(message.c_str());
}

extern "C" JNIEXPORT jint JNICALL
Java_com_example_edge_MainActivity_processEdgeDetection(
        JNIEnv* env,
        jobject /* this */,
        jbyteArray input,
        jint width,
        jint height) {
    
    LOGI("Processing frame: %dx%d", width, height);
    
    // Get byte array from Java
    jbyte* inputData = env->GetByteArrayElements(input, nullptr);
    unsigned char* data = reinterpret_cast<unsigned char*>(inputData);
    
    // Process with simple edge detection
    int edgeCount = simpleEdgeDetection(data, width, height);
    
    LOGI("Detected %d edge pixels", edgeCount);
    
    // Release array
    env->ReleaseByteArrayElements(input, inputData, JNI_ABORT);
    
    return edgeCount;
}
Bash

git add .
git commit -m "Add native C++ edge detection (OpenCV-ready structure)"