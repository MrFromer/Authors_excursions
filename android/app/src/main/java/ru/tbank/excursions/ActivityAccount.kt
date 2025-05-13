package ru.tbank.excursions

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class ActivityAccount : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_account)

        val authButton = findViewById<Button>(R.id.mainAuthButton)
        val regButton = findViewById<Button>(R.id.mainRegButton)

        val startSignInForResult = registerForActivityResult(ActivityResultContracts.StartActivityForResult())
        { result: ActivityResult ->
            if (result.resultCode == Activity.RESULT_OK) {
                val intent = result.data
            }
        }

        val startSignUpForResult = registerForActivityResult(ActivityResultContracts.StartActivityForResult())
        { result: ActivityResult ->
            if (result.resultCode == Activity.RESULT_OK) {
                val intents = result.data
            }
        }

        authButton.setOnClickListener {
            val intent = Intent(this, ActivitySignIn::class.java)
            startSignInForResult.launch(intent)
        }

        regButton.setOnClickListener {
            val intent = Intent(this, ActivitySignUp::class.java)
            startSignUpForResult.launch(intent)
        }
    }
}