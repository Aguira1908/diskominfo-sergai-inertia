<!-- resources/views/filament/pages/custom-login.blade.php --> --}}
<form wire:submit.prevent="authenticate">
    @foreach ($this->form->getComponents() as $component)
        {{ $component }}
    @endforeach
    {{-- @if(filament()->hasPasswordReset())
        <div class="text-sm text-right">
            <a href="{{ filament()->getRequestPasswordResetUrl() }}" class="font-medium text-primary-600 hover:text-primary-500">
                Forgot password?
            </a>
        </div>
    @endif --}}
    <button
        type="submit"
        class="flex w-full justify-center rounded-md bg-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mt-4"
    >
        Sign in
    </button>
</form>