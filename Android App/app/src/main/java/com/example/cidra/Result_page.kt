package com.example.cidra

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebViewClient
import com.example.cidra.databinding.ActivityResultPageBinding

class Result_page : AppCompatActivity() {
    var binding: ActivityResultPageBinding? = null
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityResultPageBinding.inflate(layoutInflater)
        val view=binding?.root
        setContentView(view)

        val webview = binding?.resultSection
        webview?.settings?.javaScriptEnabled = true

        webview?.settings?.domStorageEnabled = true
        webview?.webViewClient = WebViewClient()


        // Load a website (e.g., Google)
        webview?.loadUrl("https://script.google.com/a/macros/iiitbh.ac.in/s/AKfycbyBBrJvuqCpUIMioNsrxInMroII7TATT-8u5wo0iTWS3kIT1zpcKVCeCGBlku3wsqJi/exec")
    }
}