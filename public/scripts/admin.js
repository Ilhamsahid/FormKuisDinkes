let filteredUser = [...users];
const perPage = 10;
let idUser = null;
let typeNow = null;
let currentPage = 1;
const form = document.getElementById('formUser');

form.addEventListener('submit', function(e){
    if (form.dataset.mode === 'add') {
        form.action = '/admin/tambah/user';
    } else if (form.dataset.mode === 'edit') {
        form.action = `/admin/edit/user/${idUser}`;
    }
});

function closeModal(nameModal) {
    const modal = document.getElementById(nameModal);
    if(nameModal !== 'flashModal'){
        modal.classList.add('hidden')
        return;
    }
    if (modal) modal.remove();
}

function deleteModal(){
    const form = document.getElementById('formDelete')
    if(typeNow === 'user'){
        form.addEventListener('submit', function(e){
            form.action = `/admin/delete/user/${idUser}`;
        })
    }
}

function navigateTo(page, push = true){
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));

    // Remove active state from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-green-900');
    });

    // Show selected page
    document.getElementById(page + 'Page').classList.remove('hidden');

    // Add active state to current nav link
    document.querySelector(`[data-page="${page}"]`).classList.add('bg-green-900');

    // Update page title
    const titles = {
        'dashboard': { title: 'Dashboard', subtitle: 'Selamat datang di panel admin E-SKM' },
        'users': { title: 'Manajemen User', subtitle: 'Kelola data pengguna sistem' },
        'questions': { title: 'Pertanyaan Survei', subtitle: 'Kelola pertanyaan kuisioner' },
        'results': { title: 'Hasil Kuisioner', subtitle: 'Lihat dan analisis hasil survei' }
    };

    document.getElementById('pageTitle').textContent = titles[page].title;
    document.getElementById('pageSubtitle').textContent = titles[page].subtitle;

    // update URL TANPA reload
    if (push) {
        history.pushState({ page }, '', '/admin/' + page);
    }

    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
        toggleSidebar();
    }
}

function toggleNotFound(show) {
    document.getElementById('notFound').classList.toggle('hidden', !show);
    document.getElementById('usersTableBody').classList.toggle('hidden', show);
}

function renderTable(page) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const slicedUsers = filteredUser.slice(start, end);

    if (filteredUser.length === 0) {
        toggleNotFound(true);
        return;
    }

    toggleNotFound(false);

    let html = '';
    slicedUsers.forEach((u, i) => {
        html += `
        <tr>
            <td class="px-6 py-4">${start + i + 1}</td>
            <td class="px-6 py-4">${u.responden}</td>
            <td class="px-6 py-4">${u.umur}</td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    ${u.kelamin == 'L' ? 'Laki-laki' : 'Perempuan'}
                </span>
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    ${u.lulusan}
                </span>
            </td>
            <td class="px-6 py-4">${u.jenis_pelayanan}</td>
            <td class="px-6 py-4 text-center">${u.tanggal_terakhir_kali}</td>
            <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="openUserModal('edit',${u.id})" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer" title="Edit">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button onclick="confirmDelete('user', ${u.id}, '${u.responden}')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer" title="Hapus">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>`;
    });

    document.getElementById('usersTableBody').innerHTML = html;
}

function confirmDelete(type, userId, name){
    idUser = userId;
    typeNow = type;
    if(type =='user'){
        document.getElementById('deleteUserName').textContent = `user ${name}`;
    }
    document.getElementById('deleteModal').classList.remove('hidden');
}

function renderPagination() {
    const totalItems = filteredUser.length;
    const totalPages = Math.ceil(totalItems / perPage);
    let html = '';

    const maxRange = 2; // kiri & kanan page aktif

    if (filteredUser.length === 0) {
        document.getElementById('pagination').innerHTML = '';
        document.getElementById('paginationInfo').innerHTML = 'Showing 0 of 0';
        return;
    }

    // PREV
    html += `
    <button
        ${currentPage === 1 ? 'disabled' : ''}
        onclick="changePage(${currentPage - 1})"
        class="px-3 py-2 rounded-lg text-sm font-medium
        ${currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-700'}
        transition">
        ‹
    </button>`;

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - maxRange && i <= currentPage + maxRange)
        ) {
            html += `
            <button
                onclick="changePage(${i})"
                class="px-4 py-2 rounded-lg text-sm font-medium transition
                ${i === currentPage
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-700'}">
                ${i}
            </button>`;
        } else if (
            i === currentPage - maxRange - 1 ||
            i === currentPage + maxRange + 1
        ) {
            html += `<span class="px-2 text-gray-400">…</span>`;
        }
    }

    // NEXT
    html += `
    <button
        ${currentPage === totalPages ? 'disabled' : ''}
        onclick="changePage(${currentPage + 1})"
        class="px-3 py-2 rounded-lg text-sm font-medium
        ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-700'}
        transition">
        ›
    </button>`;

    document.getElementById('pagination').innerHTML = html;

    renderPaginationInfo();
}

function renderPaginationInfo() {
    const totalItems = filteredUser.length;
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(start + perPage - 1, totalItems);

    document.getElementById('paginationInfo').innerHTML =
        `Showing <span class="font-medium text-gray-800">${start}</span>
         – <span class="font-medium text-gray-800">${end}</span>
         of <span class="font-medium text-gray-800">${totalItems}</span>`;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredUser.length / perPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderTable(page);
    renderPagination();
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

function searchUser(value){
    filteredUser = users.filter(user => {
        return user.responden.toLowerCase().includes(value.toLowerCase().trim())
    });

    currentPage = 1;
    renderTable(currentPage);
    renderPagination();
}

function clearModalUser(){
    document.getElementById('nama').value = '';
    document.getElementById('umur').value = '';
    document.getElementById('kelamin').value = '';
    document.getElementById('lulusan').value = '';
    document.getElementById('layanan').value = '';
    document.getElementById('tanggal_terakhir').value = '';
}

function openUserModal(mode, userId = null) {
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('formUser');

    form.dataset.mode = mode;
    idUser = userId;

    if (mode === 'add') {
        modalTitle.textContent = 'Tambah User';
        clearModalUser();
    } else {
        modalTitle.textContent = 'Edit User';
        const userEdit = users.find((u) => u.id == userId);

        document.getElementById('nama').value = userEdit.responden;
        document.getElementById('umur').value = userEdit.umur;
        document.getElementById('kelamin').value = userEdit.kelamin;
        document.getElementById('lulusan').value = userEdit.lulusan;
        document.getElementById('layanan').value = userEdit.jenis_pelayanan;
        document.getElementById('tanggal_terakhir').value = userEdit.tanggal_terakhir_kali;
    }

    modal.classList.remove('hidden');
}

function closeUserModal() {
    document.getElementById('userModal').classList.add('hidden');
}

// load pertama
renderTable(currentPage);
renderPagination();

window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'dashboard';
    navigateTo(page, false);
    toggleSidebar()
});

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'dashboard';
    navigateTo(page, false);
});
