package ru.tbank.excursions

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity

class ActivityProfile : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        if (false)
        {
            setContentView(R.layout.activity_lk_user)

            val bookedExcursionsButton = findViewById<Button>(R.id.booked_ex)
            val bookingHistoryButton = findViewById<Button>(R.id.booking_his)
            val profileSettingsButton = findViewById<Button>(R.id.profile_settings)
            val logOutButton = findViewById<Button>(R.id.logoutBt)

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

            logOutButton.setOnClickListener{
                Temporary.loggedIn = false

                startActivity(Intent(this,ActivityMain::class.java))
            }
        }
        else
        {
            setContentView(R.layout.activity_lk_guide)

            val publishedExcursionsButton = findViewById<Button>(R.id.published_excursions)
            val bookingCalendarButton = findViewById<Button>(R.id.booking_calendar)
            val profileSettingsButton = findViewById<Button>(R.id.profile_settings)
            val createExcursionButton = findViewById<Button>(R.id.create_excursion)
            val logOutButton = findViewById<Button>(R.id.logoutBt)

            publishedExcursionsButton.setOnClickListener{
                val intent = Intent(this, ActivityBookedExcursions::class.java)
                startActivity(intent)
            }

            bookingCalendarButton.setOnClickListener{
                val intent = Intent(this, ActivityBookingHistory::class.java)
                startActivity(intent)
            }

            profileSettingsButton.setOnClickListener{
                val intent = Intent(this, ActivityProfileSettings::class.java)
                startActivity(intent)
            }

            createExcursionButton.setOnClickListener{
                val intent = Intent(this, ActivityCreateExcursion::class.java)
                startActivity(intent)
            }

            logOutButton.setOnClickListener{
                Temporary.loggedIn = false

                startActivity(Intent(this,ActivityMain::class.java))
            }
        }
    }
}