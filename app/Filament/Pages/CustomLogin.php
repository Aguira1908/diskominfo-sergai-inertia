<?php

namespace App\Filament\Pages;

use Filament\Forms\Form;
use Filament\Pages\Auth\Login;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\TextInput;

class CustomLogin extends Login
{
    protected static string $view = 'filament.pages.custom-login';
    protected static string $layout = 'layouts.simple';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('email')
                    ->label('Email Address')
                    ->email()
                    ->required()
                    ->autocomplete('email')
                    ->autofocus()
                    ->extraInputAttributes(['tabindex' => 1])
                    ->live(),

                TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->required()
                    ->autocomplete('current-password')
                    ->extraInputAttributes(['tabindex' => 2])
                    ->live(),

                // Tambahkan remember me checkbox
                Checkbox::make('remember')
                    ->label('Ingat saya')
                    ->default(true)
            ]);
    }

    public function getHeading(): string
    {
        return 'Sign in to your account';
    }
}