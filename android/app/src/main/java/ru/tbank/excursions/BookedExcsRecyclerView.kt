package ru.tbank.excursions

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

class BookedExcsAdapter(private val dataSet: Array<String>) :
    RecyclerView.Adapter<BookedExcsAdapter.ViewHolder>() {


    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
//        val textView: TextView
//
//        init {
//            textView = view.findViewById(R.id.text)
//        }
    }


    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.item_excursion_card, viewGroup, false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
//        viewHolder.textView.text = dataSet[position]
    }

    override fun getItemCount() = dataSet.size

}