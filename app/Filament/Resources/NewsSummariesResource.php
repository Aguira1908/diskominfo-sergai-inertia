<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsSummariesResource\Pages;
use App\Filament\Resources\NewsSummariesResource\RelationManagers;
use App\Models\NewsSummaries;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewsSummariesResource extends Resource
{
    protected static ?string $model = NewsSummaries::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('period_type')
                    ->options([
                        'weekly' => 'Mingguan',
                        'monthly' => 'Bulanan',
                    ])
                    ->required()
                    ->disabled(),

                Forms\Components\DatePicker::make('start_date')
                    ->required()
                    ->disabled(),

                Forms\Components\DatePicker::make('end_date')
                    ->required()
                    ->disabled(),

                Forms\Components\Textarea::make('summary')
                    ->rows(15)
                    ->columnSpanFull()
                    ->disabled(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('period_type')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'weekly' => 'success',
                        'monthly' => 'primary',
                    }),

                Tables\Columns\TextColumn::make('start_date')
                    ->date(),

                Tables\Columns\TextColumn::make('end_date')
                    ->date(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('period_type')
                    ->options([
                        'weekly' => 'Mingguan',
                        'monthly' => 'Bulanan',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()->slideOver(),
                Tables\Actions\DeleteAction::make()->slideOver(),
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
            'index' => Pages\ListNewsSummaries::route('/'),
            'view' => Pages\ListNewsSummaries::route('/{record}'),

            // 'create' => Pages\CreateNewsSummaries::route('/create'),
            // 'edit' => Pages\EditNewsSummaries::route('/{record}/edit'),
        ];
    }
}
