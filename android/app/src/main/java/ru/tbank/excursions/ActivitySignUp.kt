package ru.tbank.excursions

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.activity.addCallback
import ru.tbank.excursions.InputValidation.PASSWORD_PATTERN

class ActivitySignUp : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_signup)

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

        val usernameInputLayout = findViewById<com.google.android.material.textfield.TextInputLayout>(R.id.usernameInputLayout)
        val usernameEditText =  findViewById<EditText>(R.id.usernameEditText)

        val usernameTextWatcher = object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                if (!s.toString().trim().matches("^[A-Za-zА-Яа-яёЁ-]+\$".toRegex()) || s.length <= 1) {
                    usernameInputLayout.isErrorEnabled = true
                    usernameInputLayout.error = "Введите корректное имя пользователя"
                }
                else
                {
                    usernameInputLayout.isErrorEnabled = false
                    usernameInputLayout.error = ""
                }
            }
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
        }

        usernameEditText.addTextChangedListener(usernameTextWatcher)


        onBackPressedDispatcher.addCallback(this) {
            setResult(RESULT_CANCELED)
            finish()
        }
    }
}