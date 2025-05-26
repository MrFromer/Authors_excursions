package ru.tbank.excursions

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class CardAdapter(private val dataSet: List<DataCardExcursion>) :
    RecyclerView.Adapter<CardAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val image = view.findViewById<ImageView>(R.id.imageView)
        val name = view.findViewById<TextView>(R.id.name)
        val description = view.findViewById<TextView>(R.id.desc)
        val location = view.findViewById<TextView>(R.id.location)
        val people_amount = view.findViewById<TextView>(R.id.p_amount)
        val price = view.findViewById<TextView>(R.id.price)

        val frameButton: FrameLayout = view.findViewById(R.id.clickableFrame)
    }

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.item_excursion_card, viewGroup, false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        viewHolder.image.setImageResource(dataSet[position].image_id)
        viewHolder.name.text = dataSet[position].name
        viewHolder.people_amount.text = dataSet[position].people_amount
        viewHolder.location.text = dataSet[position].location
        viewHolder.price.text = dataSet[position].price
        viewHolder.description.text = dataSet[position].desc

        viewHolder.frameButton.setOnClickListener{
            val context = viewHolder.itemView.context
            val intent = Intent(context, ActivityExcursion::class.java)
            context.startActivity(intent)
        }
    }

    override fun getItemCount() = dataSet.size

}