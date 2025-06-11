<?php

namespace Database\Factories;

use App\Models\News;
use Illuminate\Support\Str;
use App\Models\NewsCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    protected $model = News::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(6, true);
        $slug = Str::slug($title);

        return [
            'title' => $title,
            'image' => $this->faker->imageUrl(800, 600, 'news', true, 'headline'),
            'content' => $this->faker->paragraphs(5, true),
            'slug' => $slug . '-' . Str::random(5), // jaga-jaga supaya unik
            'category_id' => NewsCategory::inRandomOrder()->first()?->id ?? NewsCategory::factory(),
            'is_active' => $this->faker->boolean(90),
            'published_at' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
