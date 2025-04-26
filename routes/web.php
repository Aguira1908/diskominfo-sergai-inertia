<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Home');
});



Route::get('/profil', function () {
    return Inertia::render('Profil');
});





