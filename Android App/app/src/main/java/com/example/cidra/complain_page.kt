package com.example.cidra

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.io.BufferedOutputStream
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

class complain_page : AppCompatActivity() {

    private lateinit var complainEditText: EditText
    private lateinit var submitButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_complain_page)

        complainEditText = findViewById(R.id.complain)
        submitButton = findViewById(R.id.submitbtn)

        val token = intent.getStringExtra("token")

        submitButton.setOnClickListener {
            val complainContent = complainEditText.text.toString()

            if (complainContent.isNotBlank()) {
                GlobalScope.launch(Dispatchers.IO) {
                    submitComplaint(complainContent, token!!)
                }
            } else {
                showToast("Please enter your complaint")
            }
        }
    }

    private suspend fun submitComplaint(complainContent: String, userToken: String) {
        try {
            Log.d("SubmitComplaint", "Starting to submit complaint")

            val token = userToken // Replace with the actual token obtained after login
            val url = URL("https://cidra-backend.onrender.com/complaint/submit-complaint")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.setRequestProperty("Authorization", "$token")
            connection.doOutput = true

            val jsonInputString = JSONObject().apply {
                put("content", complainContent)
            }.toString()

            val outputStream = BufferedOutputStream(connection.outputStream)
            outputStream.write(jsonInputString.toByteArray())
            outputStream.flush()

            val responseCode = connection.responseCode
            Log.d("SubmitComplaint", "Response Code: $responseCode")
            val response = HttpURLConnection.HTTP_CREATED
            Log.d("generatedcode", "Response Code: $response")

            if (responseCode == HttpURLConnection.HTTP_CREATED) {
                withContext(Dispatchers.Main) {
                    showToast("Complaint submitted successfully")
                    finish() // Close the activity after successful submission
                }
            } else {
                val reader = BufferedReader(InputStreamReader(connection.errorStream))
                val errorMsg = reader.readText()
                Log.e("SubmitComplaint", "Failed to submit complaint. Error: $errorMsg")

                withContext(Dispatchers.Main) {
                    showToast("Failed to submit complaint. Error: $errorMsg")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("SubmitComplaint", "An error occurred", e)

            withContext(Dispatchers.Main) {
                showToast("An error occurred")
            }
        }
    }

    private fun showToast(message: String) {
        // Implement your showToast method or use Toast.makeText as needed
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
