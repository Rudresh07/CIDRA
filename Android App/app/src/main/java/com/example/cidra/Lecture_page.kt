package com.example.cidra

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.cidra.databinding.ActivityLecturePageBinding
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
import java.util.*
class Lecture_page : AppCompatActivity() {
    private var binding: ActivityLecturePageBinding? = null
    private lateinit var lectureAdapter: LectureAdapter
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLecturePageBinding.inflate(layoutInflater)
        val view = binding?.root
        setContentView(view)

        progressBar = findViewById(R.id.progressBar)

        lectureAdapter = LectureAdapter(emptyList())


        binding?.lectrueRecyclerView?.apply {
            layoutManager = LinearLayoutManager(this@Lecture_page)
            adapter = lectureAdapter

        }
        lectureAdapter.setOnItemClickListener(object :LectureAdapter.onItemClickListener{
            override fun onItemClicking(position: Int) {
                Log.d("LectureAdapter", "Item clicked at position $position")
                val lecture = lectureAdapter.lectures[position]
                val url = lecture.link

                if (url.isNotEmpty()) {
                    Log.d("LectureAdapter", "Opening URL: $url")
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    startActivity(intent)
                    Toast.makeText(this@Lecture_page, "you clicked $url", Toast.LENGTH_SHORT).show()
                } else {
                    Log.e("LectureAdapter", "Invalid URL")
                    Toast.makeText(this@Lecture_page, "Invalid URL", Toast.LENGTH_SHORT).show()
                }
            }})
        // Fetch lectures
        fetchLectures()

        showLoading()


    }

    private fun showLoading() {
        progressBar.visibility = View.VISIBLE
    }

    private fun hideLoading() {
        progressBar.visibility = View.GONE
    }

    private fun fetchLectures() {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val url = URL("https://cidra-backend.onrender.com/lectures/lectures")
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "GET"

                val responseCode = connection.responseCode

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    val reader = BufferedReader(InputStreamReader(connection.inputStream))
                    val response = reader.readText()
                    Log.d("testing","this is running fine")

                    val responseObject = JSONObject(response)
                    val jsonArray = responseObject.getJSONArray("lectures")

                    val lecturesList = mutableListOf<lectures>()

                    for (i in 0 until jsonArray.length()) {
                        val lectureObject: JSONObject = jsonArray.getJSONObject(i)
                        val content = lectureObject.getString("content")
                        val link = lectureObject.getString("link")
                        val author = lectureObject.getString("author")
                        val date = lectureObject.getString("date")

                        Log.d("Author","$author")

                        val lecture = lectures(date,content, link, author)
                        lecturesList.add(lecture)
                    }

                    withContext(Dispatchers.Main) {
                        lectureAdapter = LectureAdapter(lecturesList)
                        binding?.lectrueRecyclerView?.adapter = lectureAdapter
                    }
                    withContext(Dispatchers.Main) {
                        lectureAdapter = LectureAdapter(lecturesList)
                        binding?.lectrueRecyclerView?.adapter = lectureAdapter
                        hideLoading() // Hide loading views after data is loaded
                    }

                } else {
                    // Handle HTTP error
                    Log.d("Author","there is an error")
                }
            } catch (e: Exception) {
                // Handle exception
            }
        }
    }


        }