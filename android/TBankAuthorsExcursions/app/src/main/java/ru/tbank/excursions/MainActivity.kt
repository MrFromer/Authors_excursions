package ru.tbank.excursions

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.fragment_login)

        val emailInputLayout = findViewById<com.google.android.material.textfield.TextInputLayout>(R.id.emailInputLayout)
        val emailEditText = findViewById<EditText>(R.id.emailEditText)
        val emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]{2,}".toRegex()

        emailEditText.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {

                if (s.toString().trim().matches(emailPattern) && s.isNotEmpty()) {
                    /*emailInputLayout.isErrorEnabled = false
                    emailInputLayout.error = null*/
                    emailInputLayout.helperText = ""
                } else {
                    emailInputLayout.helperText = resources.getString(R.string.email_error)
                }
            }

            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
            }
        })

        val passwordInputLayout = findViewById<com.google.android.material.textfield.TextInputLayout>(R.id.passwordInputLayout)
        val passwordEditText =  findViewById<EditText>(R.id.passwordEditText)
        val passwordPattern = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!#\$%&*]).{8,}$".toRegex()

        passwordEditText.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                if (s.length<8 && s.isNotEmpty())
                {
                    passwordInputLayout.helperText = resources.getString(R.string.password_minimum_length_error)
                }
                else if (!s.toString().trim().matches(passwordPattern) && s.isNotEmpty()) {
                    passwordInputLayout.helperText = resources.getString(R.string.password_symbols_error)
                } else {
                    /*passwordInputLayout.isErrorEnabled = false
                    passwordInputLayout.error = null*/
                    passwordInputLayout.helperText = ""
                }
            }

            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
            }
        })
    }
}