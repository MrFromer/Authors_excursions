package ru.tbank.excursions

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class ActivityCreateExcursion : AppCompatActivity() {

    private lateinit var adapter: ImagesAdapter
    private var currentImagesCount = 0

    private val pickImagesLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult())
        { result: ActivityResult ->
            if (result.resultCode == Activity.RESULT_OK) {
                try {
                    val imageData = result.data

                    handleSelectedImages(imageData)

                } catch(e: Exception ) {
                    Toast.makeText(this, "Не выбраны изображения", Toast.LENGTH_SHORT).show()
                }
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_create_excursion)

        val addImagesButton = findViewById<Button>(R.id.addImages)

        val recyclerViewImages: RecyclerView = findViewById(R.id.recycler_view)
        recyclerViewImages.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        adapter = ImagesAdapter()
        recyclerViewImages.adapter = adapter

        addImagesButton.setOnClickListener{
            if (currentImagesCount!=10)
            {
                pickMultipleImages()
            }
            else
            {
                Toast.makeText(this, "Превышен лимит изображений", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun pickMultipleImages()
    {
        val intent = Intent(Intent.ACTION_PICK).apply {
            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
            data = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        }

        pickImagesLauncher.launch(intent)
    }

    private fun handleSelectedImages(imageData: Intent?){
        val clipData = imageData?.clipData
        val selectedUris = mutableListOf<Uri>()

        val imageLeft: Int = 10 - currentImagesCount

        if (clipData != null) {
            for (i in 0 until clipData.itemCount) {

                currentImagesCount +=1

                if (currentImagesCount >= 10) {
                    Toast.makeText(this, "Добавлено $imageLeft из ${clipData.itemCount} изображений (достигнут лимит)", Toast.LENGTH_LONG).show()
                    break
                }

                val uri = clipData.getItemAt(i).uri
                selectedUris.add(uri)
            }
        }
        else {
            imageData?.data?.let { uri ->
                selectedUris.add(uri)
            }
        }

        adapter.addImages(selectedUris)
    }
}