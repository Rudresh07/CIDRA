package com.example.cidra

import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.cidra.databinding.ActivityNoticePageBinding
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

class Notice_page : AppCompatActivity() {
    private var binding: ActivityNoticePageBinding? = null
    private lateinit var noticeAdapter: NoticeAdapter
    private lateinit var progressBar: ProgressBar

    private val handler = Handler()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityNoticePageBinding.inflate(layoutInflater)
        val view = binding?.root
        setContentView(view)

        progressBar = findViewById(R.id.progressBar) // Replace with your actual ProgressBar ID

        noticeAdapter = NoticeAdapter(emptyList())
        binding?.noticeRecyclerView?.apply {
            layoutManager = LinearLayoutManager(this@Notice_page)
            adapter = noticeAdapter
        }

        // Fetch notices
        showLoading()
        fetchNotices()

        // Schedule periodic refresh
        handler.postDelayed(refreshRunnable, REFRESH_INTERVAL)
    }

    private val refreshRunnable = object : Runnable {
        override fun run() {
            // Fetch notices periodically
            GlobalScope.launch(Dispatchers.IO) {
                try {
                    val notices = fetchNotices()
                    withContext(Dispatchers.Main) {
                        noticeAdapter = NoticeAdapter(notices)
                        binding?.noticeRecyclerView?.adapter = noticeAdapter
                        hideLoading() // Hide progress bar when data is loaded
                    }
                } catch (e: Exception) {
                    Log.e("NoticePage1", "Error fetching notices: ${e.message}", e)
                    hideLoading() // Hide progress bar in case of an error
                }
            }

            // Schedule the next refresh
            handler.postDelayed(this, REFRESH_INTERVAL)
        }
    }

    private fun fetchNotices(): List<Notice> {
        val noticesList = mutableListOf<Notice>()

        try {
            val url = URL("https://cidra-backend.onrender.com/notices/notices")
            Log.d("NoticePage4", "Before making network request")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            Log.d("NoticePage4a", "After making network request")

            val responseCode = connection.responseCode

            if (responseCode == HttpURLConnection.HTTP_OK) {
                val reader = BufferedReader(InputStreamReader(connection.inputStream))
                val response = reader.readText()

                val responseObject = JSONObject(response)
                val jsonArray = responseObject.getJSONArray("notices")

                for (i in 0 until jsonArray.length()) {
                    val noticeObject: JSONObject = jsonArray.getJSONObject(i)
                    val content = noticeObject.getString("content")
                    val author = noticeObject.getJSONObject("author").getString("name")
                    val date = noticeObject.getString("date")

                    // Parse the date string
                    val formatter = DateTimeFormatter.ISO_INSTANT
                    val instant = Instant.from(formatter.parse(date))
                    val localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault())

                    // Extract date and time
                    val datestring = localDateTime.toLocalDate().toString()
                    val time = localDateTime.toLocalTime().toString()

                    val notice = Notice(content, author, datestring, time)
                    noticesList.add(notice)
                }
            } else {
                Log.e("NoticePage2", "HTTP Error: $responseCode")
                // Print the response
                val errorStream = connection.errorStream
                val errorResponse = errorStream?.bufferedReader().use { it?.readText() }
                Log.e("NoticePage2a", "Error Response: $errorResponse")
            }
        } catch (e: Exception) {
            Log.e("NoticePage3", "Exception: ${e.message}", e)
        }

        return noticesList
    }

    private fun showLoading() {
        progressBar.visibility = View.VISIBLE
    }

    private fun hideLoading() {
        progressBar.visibility = View.GONE
    }

    companion object {
        private const val REFRESH_INTERVAL: Long = 60 * 1000 // 60 seconds
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(refreshRunnable)
    }
}
