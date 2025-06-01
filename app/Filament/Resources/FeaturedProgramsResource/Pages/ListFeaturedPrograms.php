<?php

namespace App\Filament\Resources\FeaturedProgramsResource\Pages;

use App\Filament\Resources\FeaturedProgramsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFeaturedPrograms extends ListRecords
{
    protected static string $resource = FeaturedProgramsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->slideOver(),
        ];
    }
}
