package com.example.cidra

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.cidra.R
import com.example.cidra.Assignment

class AssignmentAdapter(private val assignments: List<AssignmentData>) :
    RecyclerView.Adapter<AssignmentAdapter.ViewHolder>() {

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val authorTextView: TextView = itemView.findViewById(R.id.authorname)
        val contentTextView: TextView = itemView.findViewById(R.id.Assignmentcontent)
        val linkTextView: TextView = itemView.findViewById(R.id.AssignmentLink)
        val dateTextView: TextView = itemView.findViewById(R.id.AssignmentDate)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.each_assignment, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val assignment = assignments[position]

        holder.authorTextView.text = assignment.author
        holder.contentTextView.text = assignment.content
        holder.linkTextView.text = assignment.googleform  // Make sure to have a 'link' property in your Assignment data class
        holder.dateTextView.text = assignment.date
    }

    override fun getItemCount(): Int {
        return assignments.size
    }


}
