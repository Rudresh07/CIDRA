package com.example.cidra

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.example.cidra.databinding.ActivityMainBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : AppCompatActivity() {
    private var binding: ActivityMainBinding? = null
    private var userToken: String = ""
    private var userName: String = ""
    private var userRollNo: String = ""
    private var userEmail: String = ""
    private var userAddress: String = ""
    private var userDob: String = ""
    private var userMobileNumber: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding!!.root
        setContentView(view)

        val token = intent.getStringExtra("token")
        // Assuming you have obtained the user's token after a successful login
        userToken = "$token"

        // Fetch user profile after a successful login
        GlobalScope.launch(Dispatchers.IO) {
            fetchUserProfile(userToken)
        }

        binding?.result?.setOnClickListener {
            val intent = Intent(this, Result_page::class.java)
            startActivity(intent)
        }

        binding?.notice?.setOnClickListener {
            val intent = Intent(this, Notice_page::class.java)
            startActivity(intent)
        }

        binding?.profile?.setOnClickListener {
            val intent = Intent(this, Profile_Activity::class.java).apply {
                putExtra("token", userToken)
                putExtra("userName", userName)
                putExtra("userRollNo", userRollNo)
                putExtra("userEmail", userEmail)
                putExtra("userAddress", userAddress)
                putExtra("userDob", userDob)
                putExtra("userMobileNumber", userMobileNumber)
            }
            startActivity(intent)
        }
        binding?.lecture?.setOnClickListener {
            val intent = Intent(this, Lecture_page::class.java).apply {
                putExtra("token", userToken)
            }
            startActivity(intent)
        }

        binding?.logoutBtn?.setOnClickListener {
            performLogout()
        }

        binding?.academicCalender?.setOnClickListener {
            val intent = Intent(this, Academic_calender::class.java)
            startActivity(intent)
        }
        binding?.assignment?.setOnClickListener {
            val intent = Intent(this, Assignment::class.java)
            startActivity(intent)
        }

        binding?.complain?.setOnClickListener {
            val intent = Intent(this, complain_page::class.java).apply {
                putExtra("token", userToken)
            }
            startActivity(intent)
        }
    }

    private fun performLogout() {
        // Clear token from preferences
        clearTokenFromPreferences()

        // Redirect to login page
        val intent = Intent(this, login_page::class.java)
        intent.putExtra("logout","1")
        startActivity(intent)
        Toast.makeText(this, "logout has been clicked", Toast.LENGTH_SHORT).show()
        finish()
    }

    private fun clearTokenFromPreferences() {
        val preferences = getPreferences(Context.MODE_PRIVATE)
        preferences.edit().remove("token").clear().apply() // Clear all preferences
        Log.d("token", "Token removed from preferences")
        Log.d("token1", "${userToken}")
    }

    private fun fetchUserProfile(token: String) {
        try {
            val url = URL("https://cidra-backend.onrender.com/profile/profile")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            connection.setRequestProperty("Authorization", "$token")

            val responseCode = connection.responseCode
            Log.d("ResponseCode", "Response Code: $responseCode")
            val response = HttpURLConnection.HTTP_OK
            Log.d("Response", "Response: $response")

            if (responseCode == HttpURLConnection.HTTP_OK) {
                val reader = BufferedReader(InputStreamReader(connection.inputStream))
                val response = reader.readText()

                // Parse the user profile data from the response JSON
                val userProfile = JSONObject(response).getJSONObject("user")

                // Access the profile data as needed
                userName = userProfile.getString("name")
                userRollNo = userProfile.getString("rollNo")
                userEmail = userProfile.getString("email")
                userAddress = userProfile.getString("address")
                userDob = userProfile.getString("dob")
                userMobileNumber = userProfile.getString("mobileNumber")

                runOnUiThread {
                    // Handle the user profile data here
                   // showToast("Profile fetched successfully\nName: $userName\nRoll No: $userRollNo\nEmail: $userEmail")
                }
            } else {
                runOnUiThread {
                    showToast("Failed to fetch user profile")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            runOnUiThread {
                showToast("An error occurred while fetching user profile")
            }
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
