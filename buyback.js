document.getElementById('penerimaanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai input
    const kondisiBarang = document.getElementById('kondisiBarang').value;
    const skalaBarang = document.getElementById('skalaBarang').value;
    const hargaBeli = parseFloat(document.getElementById('hargaBeli').value);
    const hargaHariIni = parseFloat(document.getElementById('hargaHariIni').value);

    // Hitung persentase harga beli terhadap harga hari ini
    const persentaseBeli = (hargaBeli / hargaHariIni) * 100;

    let persentasePenerimaan;

    // Logika untuk menentukan persentase penerimaan
    if (persentaseBeli > 93) {
        switch(kondisiBarang) {
            case 'Sangat Bagus':
                if (skalaBarang === '1') persentasePenerimaan = 99;
                else if (skalaBarang === '2') persentasePenerimaan = 98;
                else persentasePenerimaan = 96;
                break;
            case 'Sedang':
                if (skalaBarang === '1') persentasePenerimaan = 95;
                else if (skalaBarang === '2') persentasePenerimaan = 94;
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
                persentasePenerimaan = 78;
                break;
        }
    }

    // Hitung harga penerimaan
    const hargaPenerimaan = (hargaHariIni * persentasePenerimaan) / 100;

    // Tampilkan hasil dalam modal Bootstrap
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = `
        <div class="row">
            <div class="col-12">
                <p class="mb-2"><strong>Persentase Penerimaan:</strong> ${persentasePenerimaan}%</p>
                <p class="mb-0"><strong>Harga Penerimaan:</strong> Rp ${hargaPenerimaan.toLocaleString('id-ID')}</p>
            </div>
        </div>
    `;
    
    // Tampilkan modal
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
});