<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Event;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\EventResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\EventResource\RelationManagers;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Judul Deskripsi Event')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Event')
                            ->required(),
                        TextInput::make('description')
                            ->label('Deskripsi Event')
                            ->required(),
                    ]),
                Section::make('Waktu Event')
                    ->schema([
                        DatePicker::make('date')
                            ->required(),
                        TimePicker::make('start_time')
                            ->label('Waktu Mulai')
                            ->required(),
                        TimePicker::make('end_time')
                            ->label('Waktu Selesai')
                            ->required(),
                    ]),
                Section::make('Lokasi dan Dresscode')
                    ->schema([
                        TextInput::make('location')
                            ->label('Lokasi Event')
                            ->required(),
                        TextInput::make('dresscode')
                            ->label('Dresscode')
                            ->default('Bebas sopan')
                            ->required(),
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
                TextColumn::make('description')
                    ->label('Deskripsi')
                    ->limit(30)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('date')
                    ->label('Tanggal')
                    ->sortable(),

                TextColumn::make('start_time')
                    ->label('Waktu Mulai'),
                TextColumn::make('end_time')
                    ->label('Waktu Selesai')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('location')
                    ->label('Lokasi Acara'),
                TextColumn::make('dresscode')
                    ->label('Dresscode'),
                IconColumn::make('is_active')
                    ->label('status aktif')->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),





            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->slideOver(),
                Tables\Actions\ViewAction::make()->slideOver(),
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
            'index' => Pages\ListEvents::route('/'),
            // 'create' => Pages\CreateEvent::route('/create'),
            // 'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
