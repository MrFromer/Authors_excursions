package ru.tbank.excursions

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import androidx.activity.addCallback
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

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

        val apiInterface = ApiInterface.create()
        val buttonSignIn = findViewById<Button>(R.id.buttonSignIn)

        buttonSignIn.setOnClickListener{

            //Времено так, потом надо убрать
            if (!Temporary.loggedIn)
            {
                Temporary.loggedIn = true
                intent = Intent(this,ActivityProfile::class.java)
                startActivity(intent)
            }

            Hashing.getHash("Hello".toByteArray(),"SHA-256")

            if (emailEditText.text.isEmpty())
            {
                emailInputLayout.isErrorEnabled = true
                emailInputLayout.error = resources.getString(R.string.enter_email_error)
            }

            if (passwordEditText.text.isEmpty())
            {
                passwordInputLayout.isErrorEnabled = true
                passwordInputLayout.error = resources.getString(R.string.enter_password_error)
            }

            if (!emailInputLayout.isErrorEnabled && !passwordInputLayout.isErrorEnabled
                && emailEditText.text.isNotEmpty() && passwordEditText.text.isNotEmpty()) {

                Log.d("TEST","Sending to a server")

                val hashedPassword = Hashing.getHash(passwordEditText.text.toString().toByteArray(), "SHA-256")

                Log.d("TEST","Hashed password:  $hashedPassword")

                val data = DataSignIn(emailEditText.text.toString(), hashedPassword)
                val querySignIn = apiInterface.getToken(data)

                querySignIn.enqueue( object : Callback<ResponseSignIn> {
                    override fun onResponse(
                        call: Call<ResponseSignIn>,
                        response: Response<ResponseSignIn>
                    ) {

                        Log.d("API", "Code: ${response.code()}")

                        when (response.code())
                        {
                            200 -> {

                                val token = response.body()?.authToken.toString()
//
//                                val tokenManager = TokenManager(applicationContext)
//
//                                lifecycleScope.launch {
//                                    tokenManager.saveToken(token)
//                                }
//
//                                val token2 = runBlocking { tokenManager.getToken() }

                                Log.d("LOGIN", "Login successful. Token: $token")
                            }

                            400 -> {
                                passwordEditText.text = null
                                emailEditText.text = null

                                emailInputLayout.error = resources.getString(R.string.invalid_email_or_password_text)
                                passwordInputLayout.error = resources.getString(R.string.invalid_email_or_password_text)

                                Log.d("LOGIN", "Invalid password or email")
                            }

                            else -> {
                                Log.d("LOGIN", "Unknown error")
                            }
                        }
                    }

                    override fun onFailure(call: Call<ResponseSignIn>, t: Throwable) {

                        passwordEditText.text = null
                        emailEditText.text = null

                        emailInputLayout.error = resources.getString(R.string.login_error)
                        passwordInputLayout.error = resources.getString(R.string.login_error)

                        Log.d("LOGIN", "ERROR ${t.message}")
                    }
                })
            }
        }

        onBackPressedDispatcher.addCallback(this) {
            setResult(RESULT_CANCELED)
            finish()
        }
    }
}