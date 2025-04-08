package ru.tbank.excursions

import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import com.google.android.material.textfield.TextInputLayout

object InputValidation {
    var EMAIL_PATTERN = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]{2,}".toRegex()
    var PASSWORD_PATTERN = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!#\$%&*])[A-Za-z0-9!#\$%&*]{8,}$".toRegex()

    fun createEmailTextWatcher(inputLayout: TextInputLayout, errorMessage: String) : TextWatcher
    {
        val textWatcher = object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                if (s.toString().trim().matches(EMAIL_PATTERN) && s.isNotEmpty()) {
                    inputLayout.helperText = ""
                } else {
                    inputLayout.helperText = errorMessage
                }
            }
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
        }

        return textWatcher
    }

    fun createPasswordTextWatcher(inputLayout: TextInputLayout, lengthError: String, charactersError: String): TextWatcher {
        val textWatcher = object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                if (s.length<8 && s.isNotEmpty())
                {
                    inputLayout.helperText = lengthError
                }
                else if (!s.toString().trim().matches(PASSWORD_PATTERN) && s.isNotEmpty()) {
                    inputLayout.helperText = charactersError
                } else {
                    /*passwordInputLayout.isErrorEnabled = false
                    passwordInputLayout.error = null*/
                    inputLayout.helperText = ""
                }
            }
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
        }

        return textWatcher
    }
}