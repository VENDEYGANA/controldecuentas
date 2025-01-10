document.addEventListener('DOMContentLoaded', cargarDatos);

function guardarDatos() {
    var cuenta = document.getElementById('cuenta').value;
    var correo = document.getElementById('correo').value;
    var vendedor = document.getElementById('vendedor').value;
    var fechaIngreso = new Date();
    var fechaIngresoFormateada = fechaIngreso.toLocaleDateString() + ' ' + fechaIngreso.toLocaleTimeString();
    var fechaVenta = correo.includes('@') ? new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() : '';
    var fechaVencimiento = correo.includes('@') ? new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString() : '';

    if (cuenta && correo && vendedor) {
        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        
        var nuevoRegistro = {
            cuenta: cuenta,
            correo: correo,
            fechaIngreso: fechaIngresoFormateada,
            fechaVenta: fechaVenta,
            fechaVencimiento: fechaVencimiento,
            vendedor: vendedor
        };
        
        registros.push(nuevoRegistro);
        localStorage.setItem('registros', JSON.stringify(registros));
        
        agregarRegistroATabla(nuevoRegistro);

        document.getElementById('cuenta').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('vendedor').value = '';
    } else {
        alert('Por favor, ingrese todos los datos.');
    }
}

function cargarDatos() {
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.forEach(agregarRegistroATabla);
}

function agregarRegistroATabla(registro) {
    var tableBody = document.getElementById('datos-body');
    var row = document.createElement('tr');

    var cellCuenta = document.createElement('td');
    var cellCorreo = document.createElement('td');
    var cellFechaIngreso = document.createElement('td');
    var cellFechaVenta = document.createElement('td');
    var cellFechaVencimiento = document.createElement('td');
    var cellVendedor = document.createElement('td');
    var cellCopiar = document.createElement('td');

    cellCuenta.textContent = registro.cuenta;
    cellCorreo.textContent = registro.correo;
    cellFechaIngreso.textContent = registro.fechaIngreso;
    cellFechaVenta.textContent = registro.fechaVenta;
    cellFechaVencimiento.textContent = registro.fechaVencimiento;
    cellVendedor.textContent = registro.vendedor;
    cellCopiar.innerHTML = '<button onclick="copiarDatos(this)">Copiar</button>';

    row.appendChild(cellCuenta);
    row.appendChild(cellCorreo);
    row.appendChild(cellFechaIngreso);
    row.appendChild(cellFechaVenta);
    row.appendChild(cellFechaVencimiento);
    row.appendChild(cellVendedor);
    row.appendChild(cellCopiar);

    tableBody.appendChild(row);
}

function copiarDatos(button) {
    var row = button.closest('tr');
    var cuenta = row.cells[0].textContent;
    var fechaCompra = row.cells[3].textContent;
    var fechaVencimiento = row.cells[4].textContent;
    var datos = `Cuenta: ${cuenta}\nFecha de Compra: ${fechaCompra}\nFecha de Vencimiento: ${fechaVencimiento}\n\n**GRACIAS POR SU COMPRA!** 😊🎉`;

    navigator.clipboard.writeText(datos).then(function() {
        alert('Datos copiados al portapapeles:\n' + datos);
    }, function(err) {
        console.error('Error al copiar los datos: ', err);
    });
}

function buscarDatos() {
    var input = document.getElementById('buscar').value.toUpperCase();
    var table = document.querySelector('.table-container table');
    var tr = table.getElementsByTagName('tr');
    var mensaje = document.getElementById('mensaje');
    var encontrado = false;

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElements