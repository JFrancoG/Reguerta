package com.reguerta.user

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation3.runtime.NavKey
import androidx.navigation3.runtime.rememberNavBackStack
import androidx.navigation3.ui.NavDisplay
import androidx.navigation3.ui.entryProvider
import com.reguerta.user.ui.theme.ReguertaTheme
import kotlinx.serialization.Serializable

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ReguertaTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    ReguertaApp(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Serializable
data object Home : NavKey

@Serializable
data class Detail(val itemId: String) : NavKey

@Serializable
data object Settings : NavKey

@Composable
fun ReguertaApp(modifier: Modifier = Modifier) {
    val backStack = rememberNavBackStack(Home)
    val handleBack = {
        if (backStack.size > 1) {
            backStack.removeLast()
        }
    }

    NavDisplay(
        backStack = backStack,
        onBack = handleBack,
        entryProvider = entryProvider {
            entry<Home> {
                HomeScreen(
                    onOpenDetail = { backStack.add(Detail(itemId = "42")) },
                    onOpenSettings = { backStack.add(Settings) },
                    modifier = modifier
                )
            }
            entry<Detail> { key ->
                DetailScreen(
                    itemId = key.itemId,
                    onBack = handleBack,
                    onOpenSettings = { backStack.add(Settings) },
                    modifier = modifier
                )
            }
            entry<Settings> {
                SettingsScreen(
                    onBack = handleBack,
                    modifier = modifier
                )
            }
        }
    )
}

@Composable
fun HomeScreen(
    onOpenDetail: () -> Unit,
    onOpenSettings: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(text = "Home")
        Button(onClick = onOpenDetail) {
            Text(text = "Ir a detalle")
        }
        Button(onClick = onOpenSettings) {
            Text(text = "Ir a ajustes")
        }
    }
}

@Composable
fun DetailScreen(
    itemId: String,
    onBack: () -> Unit,
    onOpenSettings: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(text = "Detalle del item #$itemId")
        Button(onClick = onOpenSettings) {
            Text(text = "Ir a ajustes")
        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = onBack) {
            Text(text = "Volver")
        }
    }
}

@Composable
fun SettingsScreen(
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(text = "Ajustes")
        Button(onClick = onBack) {
            Text(text = "Volver")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    ReguertaTheme {
        ReguertaApp()
    }
}
