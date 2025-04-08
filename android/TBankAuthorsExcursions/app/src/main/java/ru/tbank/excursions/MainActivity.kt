package ru.tbank.excursions

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        val authButton = findViewById<Button>(R.id.mainAuthButton)
        val regButton = findViewById<Button>(R.id.mainRegButton)

        val startAuthForResult = registerForActivityResult(ActivityResultContracts.StartActivityForResult())
        { result: ActivityResult ->
            if (result.resultCode == Activity.RESULT_OK) {
                val intent = result.data
            }
        }

        val startRegForResult = registerForActivityResult(ActivityResultContracts.StartActivityForResult())
        { result: ActivityResult ->
            if (result.resultCode == Activity.RESULT_OK) {
                val intents = result.data
            }
        }

        authButton.setOnClickListener {
            val intent = Intent(this, AuthActivity::class.java)
            startAuthForResult.launch(intent)
        }

        regButton.setOnClickListener {
            val intent = Intent(this, RegActivity::class.java)
            startRegForResult.launch(intent)
        }
    }
}