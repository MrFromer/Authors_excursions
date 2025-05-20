package ru.tbank.excursions

import com.google.gson.annotations.SerializedName

data class DataSignIn (
    val email : String,
    val password : String
)

data class ResponseSignIn(
    @SerializedName("token") val authToken: String
)
