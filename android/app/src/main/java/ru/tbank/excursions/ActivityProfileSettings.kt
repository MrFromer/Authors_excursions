package ru.tbank.excursions

import android.os.Bundle
import android.view.View
import android.widget.FrameLayout
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.bottomsheet.BottomSheetDialog


class ActivityProfileSettings : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_profile_settings)

        val changeNameButton = findViewById<FrameLayout>(R.id.fr)
        val changePasswordButton = findViewById<FrameLayout>(R.id.change_password)

        changeNameButton.setOnClickListener {
            val view: View = layoutInflater.inflate(R.layout.item_excursion_card, null)
            val dialog = BottomSheetDialog(this)
            dialog.setContentView(view)
            dialog.show()
        }

        changePasswordButton.setOnClickListener {
            val view: View = layoutInflater.inflate(R.layout.item_excursion_card, null)
            val dialog = BottomSheetDialog(this)
            dialog.setContentView(view)
            dialog.show()
        }
    }
}