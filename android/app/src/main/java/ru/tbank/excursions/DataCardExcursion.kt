package ru.tbank.excursions

import android.health.connect.datatypes.ExerciseRoute.Location
import android.net.Uri

data class DataCardExcursion(val name: String,
                             val image_id: Int,
                             val desc: String,
                             val location: String,
                             val people_amount: String,
                             val price: String
)
