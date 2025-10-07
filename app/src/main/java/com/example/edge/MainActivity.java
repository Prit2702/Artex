package com.example.edge;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

public class MainActivity extends AppCompatActivity {

    // Load native library
    static {
        System.loadLibrary("native-lib");
    }

    // Native method declarations
    public native String getNativeMessage();
    public native int processEdgeDetection(byte[] input, int width, int height);

    private TextView statusText;
    private TextView nativeText;
    private TextView resultText;
    private Button processButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        statusText = findViewById(R.id.statusText);
        nativeText = findViewById(R.id.nativeText);
        resultText = findViewById(R.id.resultText);
        processButton = findViewById(R.id.processButton);

        // Test JNI connection
        try {
            String message = getNativeMessage();
            nativeText.setText("✅ JNI Connected: " + message);
        } catch (Exception e) {
            nativeText.setText("❌ JNI Error: " + e.getMessage());
        }

        // Demo button
        processButton.setOnClickListener(v -> {
            // Create dummy frame data
            byte[] dummyFrame = new byte[640 * 480];
            for (int i = 0; i < dummyFrame.length; i++) {
                dummyFrame[i] = (byte) (i % 256);
            }

            long startTime = System.currentTimeMillis();
            int edgeCount = processEdgeDetection(dummyFrame, 640, 480);
            long endTime = System.currentTimeMillis();

            resultText.setText(String.format(
                "✅ Processed 640x480 frame\n" +
                "⚡ Time: %d ms\n" +
                "📊 Edge pixels detected: %d\n" +
                "🎯 Est. FPS: %.1f",
                (endTime - startTime),
                edgeCount,
                1000.0 / (endTime - startTime)
            ));
        });

        // Request camera permission
        if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, 100);
        }
    }
}
