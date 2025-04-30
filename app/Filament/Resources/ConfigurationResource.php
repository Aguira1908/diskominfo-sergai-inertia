<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;

use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Models\Configurations;
use Filament\Resources\Resource;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\ConfigurationResource\Pages;
use App\Filament\Resources\ConfigurationResource\RelationManagers;

class ConfigurationResource extends Resource
{
    protected static ?string $model = Configurations::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';



    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Konfigurasi')
                    ->description('Masukkan Konfigurasi Website')
                    ->schema([
                        TextInput::make('title')
                            ->required(),
                        TextInput::make('slogan')
                            ->required(),
                        Textarea::make('information')
                            ->required(),
                    ]),

                Forms\Components\Section::make('Kontak')
                    ->description('Masukkan Kontak')
                    ->schema([
                        TextInput::make('telephone')
                            ->required(),
                        TextInput::make('email')
                            ->required()
                            ->type("email")
                        ,
                    ]),
                Forms\Components\Section::make('Background')
                    ->description('Masukkan Gambar Background')
                    ->schema([
                        FileUpload::make('background')
                            ->required()
                            ->columns(1)
                            ->multiple()
                            ->directory('background')
                            ->storeFileNamesIn('original_filenames')
                            ->maxFiles(3)
                        ,
                    ]),
                Toggle::make('is_active')
                    ->default(true),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Judul'),
                TextColumn::make('slogan')
                    ->label('Slogan')
                    ->limit(30),
                TextColumn::make('information')
                    ->label('Informasi')
                    ->limit(30),
                TextColumn::make('email')
                    ->label('Email')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('telephone')
                    ->label('Telepon')
                    ->toggleable(isToggledHiddenByDefault: true),
                ImageColumn::make('background')
                    ->label('Background')
                    ->getStateUsing(
                        fn($record) => collect($record->background)
                            ->map(fn($image) => asset('storage/' . $image))
                            ->all()
                    )
                    ->circular()
                    ->stacked(),
                IconColumn::make('is_active')
                    ->label('status aktif')
                    ->boolean(),

                TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Dirubah Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->slideOver(),
                Tables\Actions\ViewAction::make()->slideOver()
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListConfigurations::route('/'),
            // 'create' => Pages\CreateConfiguration::route('/create'),
            // 'edit' => Pages\EditConfiguration::route('/{record}/edit'),
        ];
    }
}
