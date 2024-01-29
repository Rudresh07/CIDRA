package com.example.cidra

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.io.BufferedOutputStream
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

class login_page : AppCompatActivity() {

    private lateinit var rollNoEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var loginButton: Button

    private fun determineToken(): String {  
        // Check for "logout" extra
        val isLogout = intent.getStringExtra("logout") == "1"
        return if (isLogout) {
            // If "logout" extra is present, return an empty string
            ""
        } else {
            // If no "logout" extra, get the token from preferences
            getTokenFromPreferences()
        }
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Check for the existence of a token

        // Check for the existence of a token
        val savedToken = determineToken()
        if (savedToken.isNotBlank()) {
            // If a token exists, proceed to MainActivity
            navigateToMainActivity(savedToken)
            return
        }

        setContentView(R.layout.activity_login_page)

        rollNoEditText = findViewById(R.id.rollNumber)
        passwordEditText = findViewById(R.id.password)
        loginButton = findViewById(R.id.submitbtn)

        loginButton.setOnClickListener {
            val rollNo = rollNoEditText.text.toString()
            val password = passwordEditText.text.toString()

            if (rollNo.isNotBlank() && password.isNotBlank()) {
                GlobalScope.launch(Dispatchers.IO) {
                    performLogin(rollNo, password)
                }
                rollNoEditText.text.clear()
                passwordEditText.text.clear()
            } else {
                showToast("Please fill all credentials")
            }
        }
    }

    private fun performLogin(rollNo: String, password: String) {
        try {
            val url = URL("https://cidra-backend.onrender.com/auth/login")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = JSONObject().apply {
                put("rollNo", rollNo)
                put("password", password)
            }.toString()

            val outputStream = BufferedOutputStream(connection.outputStream)
            outputStream.write(jsonInputString.toByteArray())
            outputStream.flush()

            val responseCode = connection.responseCode

            if (responseCode == HttpURLConnection.HTTP_OK) {
                val reader = BufferedReader(InputStreamReader(connection.inputStream))
                val response = reader.readText()

                // Parse the token from the response JSON
                val jsonResponse = JSONObject(response)
                val token = jsonResponse.getString("token")

                runOnUiThread {
                    // Save the token to preferences
                    saveTokenToPreferences(token)

                    // Handle the successful login response here
                    navigateToMainActivity(token)
                }
            } else {
                runOnUiThread {
                    showToast("Login failed")
                }
            }

        } catch (e: Exception) {
            e.printStackTrace()
            runOnUiThread {
                showToast("An error occurred")
            }
        }
    }

    private fun navigateToMainActivity(token: String) {
        // Check if the stored token matches the received token
        val storedToken = getTokenFromPreferences()

        if (storedToken.isNotBlank() && storedToken == token) {
            val intent = Intent(this, MainActivity::class.java)

            // Pass the token to MainActivity
            intent.putExtra("token", token)

            startActivity(intent)
            finish()
        } else {
            // Invalid token or no token exists, show error message
            showToast("Invalid token or no token exists. Please log in again.")
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun saveTokenToPreferences(token: String) {
        val preferences = getPreferences(Context.MODE_PRIVATE)
        preferences.edit().putString("token", token).apply()
    }

    private fun getTokenFromPreferences(): String {
        val preferences = getPreferences(Context.MODE_PRIVATE)
        return preferences.getString("token", "") ?: ""
    }
}
