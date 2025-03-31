<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Ventas</title>
    <link rel="icon" type="image/png" href="{{asset('img/log.png')}}">
    <link rel="stylesheet" href="{{asset('css/form.css')}}">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
</head>

<body>
<h1>Reporte de Ventas</h1>
<form id="salesForm">
    <div>
        <label for="storeName">Nombre de la Tienda/Sucursal:</label>
        <input type="text" id="storeName" name="storeName" required>
    </div>
    <div>
        <label for="salesCount">Número de Ventas Realizadas:</label>
        <input type="number" id="salesCount" name="salesCount" required>
    </div>
    <div>
        <label for="wasteAmount">Cantidad de Merma:</label>
        <input type="number" id="wasteAmount" name="wasteAmount" required>
    </div>

    <button type="button" onclick="generatePDF()">Descargar Reporte en PDF</button>
</form>

<script>
    function generatePDF() {
        const {jsPDF} = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        const img = new Image();
        img.src = 'img/snappp.png';

        img.onload = function () {
            doc.addImage(img, 'PNG', 0, 0, 210, 297);

            const storeName = document.getElementById('storeName').value;
            const salesCount = document.getElementById('salesCount').value;
            const wasteAmount = document.getElementById('wasteAmount').value;

            doc.setFontSize(16);
            doc.setTextColor(40, 40, 40);

            doc.setFont('helvetica', 'bold');
            doc.text('Reporte de Ventas - Snappy', doc.internal.pageSize.getWidth() / 2, 30, {align: 'center'});

            doc.setLineWidth(0.5);

            doc.setFontSize(12);

            const leftMargin = 30;
            const centerX = doc.internal.pageSize.getWidth() / 2;

            // Nombre de la Tienda/Sucursal
            doc.setFont('helvetica', 'bold');
            doc.text('Nombre de la Tienda/Sucursal:', leftMargin, 50);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text(storeName, centerX, 50, {align: 'center'});

            // Número de Ventas Realizadas
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(40, 40, 40); // Color de etiqueta
            doc.text('Número de Ventas Realizadas:', leftMargin, 60);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80); // Color más claro
            doc.text(salesCount, centerX, 60, {align: 'center'});

            // Cantidad de Merma
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(40, 40, 40); // Color de etiqueta
            doc.text('Cantidad de Merma:', leftMargin, 70);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80); // Color más claro
            doc.text(wasteAmount, centerX, 70, {align: 'center'});

            // Guardar el PDF con la plantilla y los datos
            doc.save('Reporte_ventas_snappy.pdf');
        };
    }
</script>
</body>

</html>
