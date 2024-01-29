package com.example.cidra

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.example.cidra.databinding.ActivityProfileBinding

class Profile_Activity : AppCompatActivity() {
    var binding: ActivityProfileBinding? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProfileBinding.inflate(layoutInflater)
        val view = binding?.root
        setContentView(view)

        val token = intent.getStringExtra("token")
        val userName = intent.getStringExtra("userName")
        val userRollNo = intent.getStringExtra("userRollNo")
        val userEmail = intent.getStringExtra("userEmail")
        val userAddress = intent.getStringExtra("userAddress")
        val userDob = intent.getStringExtra("userDob")
        val userMobileNumber = intent.getStringExtra("userMobileNumber")


        binding?.stdName?.text = userName
        binding?.stdRoll?.text = userRollNo
        binding?.stdEmail?.text = userEmail
        binding?.stdAddress?.text = userAddress


    }
}