package ru.tbank.excursions

import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.util.Pair
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.datepicker.CalendarConstraints
import com.google.android.material.datepicker.DateValidatorPointForward
import com.google.android.material.datepicker.MaterialDatePicker
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale


class ActivityFilter : AppCompatActivity() {

    val btnDateTimePicker: Button? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContentView(R.layout.activity_filter)

        val btnDateTimePicker = findViewById<Button>(R.id.button_choose_date_start)
        val btnApply = findViewById<Button>(R.id.button_apply)

        btnApply.setOnClickListener{
            finish()
        }

        btnDateTimePicker.setOnClickListener {
            showDateTimePicker { selectedDate ->
                btnDateTimePicker.text = selectedDate
            }
        }

//        val datasetCountries = arrayOf("Россия", "США", "Франция", "Великобритания", "Беларусь", "Казахстан")
//        val adapterCountries = ItemAdapter(datasetCountries)

        val datasetCities = arrayOf("Москва", "Санкт-Петербург", "Томск", "Новосибирск", "Барнаул", "Екатеринбург", "Нижний Новгород","Калининград", "Псков","Казань")
        val adapterCities = ItemAdapter(datasetCities)

//        val recyclerViewCountries: RecyclerView = findViewById(R.id.recyclerview_countries)
//        recyclerViewCountries.layoutManager = LinearLayoutManager(this)
//        recyclerViewCountries.adapter = adapterCountries

        val recyclerViewCities: RecyclerView = findViewById(R.id.recyclerview_cities)
        recyclerViewCities.layoutManager = LinearLayoutManager(this)
        recyclerViewCities.adapter = adapterCities
    }

    private fun showDateTimePicker(onPeriodSelected: (String) -> Unit)
    {
        val builder = MaterialDatePicker.Builder.dateRangePicker()

        builder.setTitleText("Выберите период")

        val constraintsBuilder = CalendarConstraints.Builder()
        constraintsBuilder.setValidator(DateValidatorPointForward.now())
        builder.setCalendarConstraints(constraintsBuilder.build())

        val picker = builder.build()
        picker.show(supportFragmentManager, picker.toString())

        picker.addOnPositiveButtonClickListener { selection ->
            val startDate = Calendar.getInstance().apply {
                timeInMillis = selection.first
            }

            val endDate = Calendar.getInstance().apply {
                timeInMillis = selection.second
            }

            val sdf = SimpleDateFormat("dd.MM.yyyy", Locale.getDefault())
            val period = "${sdf.format(startDate.time)} - ${sdf.format(endDate.time)}"

            onPeriodSelected(period)
        }
    }
}