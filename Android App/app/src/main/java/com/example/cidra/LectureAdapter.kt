package com.example.cidra

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.cidra.R

class LectureAdapter(val lectures: List<lectures>) :
    RecyclerView.Adapter<LectureAdapter.ViewHolder>() {

    private var mylistener: onItemClickListener? = null

    interface onItemClickListener {
        fun onItemClicking(position: Int)
    }

    fun setOnItemClickListener(listener: onItemClickListener) {
        mylistener = listener
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val contentTextView: TextView = itemView.findViewById(R.id.Lecturecontent)
        val linkTextView: TextView = itemView.findViewById(R.id.LectureLink)
        val teacherName: TextView = itemView.findViewById(R.id.teachername)
        val LectureDate: TextView = itemView.findViewById(R.id.LectureDate)

        init {
            itemView.setOnClickListener {
                mylistener?.onItemClicking(adapterPosition)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.each_lecture_row, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val lecture = lectures[position]
        holder.contentTextView.text = lecture.content
        holder.linkTextView.text = lecture.link
        holder.teacherName.text = lecture.author
        holder.LectureDate.text = lecture.date

        // Set the click listener here
        holder.itemView.setOnClickListener {
            mylistener?.onItemClicking(position)
        }
    }

    override fun getItemCount(): Int {
        return lectures.size
    }
}
