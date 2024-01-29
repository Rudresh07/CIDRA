package com.example.cidra

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.cidra.R

class NoticeAdapter(private val notices: List<Notice>) :
    RecyclerView.Adapter<NoticeAdapter.NoticeViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NoticeViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.each_notice_view, parent, false)
        return NoticeViewHolder(view)
    }

    override fun onBindViewHolder(holder: NoticeViewHolder, position: Int) {
        val notice = notices[position]
        holder.bind(notice)
    }

    override fun getItemCount(): Int = notices.size

    inner class NoticeViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val noticeText: TextView = itemView.findViewById(R.id.noticeText)
        private val noticeDate: TextView = itemView.findViewById(R.id.NoticeDate)
        private val noticetime:TextView = itemView.findViewById(R.id.NoticeTime)

        fun bind(notice: Notice) {
            noticeText.text = notice.content
            noticeDate.text = notice.date
            noticetime.text = notice.time
        }
    }
}