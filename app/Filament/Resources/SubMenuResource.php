<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\SubMenu;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\SubMenuResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\SubMenuResource\RelationManagers;
use Filament\Forms\Components\Toggle;

class SubMenuResource extends Resource
{
    protected static ?string $model = SubMenu::class;


    protected static ?string $navigationIcon = 'heroicon-o-bars-arrow-down';
    protected static ?string $navigationGroup = 'Menu Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('SubMenu Information')
                    ->schema([
                        Select::make('menu_id')
                            ->label('Parent Menu')
                            ->required()
                            ->relationship('menu', 'title')
                            ->searchable()
                            ->preload(),

                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, $set) {
                                $set('url_slug', Str::slug($state));
                            }),

                        TextInput::make('excerpt')
                            ->hint('Isi ringkasan singkat dari menu ini (kosongkan jika menu memiliki sub-menu)'),

                        TextInput::make('url_slug')
                            ->label('URL Slug')
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
                Tables\Columns\TextColumn::make('menu.title')
                    ->label('Parent Menu')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('title')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('excerpt'),


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
                Tables\Filters\SelectFilter::make('menu')
                    ->relationship('menu', 'title')
                    ->searchable()
                    ->preload(),

                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status')
                    ->trueLabel('Active')
                    ->falseLabel('Inactive')
                    ->nullable(),
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
            'index' => Pages\ListSubMenus::route('/'),
            // 'create' => Pages\CreateSubMenu::route('/create'),
            // 'edit' => Pages\EditSubMenu::route('/{record}/edit'),
        ];
    }
}
