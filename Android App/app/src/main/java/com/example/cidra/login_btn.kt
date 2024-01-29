package com.example.cidra

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import com.example.cidra.databinding.ActivityLoginBtnBinding
import com.example.cidra.login_page

class login_btn : AppCompatActivity() {
    private var binding: ActivityLoginBtnBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBtnBinding.inflate(layoutInflater)
        val view = binding?.root
        setContentView(view)

        // Start the login_page activity after a delay of 3 seconds
        Handler(Looper.getMainLooper()).postDelayed({
            val intent = Intent(this, login_page::class.java)
            startActivity(intent)
            finish() // Optional: finish the current activity if you don't want to come back to it
        }, 3000) // 3000 milliseconds = 3 seconds
    }
}
