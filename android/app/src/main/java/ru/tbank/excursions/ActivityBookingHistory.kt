package ru.tbank.excursions

import android.os.Build
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import java.time.LocalDate

class ActivityBookingHistory : AppCompatActivity() {
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_booking_history)

        val recyclerViewCities: RecyclerView = findViewById(R.id.recycler_view)
        recyclerViewCities.layoutManager = LinearLayoutManager(this)

        val adapterExcursions = ExcursionsHistoryAdapter()

        adapterExcursions.data = listOf(BookedExcursionHistoryUnit(
            excursionName = "Обзорная экскурсия по Москве",
            excursionDate = "15.05.2024"
        ),
            BookedExcursionHistoryUnit(
                excursionName = "Тур по историческому центру Санкт-Петербурга",
                excursionDate = "20.05.2024"
            ),
            BookedExcursionHistoryUnit(
                excursionName = "Экскурсия в Эрмитаж",
                excursionDate = "25.05.2024"
            ),
            BookedExcursionHistoryUnit(
                excursionName = "Прогулка по Красной площади",
                excursionDate = "30.05.2024"
            ),
            BookedExcursionHistoryUnit(
                excursionName = "Посещение Московского Кремля",
                excursionDate = "05.06.2024"
            ))

        recyclerViewCities.adapter = adapterExcursions
    }
}