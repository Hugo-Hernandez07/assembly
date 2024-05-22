// Función para descargar contenido como archivo
function download(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Manejar la selección de archivos y el ensamblaje
document.getElementById('fileSelector').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension === 'asm') {
                document.getElementById('asmContent').textContent = content;
                const lstContent = assemble(content);
                document.getElementById('lstContent').textContent = lstContent;

                // Crear y descargar el archivo .lst
                const outputFileName = file.name.replace(/\.asm$/i, '.lst');
                download(lstContent, outputFileName);
            } else if (extension === 'lst') {
                document.getElementById('lstContent').textContent = content;
            }
        };
        reader.readAsText(file);
    }
});
