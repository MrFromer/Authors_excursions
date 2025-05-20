package ru.tbank.excursions

import android.net.Uri
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import ru.tbank.excursions.databinding.ItemImageBinding

class ImagesAdapter:
    RecyclerView.Adapter<ImagesAdapter.ViewHolder>() {

    var data: List<Uri> = emptyList()

    class ViewHolder(val binding: ItemImageBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val binding = ItemImageBinding.inflate(inflater,parent,false)

        return ViewHolder(binding)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {

        with(viewHolder.binding){
            imageView.setImageURI(data[position])
        }
    }

    override fun getItemCount() = data.size

    fun addImage(uri: Uri) {
        data = data + uri
        notifyItemInserted(data.size - 1)
    }

    fun addImages(uris: List<Uri>) {
        val startPosition = data.size
        data = data + uris
        notifyItemRangeInserted(startPosition, uris.size)
    }

    fun removeImage(position: Int) {
        if (position in data.indices) {
            data = data.toMutableList().apply { removeAt(position) }
            notifyItemRemoved(position)
        }
    }

    fun clearImages() {
        val itemCount = data.size
        data = emptyList()
        notifyItemRangeRemoved(0, itemCount)
    }
}