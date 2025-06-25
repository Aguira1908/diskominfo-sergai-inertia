<?php

namespace App\Filament\Resources\NewsSummariesResource\Pages;

use App\Filament\Resources\NewsSummariesResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNewsSummaries extends EditRecord
{
    protected static string $resource = NewsSummariesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
