document.getElementById('penerimaanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rows = document.querySelectorAll('#tablePenerimaan tbody tr');
    let resultsHTML = '';
   
    rows.forEach((row, index) => {
        const kadar = row.querySelector('select[name="kadar"]').value;
        const asalToko = row.querySelector('select[name="asalToko"]').value;
        const kondisiBarang = row.querySelector('select[name="kondisiBarang"]').value;
        const hargaBeli = parseFloat(row.querySelector('input[name="hargaBeli"]').value);
        const hargaHariIni = parseFloat(row.querySelector('input[name="hargaHariIni"]').value);

        const persentaseBeli = (hargaBeli / hargaHariIni) * 100;
        let persentasePenerimaan;
        let hargaPenerimaan;

        if (asalToko === 'Toko Melati') {
            if (persentaseBeli >= 90) {
                switch(kondisiBarang) {
                    case '1': persentasePenerimaan = 99; break;
                    case '2': persentasePenerimaan = 97; break;
                    case '3': persentasePenerimaan = 95; break;
                    case '4': persentasePenerimaan = 93; break;
                    case '5': 
                    case '6':
                    case '7':
                    case '8': persentasePenerimaan = 90; break;
                }
            } else {
                switch(kondisiBarang) {
                    case '1': persentasePenerimaan = 94; break;
                    case '2': persentasePenerimaan = 88; break;
                    case '3': persentasePenerimaan = 86; break;
                    case '4': persentasePenerimaan = 84; break;
                    case '5': persentasePenerimaan = 82; break;
                    case '6': persentasePenerimaan = 75; break;
                    case '7': persentasePenerimaan = 72; break;
                    case '8': persentasePenerimaan = 70; break;
                }
            }
            hargaPenerimaan = (hargaHariIni * persentasePenerimaan) / 100;
            hargaPenerimaan = Math.max(hargaBeli, hargaPenerimaan);
            
        } else {
            switch(kondisiBarang) {
                case '1': persentasePenerimaan = 72; break;
                case '2': persentasePenerimaan = 70; break;
                case '3': persentasePenerimaan = 65; break;
                case '4':
                case '5':
                case '6':
                case '7':
                case '8': persentasePenerimaan = 60; break;
            }
            hargaPenerimaan = (hargaHariIni * persentasePenerimaan) / 100;
        }
        
        // Di sini Anda bisa menambahkan kode untuk menampilkan hasil
        resultsHTML += `
            <div class="result-item ${index !== rows.length - 1 ? 'border-bottom mb-3 pb-3' : ''}">
                <h6 class="fw-bold">Data ${index + 1}</h6>
                <div class="row">
                    <div class="col-12">
                        <p class="mb-2"><strong>Kadar:</strong> ${kadar}</p>
                        <p class="mb-2"><strong>Kondisi:</strong> ${row.querySelector('select[name="kondisiBarang"] option:checked').text}</p>
                        <p class="mb-2"><strong>Persentase Penerimaan:</strong> ${persentasePenerimaan}%</p>
                        <p class="mb-0"><strong>Harga Penerimaan:</strong> Rp ${hargaPenerimaan.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>
        `;
    // Display results
    const resultsContainer = document.getElementById('results');
    if (resultsContainer) {
        resultsContainer.innerHTML = resultsHTML;
    }
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
                    <select id="kondisiBarang" name="kondisiBarang" class="form-select form-select-sm" required>
                      <option value="" disabled selected>Pilih Kondisi Barang</option>
                      <option value="1">Mengkilap, Mulus, Banyak Peminat</option>
                      <option value="2">Mengkilap, Sedikit Baret, Banyak Peminat</option>
                      <option value="3">Sedikit Kusam, Sedikit Baret, Banyak Peminat</option>
                      <option value="4">Sedikit Kusam,Banyak Baret, Banyak Peminat</option>
                      <option value="5">Kusam, Sedikit Baret, Banyak Peminat</option>
                      <option value="6">Kusam, Banyak Baret, Banyak Peminat</option>
                      <option value="7">Sedikit Kusam, Sedikit Baret, Sedikit Peminat</option>
                      <option value="8">Kusam, Banyak Baret, Sedikit Peminat</option>
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