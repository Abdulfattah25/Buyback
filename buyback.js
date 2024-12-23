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
        // Kasus khusus ketika harga beli > 93% harga hari ini
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
        // Kasus normal
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

    // Tampilkan hasil
    alert(`Persentase Penerimaan: ${persentasePenerimaan}%\nHarga Penerimaan: Rp ${hargaPenerimaan.toLocaleString('id-ID')}`);
});