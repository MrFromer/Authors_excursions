package ru.tbank.excursions

import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiInterface {

    @POST("/api/login")
    fun getToken(@Body request: DataSignIn) : Call<ResponseSignIn>

    companion object {

        private var BASE_URL = "https://reqres.in"

        fun create() : ApiInterface {

            val retrofit = Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BASE_URL)
                .build()
            return retrofit.create(ApiInterface::class.java)

        }
    }
}