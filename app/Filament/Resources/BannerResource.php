<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Banner;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\BannerResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\BannerResource\RelationManagers;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Deskripsi')
                    ->description('Masukkan Deskripsi Baner')
                    ->schema([
                        Forms\Components\TextInput::make('description')
                            ->label('Deskripsi')
                            ->required()
                    ]),

                Forms\Components\Section::make('Baner')
                    ->description('Masukkan Baner')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->required()
                            ->image()
                            ->directory('banner')
                            ->storeFileNamesIn('original_filenames')
                    ]),
                Forms\Components\Toggle::make('is_active')
                    ->default(true)

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('description')
                    ->label('Deskripsi'),
                IconColumn::make('is_active')
                    ->label('status aktif')
                    ->boolean(),
                ImageColumn::make('image')
                    ->getStateUsing(fn($record) => asset('storage/' . $record->image))
                    ->label('Banner')
                    ->circular(),
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
            'index' => Pages\ListBanners::route('/'),
            // 'create' => Pages\CreateBanner::route('/create'),
            // 'edit' => Pages\EditBanner::route('/{record}/edit'),
        ];
    }
}
