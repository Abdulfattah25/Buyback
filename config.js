function saveConfig() {
    const config = {
        sangatBagus: {
            skala1: document.getElementById('sangatBagusSkala1').value,
            skala2: document.getElementById('sangatBagusSkala2').value,
            skala3: document.getElementById('sangatBagusSkala3').value
        },
        sedang: {
            skala1: document.getElementById('sedangSkala1').value,
            skala2: document.getElementById('sedangSkala2').value
        },
        kurangBagus: document.getElementById('kurangBagus').value
    };

    localStorage.setItem('penerimaanConfig', JSON.stringify(config));
    alert('Konfigurasi berhasil disimpan!');
}

// Load saved config when page loads
window.addEventListener('load', () => {
    const savedConfig = localStorage.getItem('penerimaanConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        document.getElementById('sangatBagusSkala1').value = config.sangatBagus.skala1;
        document.getElementById('sangatBagusSkala2').value = config.sangatBagus.skala2;
        document.getElementById('sangatBagusSkala3').value = config.sangatBagus.skala3;
        document.getElementById('sedangSkala1').value = config.sedang.skala1;
        document.getElementById('sedangSkala2').value = config.sedang.skala2;
        document.getElementById('kurangBagus').value = config.kurangBagus;
    }
});