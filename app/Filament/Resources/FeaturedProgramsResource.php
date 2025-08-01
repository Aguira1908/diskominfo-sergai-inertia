<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Models\FeaturedProgram;
use App\Models\FeaturedPrograms;
use Filament\Resources\Resource;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\FeaturedProgramsResource\Pages;
use App\Filament\Resources\FeaturedProgramsResource\RelationManagers;

class FeaturedProgramsResource extends Resource
{
    protected static ?string $model = FeaturedProgram::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Program Unggulan')
                    ->description('Masukkan Program Unggulan')
                    ->schema([
                        TextInput::make('title')
                            ->required(),
                        Textarea::make('description')
                            ->required(),
                        TextInput::make('url')
                            ->required(),
                        FileUpload::make('icon')
                            ->required()
                            ->image()
                            ->directory('icon-program')
                            ->storeFileNamesIn('orginal_file'),
                        Forms\Components\Toggle::make('is_active')
                            ->default(true)
                    ]),
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
                    ->limit(40),
                TextColumn::make('url')
                    ->label('URL')
                    ->toggleable(isToggledHiddenByDefault: true),
                ImageColumn::make('icon')
                    ->getStateUsing(fn($record) => asset('storage/' . $record->icon))
                    ->label('Ikon')
                    ->circular(),
                IconColumn::make('is_active')
                    ->label('status aktif')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
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
            'index' => Pages\ListFeaturedPrograms::route('/'),
            // 'create' => Pages\CreateFeaturedPrograms::route('/create'),
            // 'edit' => Pages\EditFeaturedPrograms::route('/{record}/edit'),
        ];
    }
}
