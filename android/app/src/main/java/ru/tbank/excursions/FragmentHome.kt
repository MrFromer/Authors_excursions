package ru.tbank.excursions

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class FragmentHome : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_main, container, false)

        val dataset = arrayOf("Dagestan")
        val customAdapter = CustomAdapter(dataset)

        val recyclerView: RecyclerView = view.findViewById(R.id.recycler_view)
        val filterButton = view.findViewById<ImageButton>(R.id.button_filter)
        val profileButton = view.findViewById<ImageButton>(R.id.button_pa)

        recyclerView.layoutManager = LinearLayoutManager(activity)
        recyclerView.adapter = customAdapter

        val startFilterForResult =
            registerForActivityResult(ActivityResultContracts.StartActivityForResult())
            { result: ActivityResult ->
                if (result.resultCode == Activity.RESULT_OK) {
                    val intents = result.data
                }
            }

        filterButton.setOnClickListener {
            val intent = Intent(activity, ActivityFilter::class.java)
            startFilterForResult.launch(intent)
        }

        profileButton.setOnClickListener {
            val intent = Intent(activity, ActivityProfile::class.java)
            startActivity(intent)
        }

        return view
    }
}