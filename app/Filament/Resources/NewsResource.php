<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\News;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use App\Models\NewsCategory;
use Filament\Resources\Resource;
use FilamentTiptapEditor\TiptapEditor;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\NewsResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\NewsResource\RelationManagers;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'News Management';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('News Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($operation, $state, $set) {
                                if ($operation === 'edit')
                                    return;
                                $set('slug', Str::slug($state));
                            }),

                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Forms\Components\Select::make('category_id')
                            ->label('Category')
                            ->options(NewsCategory::where('is_active', true)->pluck('name', 'id'))
                            ->required()
                            ->searchable()
                            ->native(false),

                        Forms\Components\FileUpload::make('image')
                            ->directory('news-images')
                            ->required()
                            ->image()
                            ->maxSize(2048),

                        Forms\Components\DateTimePicker::make('published_at')
                            ->label('Publish Date')
                            ->default(now()),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
                    ])->columns(2),
                Forms\Components\Section::make('Content')
                    ->schema([
                        TiptapEditor::make('content')
                            ->required()
                            ->profile('default')
                            ->maxContentWidth('5xl')
                            ->columnSpanFull()
                            ->extraInputAttributes(['style' => 'min-height: 400px;']),
                    ])

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->toggleable()
                    ->circular()
                    ->getStateUsing(
                        fn($record) => collect($record->image)
                            ->map(fn($image) => asset('storage/' . $image))
                            ->all()
                    ),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->wrap(),

                Tables\Columns\TextColumn::make('category.name')
                    ->badge()
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),

            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Category')
                    ->options(NewsCategory::pluck('name', 'id'))
                    ->searchable(),

                Tables\Filters\TernaryFilter::make('is_active'),

                Tables\Filters\Filter::make('published_at')
                    ->form([
                        Forms\Components\DatePicker::make('published_from'),
                        Forms\Components\DatePicker::make('published_until'),
                    ])
            ])
            ->actions([
                Tables\Actions\EditAction::make()->slideOver(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('published_at', 'desc');
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
            'index' => Pages\ListNews::route('/'),
            // 'create' => Pages\CreateNews::route('/create'),
            // 'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }
}
