package com.example.edge;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Simple TextView for testing
        TextView textView = new TextView(this);
        textView.setText("Edge Detection App - Hello World!");
        textView.setTextSize(20);

        setContentView(textView);
    }
}
