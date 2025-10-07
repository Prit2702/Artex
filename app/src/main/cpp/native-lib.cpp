#include <jni.h>
#include <string>
#include <android/log.h>
#include <cmath>

#define LOG_TAG "EdgeDetection"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)

// Simple edge detection without OpenCV
int simpleEdgeDetection(unsigned char* data, int width, int height) {
    int edgeCount = 0;
    
    for (int y = 1; y < height - 1; y++) {
        for (int x = 1; x < width - 1; x++) {
            int idx = y * width + x;
            int gx = data[idx + 1] - data[idx - 1];
            int gy = data[idx + width] - data[idx - width];
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
    
    jbyte* inputData = env->GetByteArrayElements(input, nullptr);
    unsigned char* data = reinterpret_cast<unsigned char*>(inputData);
    
    int edgeCount = simpleEdgeDetection(data, width, height);
    
    LOGI("Detected %d edge pixels", edgeCount);
    
    env->ReleaseByteArrayElements(input, inputData, JNI_ABORT);
    
    return edgeCount;
}
