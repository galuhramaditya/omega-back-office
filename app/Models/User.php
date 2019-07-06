<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "samuser";
    // protected $fillable = [
    //     "username", "password", "role_id"
    // ];
    protected $hidden = [
        "Password"
    ];

    public $incrementing = false;
    public $timestamps = false;

    // public function role()
    // {
    //     return $this->belongsTo(Role::class);
    // }
}