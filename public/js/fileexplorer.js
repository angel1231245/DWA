let fileTree = [];
let currentPath = [];

// Cargar el estado guardado del explorador de archivos
function loadFileTree() {
    const savedFileTree = localStorage.getItem('fileTree');
    if (savedFileTree) {
        fileTree = JSON.parse(savedFileTree);
    }
    renderFileTree();
}

// Guardar el estado del explorador de archivos
function saveFileTree() {
    localStorage.setItem('fileTree', JSON.stringify(fileTree));
}

// Crear una nueva carpeta
function createFolder() {
    const folderName = prompt("Ingrese el nombre de la carpeta:");
    if (folderName) {
        const newFolder = { type: 'folder', name: folderName, children: [] };
        if (currentPath.length === 0) {
            fileTree.push(newFolder);
        } else {
            const currentFolder = getCurrentFolder();
            currentFolder.children.push(newFolder);
        }
        saveFileTree();
        renderFileTree();
    }
}

// Crear un nuevo archivo
function createFile() {
    const fileName = prompt("Ingrese el nombre del archivo:");
    if (fileName) {
        const newFile = { type: 'file', name: fileName };
        if (currentPath.length === 0) {
            fileTree.push(newFile);
        } else {
            const currentFolder = getCurrentFolder();
            currentFolder.children.push(newFile);
        }
        saveFileTree();
        renderFileTree();
    }
}

// Obtener la carpeta actual basada en la ruta
function getCurrentFolder() {
    let currentFolder = fileTree;
    currentPath.forEach(index => {
        currentFolder = currentFolder[index].children;
    });
    return currentFolder;
}

// Renderizar el árbol de archivos
function renderFileTree() {
    const fileTreeElement = document.getElementById('fileTree');
    const breadcrumbElement = document.getElementById('breadcrumb');
    fileTreeElement.innerHTML = '';

    // Renderizar breadcrumb
    breadcrumbElement.innerHTML = '<span onclick="navigateToRoot()">Inicio</span>';
    currentPath.forEach((index, i) => {
        const folderName = fileTree[index].name;
        breadcrumbElement.innerHTML += ` / <span onclick="navigateTo(${i})">${folderName}</span>`;
    });

    // Renderizar archivos y carpetas
    const currentFolder = currentPath.length === 0 ? fileTree : getCurrentFolder();
    currentFolder.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = item.type;

        // Ícono y nombre
        const icon = document.createElement('i');
        icon.className = item.type === 'folder' ? 'fas fa-folder' : 'fas fa-file';
        li.appendChild(icon);
        li.appendChild(document.createTextNode(item.name));

        // Acciones (eliminar y renombrar)
        const actions = document.createElement('div');
        actions.className = 'actions';
        actions.innerHTML = `
            <button onclick="renameItem(${index})"><i class="fas fa-edit"></i></button>
            <button onclick="deleteItem(${index})"><i class="fas fa-trash"></i></button>
        `;
        li.appendChild(actions);

        // Navegar a carpetas
        if (item.type === 'folder') {
            li.addEventListener('click', () => navigateToFolder(index));
        }

        fileTreeElement.appendChild(li);
    });
}

// Navegar a la raíz
function navigateToRoot() {
    currentPath = [];
    renderFileTree();
}

// Navegar a una carpeta específica
function navigateToFolder(index) {
    currentPath.push(index);
    renderFileTree();
}

// Navegar a una ruta específica en el breadcrumb
function navigateTo(level) {
    currentPath = currentPath.slice(0, level);
    renderFileTree();
}

// Eliminar un archivo o carpeta
function deleteItem(index) {
    if (confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
        const currentFolder = currentPath.length === 0 ? fileTree : getCurrentFolder();
        currentFolder.splice(index, 1);
        saveFileTree();
        renderFileTree();
    }
}

// Renombrar un archivo o carpeta
function renameItem(index) {
    const newName = prompt("Ingrese el nuevo nombre:");
    if (newName) {
        const currentFolder = currentPath.length === 0 ? fileTree : getCurrentFolder();
        currentFolder[index].name = newName;
        saveFileTree();
        renderFileTree();
    }
}

// Inicializar el explorador de archivos
loadFileTree();