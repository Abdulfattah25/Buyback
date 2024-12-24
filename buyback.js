document.getElementById('penerimaanForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get config from localStorage
    const config = JSON.parse(localStorage.getItem('penerimaanConfig')) || {
        sangatBagus: {skala1: 99, skala2: 98, skala3: 96},
        sedang: {skala1: 95, skala2: 94},
        kurangBagus: 78
    };

    const rows = document.querySelectorAll('#tablePenerimaan tbody tr');
    let resultsHTML = '';
    
    rows.forEach((row, index) => {
        // Get values from each row
        const kadar = row.querySelector('select[name="kadar"]').value;
        const kondisiBarang = row.querySelector('select[name="kondisiBarang"]').value;
        const skalaBarang = row.querySelector('select[name="kondisiBarang"]').value;
        const hargaBeli = parseFloat(row.querySelector('input[name="hargaBeli"]').value);
        const hargaHariIni = parseFloat(row.querySelector('input[name="hargaHariIni"]').value);

        // Calculate percentage and price
        const persentaseBeli = (hargaBeli / hargaHariIni) * 100;
        let persentasePenerimaan;

    // Logika untuk menentukan persentase penerimaan
    if (persentaseBeli > 93) {
        switch(kondisiBarang) {
            case 'Sangat Bagus':
                if (skalaBarang === '1') persentasePenerimaan = config.sangatBagus.skala1;
                else if (skalaBarang === '2') persentasePenerimaan = config.sangatBagus.skala2;
                else persentasePenerimaan = config.sangatBagus.skala3;
                break;
            case 'Sedang':
                if (skalaBarang === '1') persentasePenerimaan = config.sedang.skala1;
                else if (skalaBarang === '2') persentasePenerimaan = config.sedang.skala2;
                else persentasePenerimaan = persentaseBeli;
                break;
            case 'Kurang Bagus':
                persentasePenerimaan = persentaseBeli;
                break;
        }
    } else {
        switch(kondisiBarang) {
            case 'Sangat Bagus':
                if (skalaBarang === '1') persentasePenerimaan = 93;
                else if (skalaBarang === '2') persentasePenerimaan = 89;
                else persentasePenerimaan = 87;
                break;
            case 'Sedang':
                if (skalaBarang === '1') persentasePenerimaan = 84;
                else if (skalaBarang === '2') persentasePenerimaan = 82;
                else persentasePenerimaan = 80;
                break;
            case 'Kurang Bagus':
                persentasePenerimaan = config.kurangBagus;
                break;
        }
    }
    const hargaPenerimaan = (hargaHariIni * persentasePenerimaan) / 100;

        // Add result to HTML
        resultsHTML += `
            <div class="result-item ${index !== rows.length - 1 ? 'border-bottom mb-3 pb-3' : ''}">
                <h6 class="fw-bold">Data ${index + 1}</h6>
                <div class="row">
                    <div class="col-12">
                        <p class="mb-2"><strong>Kadar:</strong> ${kadar}</p>
                        <p class="mb-2"><strong>Persentase Penerimaan:</strong> ${persentasePenerimaan}%</p>
                        <p class="mb-0"><strong>Harga Penerimaan:</strong> Rp ${hargaPenerimaan.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Update modal content
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = resultsHTML;

    // Show modal
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
});

document.getElementById('btnTambahAksesoris').addEventListener('click', function() {
    const tbody = document.querySelector('#tablePenerimaan tbody');
    const rowCount = tbody.getElementsByTagName('tr').length + 1;
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>
            <select name="kadar" class="form-select form-select-sm" required>
                <option value="" disabled selected>Pilih</option>
                <option value="8K">8K</option>
                <option value="9K">9K</option>
                <option value="16K">16K</option>
                <option value="17K">17K</option>
                <option value="18K">18K</option>
                <option value="22K">22K</option>
            </select>
        </td>
        <td>
            <select name="asalToko" class="form-select form-select-sm" required>
                <option value="" disabled selected>Pilih Asal Toko</option>
                <option value="Toko Melati">Toko Melati</option>
                <option value="Luar Toko">Luar Toko</option>
            </select>
        </td>
        <td>
            <select name="kondisiBarang" class="form-select form-select-sm" required>
                <option value="" disabled selected>Pilih Kondisi</option>
                <option value="Sangat Bagus">Sangat Bagus</option>
                <option value="Sedang">Sedang</option>
                <option value="Kurang Bagus">Kurang Bagus</option>
            </select>
        </td>
        <td>
            <select name="kondisiBarang" class="form-select form-select-sm" required>
                <option value="" disabled selected>Pilih Skala</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </td>
        <td>
            <input
                type="number"
                name="hargaBeli"
                class="form-control form-control-sm"
                placeholder="Harga beli"
                required
                min="0"
            />
        </td>
        <td>
            <input
                type="number"
                name="hargaHariIni"
                class="form-control form-control-sm"
                placeholder="Harga hari ini"
                required
                min="0"
            />
        </td>
        <td>
            <button type="button" class="btn btn-danger btn-sm hapus-baris">Hapus</button>
        </td>
    `;
    
    tbody.appendChild(newRow);
});

// Event delegation for delete buttons
document.querySelector('#tablePenerimaan tbody').addEventListener('click', function(e) {
    if (e.target.classList.contains('hapus-baris')) {
        e.target.closest('tr').remove();
        // Update row numbers
        const rows = document.querySelectorAll('#tablePenerimaan tbody tr');
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }
});


function formatTanggal(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    let year = date.getFullYear();

    return day + '-' + month + '-' + year;
  }
  // Mendapatkan tanggal saat ini
 let tanggalSekarang = new Date();
 let tanggalFormat = formatTanggal(tanggalSekarang);
  // Menampilkan tanggal di elemen dengan id 'tanggal'
  document.getElementById('tgl').textContent = tanggalFormat;