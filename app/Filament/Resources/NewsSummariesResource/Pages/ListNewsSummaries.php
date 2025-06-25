<?php

namespace App\Filament\Resources\NewsSummariesResource\Pages;

use App\Filament\Resources\NewsSummariesResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNewsSummaries extends ListRecords
{
    protected static string $resource = NewsSummariesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->slideOver(),
        ];
    }
}
