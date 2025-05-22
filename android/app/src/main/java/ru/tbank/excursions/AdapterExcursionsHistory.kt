package ru.tbank.excursions

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import ru.tbank.excursions.databinding.ItemBookedExcursionBinding


class ExcursionsHistoryAdapter:
    RecyclerView.Adapter<ExcursionsHistoryAdapter.ViewHolder>() {

    var data: List<BookedExcursionHistoryUnit> = emptyList()

    class ViewHolder(val binding: ItemBookedExcursionBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val binding = ItemBookedExcursionBinding.inflate(inflater,parent,false)

        return ViewHolder(binding)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val excursion = data[position]

        //val context = viewHolder.itemView.context

        with(viewHolder.binding){

            excursionName.text = excursion.excursionName
            excursionDate.text = excursion.excursionDate.toString()
        }
    }

    override fun getItemCount() = data.size

}