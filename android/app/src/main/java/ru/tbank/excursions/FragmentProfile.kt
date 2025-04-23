package ru.tbank.excursions

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts

class FragmentProfile : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_profile, container, false)

        val authButton = view.findViewById<Button>(R.id.mainAuthButton)
        val regButton = view.findViewById<Button>(R.id.mainRegButton)

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
            val intent = Intent(activity, ActivitySignIn::class.java)
            startSignInForResult.launch(intent)
        }

        regButton.setOnClickListener {
            val intent = Intent(activity, ActivitySignUp::class.java)
            startSignUpForResult.launch(intent)
        }

        return view
    }
}