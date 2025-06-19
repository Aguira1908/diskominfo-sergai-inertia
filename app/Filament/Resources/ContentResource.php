<?php

namespace App\Filament\Resources;

use Closure;
use Filament\Forms;
use Filament\Tables;
use App\Models\Content;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use FilamentTiptapEditor\TiptapEditor;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\ContentResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\ContentResource\RelationManagers;

class ContentResource extends Resource
{
    protected static ?string $model = Content::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Menu Management';

    // public static function form(Form $form): Form
    // {
    //     return $form
    //         ->schema([
    //             Section::make('Content Information')
    //                 ->heading('Buat Kontent')
    //                 ->description('Anda Hanya Dapat Memasukkan Antara Menu dan Sub-Menu')
    //                 ->schema([
    //                     Select::make('menu_id')
    //                         ->label('Parent Menu')
    //                         ->relationship('menu', 'title')
    //                         ->searchable()
    //                         ->preload()
    //                         ->nullable()
    //                         ->hint('Pilih menu utama (opsional)')
    //                         ->live()
    //                         ->afterStateUpdated(function ($state, Forms\Set $set) {
    //                             if ($state) {
    //                                 $set('sub_menu_id', null);
    //                             }
    //                         })
    //                         ->rules([
    //                             fn(Forms\Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
    //                                 if ($value && $get('sub_menu_id')) {
    //                                     $fail('Anda hanya bisa memilih Menu atau Sub Menu, tidak keduanya.');
    //                                 }
    //                             },
    //                         ]),


    //                     Select::make('sub_menu_id')
    //                         ->label('Submenu')
    //                         ->relationship('submenu', 'title')
    //                         ->searchable()
    //                         ->preload()
    //                         ->nullable()
    //                         ->hint('Pilih submenu (opsional)')
    //                         ->live()
    //                         ->afterStateUpdated(function ($state, Forms\Set $set) {
    //                             if ($state) {
    //                                 $set('menu_id', null);
    //                             }
    //                         })
    //                         ->rules([
    //                             fn(Forms\Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
    //                                 if ($value && $get('menu_id')) {
    //                                     $fail('Anda hanya bisa memilih Menu atau Sub Menu, tidak keduanya.');
    //                                 }
    //                             },
    //                         ]),


    //                     TextInput::make('title')
    //                         ->required()
    //                         ->maxLength(255)
    //                         ->live(onBlur: true)
    //                         ->afterStateUpdated(function ($state, $set) {
    //                             $set('slug', Str::slug($state));
    //                         }),

    //                     TextInput::make('slug')
    //                         ->required()
    //                         ->maxLength(255)
    //                         ->unique(ignoreRecord: true)
    //                         ->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/'),

    //                     TiptapEditor::make('content')
    //                         ->required()
    //                         ->columnSpanFull()
    //                         ->profile('default')
    //                         ->directory('content'),


    //                     Toggle::make('is_active')
    //                         ->label('Active Status')
    //                         ->default(true)
    //                         ->required(),

    //                 ])
    //         ]);
    // }


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Content Information')
                    ->heading('Buat Kontent')
                    ->description('Anda Hanya Dapat Memasukkan Antara Menu dan Sub-Menu')
                    ->schema([
                        Select::make('menu_id')
                            ->label('Parent Menu')
                            ->relationship('menu', 'title')
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->hint('Pilih menu utama')
                            ->live()
                            ->afterStateUpdated(function ($state, Forms\Set $set) {
                                $set('sub_menu_id', null);
                            }),

                        Select::make('sub_menu_id')
                            ->label('Submenu')
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->hint(function (Forms\Get $get) {
                                $menuId = $get('menu_id');
                                if (!$menuId)
                                    return 'Pilih menu terlebih dahulu';

                                $menu = \App\Models\Menu::find($menuId);
                                return $menu && $menu->submenus()->exists()
                                    ? 'Wajib pilih sub menu'
                                    : 'Menu ini tidak memiliki sub menu';
                            })
                            ->options(function ($get) {
                                $menuId = $get('menu_id');
                                return $menuId
                                    ? \App\Models\SubMenu::where('menu_id', $menuId)->pluck('title', 'id')
                                    : [];
                            })
                            ->required(function (Forms\Get $get) {
                                $menuId = $get('menu_id');
                                if (!$menuId)
                                    return false;

                                $menu = \App\Models\Menu::find($menuId);
                                return $menu && $menu->submenus()->exists();
                            })
                            ->disabled(fn($get) => !$get('menu_id')),

                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, $set) {
                                $set('slug', Str::slug($state));
                            }),

                        TextInput::make('slug')
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')
                            ->hint('Tunggu hingga slug tergenerate otomatis'),

                        TiptapEditor::make('content')
                            ->required()
                            ->columnSpanFull()
                            ->profile('default')
                            ->directory('content'),

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
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('menu.title')
                    ->label('Menu Utama')
                    ->searchable()
                    ->sortable()
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('submenu.title')
                    ->label('Submenu')
                    ->searchable()
                    ->sortable()
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

            ])
            ->filters([
                Tables\Filters\SelectFilter::make('menu_id')
                    ->label('Filter Menu Utama')
                    ->relationship('menu', 'title')
                    ->searchable()
                    ->preload(),

                Tables\Filters\SelectFilter::make('sub_menu_id')
                    ->label('Filter Submenu')
                    ->relationship('submenu', 'title')
                    ->searchable()
                    ->preload(),

                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Status Aktif')
                    ->trueLabel('Aktif')
                    ->falseLabel('Tidak Aktif')
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
            'index' => Pages\ListContents::route('/'),
            // 'create' => Pages\CreateContent::route('/create'),
            // 'edit' => Pages\EditContent::route('/{record}/edit'),
        ];
    }
}
