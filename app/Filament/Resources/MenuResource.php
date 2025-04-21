<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\Menu;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\MenuResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\MenuResource\RelationManagers;

class MenuResource extends Resource
{
    protected static ?string $model = Menu::class;


    protected static ?string $navigationIcon = 'heroicon-o-bars-3';
    protected static ?string $navigationGroup = 'Menu Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Menu Information')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(225)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, Forms\Set $set) {
                                $set('url_slug', Str::slug($state));
                            }),

                        TextInput::make('url_slug')->label('URL Slug')
                            ->maxLength(255)
                            ->nullable()
                            ->hint('Biarkan kosong untuk generate otomatis dari judul')
                            ->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')
                            ->unique(ignoreRecord: true),

                        Toggle::make('is_active')
                            ->label('Active Status')
                            ->default(true)
                            ->required(),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('title')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('url_slug')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->sortable()
                    ->label('Active'),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

            ])
            ->filters([
                Tables\Filters\Filter::make('active')
                    ->toggle()
                    ->query(fn($query) => $query->where('is_active', true)),

                Tables\Filters\Filter::make('inactive')
                    ->toggle()
                    ->query(fn($query) => $query->where('is_active', false)),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->slideOver(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListMenus::route('/'),
            // 'create' => Pages\CreateMenu::route('/create'),
            // 'edit' => Pages\EditMenu::route('/{record}/edit'),
        ];
    }
}
