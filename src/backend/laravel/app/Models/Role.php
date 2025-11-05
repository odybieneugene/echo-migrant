<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';

    protected $fillable = [
        'nom',
        'description',
    ];

    // 🔹 Relations

    // Un rôle peut être attribué à plusieurs utilisateurs
    public function utilisateurs(): BelongsToMany
    {
         return $this->belongsToMany(Utilisateur::class, 'utilisateur_role', 'role_id', 'utilisateur_id');
    }
}
