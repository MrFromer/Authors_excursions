package ru.tbank.excursions

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class ActivityProfile : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        if (true)
        {
            setContentView(R.layout.activity_lk_user)

            val bookedExcursionsButton = findViewById<Button>(R.id.booked_ex)
            val bookingHistoryButton = findViewById<Button>(R.id.booking_his)
            val profileSettingsButton = findViewById<Button>(R.id.profile_settings)

            bookedExcursionsButton.setOnClickListener{
                val intent = Intent(this, ActivityBookedExcursions::class.java)
                startActivity(intent)
            }

            bookingHistoryButton.setOnClickListener{
                val intent = Intent(this, ActivityBookingHistory::class.java)
                startActivity(intent)
            }

            profileSettingsButton.setOnClickListener{
                val intent = Intent(this, ActivityProfileSettings::class.java)
                startActivity(intent)
            }
        }
        else
        {
            setContentView(R.layout.activity_lk_guide)
        }

    }
}