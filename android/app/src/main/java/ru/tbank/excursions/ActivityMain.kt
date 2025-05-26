package ru.tbank.excursions

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout


class ActivityMain : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.fragment_main)


        val dataset = listOf(DataCardExcursion(
            image_id = R.drawable.moscow,
            name = "Обзорная вечерняя экскурсия по Москве",
            desc = "На автобусе по must-see местам столицы",
            location = "Москва",
            price = "1300 ₽ за одного",
            people_amount = "Количество человек: 1-5"
        ),
            DataCardExcursion(
                image_id = R.drawable.peter,
                name = "Весь Петербург с посещением Петропавловской крепости — за 4 часа",
                desc = "Проследить ключевые вехи города и понять его историю: групповая экскурсия на микроавтобусе",
                location = "Санкт-Петербург",
                price = "1790 ₽ за одного",
                people_amount = "Количество человек: 1-5"
            ))

        val customAdapter = CardAdapter(dataset)

        val recyclerView: RecyclerView = findViewById(R.id.recycler_view)
        val filterButton = findViewById<ImageButton>(R.id.button_filter)
        val profileButton = findViewById<ImageButton>(R.id.button_pa)

        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = customAdapter

        val startFilterForResult =
            registerForActivityResult(ActivityResultContracts.StartActivityForResult())
            { result: ActivityResult ->
                if (result.resultCode == Activity.RESULT_OK) {
                    val intents = result.data
                }
            }

        filterButton.setOnClickListener {
            val intent = Intent(this, ActivityFilter::class.java)
            startFilterForResult.launch(intent)
        }

        profileButton.setOnClickListener {

            if (Temporary.loggedIn)
            {
                val intent = Intent(this, ActivityProfile::class.java)
                startActivity(intent)
            }
            else
            {
                val intent = Intent(this, ActivityAccount::class.java)
                startActivity(intent)
            }
        }



        //setUpTabBar()

    }

    /*private fun setUpTabBar()
    {
        val tabLayout = findViewById<TabLayout>(R.id.tabLayout)
        val adapter = AdapterFragment(this,tabLayout.tabCount)
        val viewPager = findViewById<ViewPager2>(R.id.viewPager)
        viewPager.adapter = adapter

        viewPager.registerOnPageChangeCallback(object: ViewPager2.OnPageChangeCallback()
        {
            override fun onPageSelected(position: Int) {
                tabLayout.selectTab(tabLayout.getTabAt(position))
            }
        })

        tabLayout.addOnTabSelectedListener(object: TabLayout.OnTabSelectedListener
        {
            override fun onTabReselected(tab: TabLayout.Tab) {
            }

            override fun onTabSelected(tab: TabLayout.Tab) {
                viewPager.currentItem = tab.position
            }

            override fun onTabUnselected(tab: TabLayout.Tab) {
            }
        })
    }*/
}


