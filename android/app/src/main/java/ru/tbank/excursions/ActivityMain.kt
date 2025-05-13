package ru.tbank.excursions

import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout


class ActivityMain : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activty_main)

        setUpTabBar()

    }

    private fun setUpTabBar()
    {
        val tabLayout = findViewById<TabLayout>(R.id.tabLayout)
        val adapter = FragmentAdapter(this,tabLayout.tabCount)
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
    }
}


