<?php

namespace App\Filament\Resources\FeaturedProgramsResource\Pages;

use App\Filament\Resources\FeaturedProgramsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFeaturedPrograms extends EditRecord
{
    protected static string $resource = FeaturedProgramsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
