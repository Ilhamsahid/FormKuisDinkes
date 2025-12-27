<?php
require_once __DIR__ . '/../controllers/AdminController.php';
require_once __DIR__ . '/../data/Responden.php';
use app\controllers\AdminController;

$adminController = new AdminController();

if($path === '/admin/login' && $_SERVER['REQUEST_METHOD'] === 'POST'){
    $adminController->login();
}

if(isset($_SESSION['role']) && $_SESSION['role'] === 'admin'){
    if($path === '/admin/tambah/user' && $_SERVER['REQUEST_METHOD'] === 'POST'){
        $adminController->addUser($path);
        exit;
    }

    if(strpos($path, '/admin/edit/user') !== false ||
        strpos($path, '/admin/delete/user') !== false &&
        $_SERVER['REQUEST_METHOD'] === 'POST'
    ){
        $adminController->addUser($path);
        exit;
    }

    if($path === '/admin/logout'){
        $adminController->logout();
        exit;
    }

    if(strpos($path, '/admin/') === 0 && $path !== '/admin/'){
        $adminController->index();
        exit;
    }

}
