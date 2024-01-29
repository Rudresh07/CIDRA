package com.example.cidra

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.cidra.databinding.ActivityAssignmentBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

class Assignment : AppCompatActivity() {
    private var binding: ActivityAssignmentBinding? = null
    private lateinit var assignmentAdapter: AssignmentAdapter
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAssignmentBinding.inflate(layoutInflater)
        val view = binding?.root
        setContentView(view)

        progressBar = findViewById(R.id.progressBar)
        assignmentAdapter = AssignmentAdapter(emptyList())

        binding?.assignmentRecyclerView?.apply {
            layoutManager = LinearLayoutManager(this@Assignment)
            adapter = assignmentAdapter
        }

        showLoading()
        fetchAssignments()
    }

    private fun fetchAssignments() {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                Log.d("Assignment4", "Before making network request")
                val url = URL("https://cidra-backend.onrender.com/assignment/assignments")
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "GET"

                Log.d("Assignment4a", "After making network request")

                val responseCode = connection.responseCode
                val backend = HttpURLConnection.HTTP_OK

                Log.d("responseCode", "$responseCode")
                Log.d("responseCodebackend", "$backend")
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    val reader = BufferedReader(InputStreamReader(connection.inputStream))
                    val response = reader.readText()


                    Log.d("responseCode", "$responseCode")

                    val responseObject = JSONObject(response)
                    val jsonArray = responseObject.getJSONArray("assignments")
                    val assignments = mutableListOf<AssignmentData>()

                    for (i in 0 until jsonArray.length()) {
                        val assignmentObject: JSONObject = jsonArray.getJSONObject(i)
                        val content = assignmentObject.getString("content")
                        val date = assignmentObject.getString("dueDate")
                        val author = assignmentObject.getString("author")
                        val link = assignmentObject.getString("googleFormLink")

                        Log.d("AuthorName", "$author")

                        // Parse the date string
                        val formatter = DateTimeFormatter.ISO_INSTANT
                        val instant = Instant.from(formatter.parse(date))
                        val localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault())

                        // Extract date and time
                        val datestring = localDateTime.toLocalDate().toString()
                        val time = localDateTime.toLocalTime().toString()


                        val assignmentData = AssignmentData(content, datestring, author, link)
                        assignments.add(assignmentData)
                    }

                    withContext(Dispatchers.Main) {
                        assignmentAdapter = AssignmentAdapter(assignments)
                        binding?.assignmentRecyclerView?.adapter = assignmentAdapter
                    }
                    withContext(Dispatchers.Main) {
                        assignmentAdapter = AssignmentAdapter(assignments)
                        binding?.assignmentRecyclerView?.adapter = assignmentAdapter
                        hideLoading() // Hide loading views after data is loaded
                    }


                }
                else {
                    // Handle HTTP error
                    Log.d("Author","there is an error")
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }


    private fun showLoading() {
        progressBar.visibility = View.VISIBLE
    }

    private fun hideLoading() {
        progressBar.visibility = View.GONE
    }
}
