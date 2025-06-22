<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ 'Login' }} - {{ config('app.name') }}</title>
        @livewireStyles

        {{-- <style>
            [x-cloak] { display: none !important; }
        </style> --}}

        <!-- Load Filament styles -->
        {{-- @filamentStyles --}}
        
        <!-- Load custom CSS -->
        @vite('resources/css/app.css')
    </head>

    <body class="flex  min-h-screen ">
        <div class="w-full grid-cols-1 grid md:grid-cols-[40%_1fr]">
            <div class="bg-gray-950 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-20 xl:px-25 w-full text-white ">
                <!-- Custom Header -->
                <div class="mb-8 text-center ">
                    <h1 class="text-3xl font-bold ">
                        {{-- {{ config('app.name') }} --}}
                        Diskominfo Serdang Bedagai
                    </h1>
                    <h2 class="mt-2 text-xl font-semibold ">
                        {{-- {{ $heading ?? 'Welcome' }} --}}
                        Masuk Ke Akun Anda
                    </h2>
                </div>
    
                <!-- Page Content -->
                <div class="w-full">
                    {{ $slot }}
                </div> 
                
            </div>
    
            <div class="hidden md:block relative w-full h-full">
                <!-- Gambar latar belakang -->
                <img src="/images/diskominfo-sergai.webp" class="w-full h-full object-cover object-center absolute inset-0 z-0" alt="">
            
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 z-10 " style="background: radial-gradient(100% 820.78% at 0% 0%, rgba(0, 60, 150, 0.675) 0%, rgba(4, 36, 84, 0.5625) 61.62%);"></div>
            </div>
            
        </div>
        <!-- Load Filament scripts -->
        {{-- @livewireScripts --}}
        @filamentScripts

    </body>
</html>