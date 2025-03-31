<?php

use Illuminate\Support\Facades\Route;

// Ruta de inicio
Route::get('/', function () {
    return view('index');
})->name('index');

// Ruta de login
Route::get('/login', function () {
    return view('login');
})->name('login');

// Ruta de registro
Route::get('/registro', function () {
    return view('registro');
})->name('registro');

// Ruta de suscripciones
Route::get('/suscripciones', function () {
    return view('suscripciones');
})->name('suscripciones');

// Ruta de supervisor
Route::get('/supervisor', function () {
    return view('supervisor');
})->name('supervisor');

// Redirecciones entre páginas según el flujo de navegación
Route::get('/index-to-login', function () {
    return redirect()->route('login');
});

Route::get('/login-to-registro', function () {
    return redirect()->route('registro');
});

Route::get('/registro-to-login', function () {
    return redirect()->route('login');
});

Route::get('/login-to-suscripciones', function () {
    return redirect()->route('suscripciones');
});

Route::get('/suscripciones-to-supervisor', function () {
    return redirect()->route('supervisor');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
