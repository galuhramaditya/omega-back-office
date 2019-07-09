<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\View;

class ViewController extends Controller
{
    public function login()
    {
        return View::make('pages.login');
    }

    public function dashboard()
    {
        return View::make("pages.dashboard.index");
    }

    public function balanceSheet()
    {
        return View::make('pages.balance-sheet.index');
    }

    public function accounts()
    {
        return View::make('pages.accounts.index');
    }

    public function roles()
    {
        return View::make('pages.roles.index');
    }

    public function pages()
    {
        return View::make('pages.pages.index');
    }
}