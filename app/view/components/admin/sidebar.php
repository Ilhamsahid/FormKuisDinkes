<!-- Sidebar -->
<aside id="sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-800 to-green-700 text-white transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl">
    <div class="flex flex-col h-full">

        <!-- Logo -->
        <?= getView('components.admin.partials.logo-sidebar') ?>

        <!-- Navigation -->
        <?= getView('components.admin.navbar') ?>

        <!-- User Info -->
        <?= getView('components.admin.partials.user-info') ?>
    </div>
</aside>
