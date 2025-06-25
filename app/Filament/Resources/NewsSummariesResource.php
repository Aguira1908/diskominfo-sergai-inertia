<?php

namespace App\Filament\Resources;

use Filament\Forms;

use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Models\NewsSummaries;
use App\Jobs\SummarizeNewsJob;
use Filament\Resources\Resource;
use Filament\Tables\Actions\Action;
use FilamentTiptapEditor\TiptapEditor;
use Illuminate\Support\Facades\Artisan;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\BadgeColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\NewsSummariesResource\Pages;
use App\Filament\Resources\NewsSummariesResource\RelationManagers;

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


                Forms\Components\Section::make('Content')
                    ->schema([
                        TiptapEditor::make('summary')
                            ->profile('default')
                        // ->rows(15)
                        // ->columnSpanFull()
                        // ->disabled(),
                    ])

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // Tables\Columns\TextColumn::make('period_type')
                //     ->badge()
                //     ->color(fn(string $state): string => match ($state) {
                //         'weekly' => 'success',
                //         'monthly' => 'primary',
                //     }),

                // Tables\Columns\TextColumn::make('start_date')
                //     ->date(),

                // Tables\Columns\TextColumn::make('end_date')
                //     ->date(),

                // Tables\Columns\TextColumn::make('created_at')
                //     ->dateTime(),

                // BadgeColumn::make('status')
                //     ->label('Status')
                //     ->colors([
                //         'success' => 'green',
                //         'empty' => 'yellow',
                //         'failed' => 'red',
                //     ]),
                Tables\Columns\TextColumn::make('period_type')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'weekly' => 'success',
                        'monthly' => 'primary',
                    }),

                Tables\Columns\TextColumn::make('start_date')->date(),
                Tables\Columns\TextColumn::make('end_date')->date(),

                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'green',
                        'empty' => 'yellow',
                        'failed' => 'red',
                    ])
                    ->formatStateUsing(fn($state) => $state ?? 'unknown')
                    ->tooltip(fn($state) => match ($state) {
                        'success' => 'Ringkasan berhasil',
                        'empty' => 'Tidak ada hasil dari LLM',
                        'failed' => 'Terjadi kegagalan',
                        default => 'Status tidak diketahui',
                    }),

                Tables\Columns\TextColumn::make('error_message')
                    ->label('Error')
                    ->limit(50)
                    ->wrap()
                    ->tooltip(fn($record) => $record->error_message),

            ])
            ->filters([
                Tables\Filters\SelectFilter::make('period_type')
                    ->options([
                        'weekly' => 'Mingguan',
                        'monthly' => 'Bulanan',
                    ]),
            ])
            ->actions([
                Action::make('retry_summary')
                    ->label('Ulangi Ringkasan')
                    // ->visible(fn($record) => in_array($record->status, ['empty', 'failed']))
                    ->requiresConfirmation()
                    ->action(function ($record) {
                        $start = \Carbon\Carbon::parse($record->start_date)->toDateString();
                        $end = \Carbon\Carbon::parse($record->end_date)->toDateString();

                        $exitCode = Artisan::call('app:summarize-weekly-command', [
                            '--start' => $start,
                            '--end' => $end,
                        ]);

                        \Filament\Notifications\Notification::make()
                            ->title('Perintah ulang ringkasan dijalankan.')
                            ->success()
                            ->send();
                    }),

                // Tables\Actions\ViewAction::make()->slideOver(),
                Tables\Actions\EditAction::make()->slideOver(),
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
            // 'view' => Pages\ListNewsSummaries::route('/{record}'),

            // 'create' => Pages\CreateNewsSummaries::route('/create'),
            // 'edit' => Pages\EditNewsSummaries::route('/{record}/edit'),
        ];
    }
}
