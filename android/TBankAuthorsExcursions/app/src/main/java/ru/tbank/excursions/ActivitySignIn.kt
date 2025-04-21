package ru.tbank.excursions

import android.os.Bundle
import android.widget.EditText
import androidx.activity.addCallback
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity

class ActivitySignIn : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_signin)

        val emailInputLayout = findViewById<com.google.android.material.textfield.TextInputLayout>(R.id.emailInputLayout)
        val emailEditText = findViewById<EditText>(R.id.emailEditText)
        val emailTextWatcher = InputValidation.createEmailTextWatcher(
            emailInputLayout,
            resources.getString(R.string.email_error)
        )
        emailEditText.addTextChangedListener(emailTextWatcher)

        val passwordInputLayout = findViewById<com.google.android.material.textfield.TextInputLayout>(R.id.passwordInputLayout)
        val passwordEditText =  findViewById<EditText>(R.id.passwordEditText)
        val passwordTextWatcher = InputValidation.createPasswordTextWatcher(
            passwordInputLayout,
            resources.getString(R.string.password_minimum_length_error),
            resources.getString(R.string.password_characters_error)
        )
        passwordEditText.addTextChangedListener(passwordTextWatcher)

        onBackPressedDispatcher.addCallback(this) {
            setResult(RESULT_CANCELED)
            finish()
        }
    }
}