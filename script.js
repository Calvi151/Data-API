function searchBooks() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!query) {
    resultsDiv.innerText = 'Masukkan judul buku terlebih dahulu.';
    return;
  }

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.docs.length === 0) {
        resultsDiv.innerText = 'Buku tidak ditemukan.';
        return;
      }

      data.docs.slice(0, 10).forEach(buku => {
        const div = document.createElement('div');
        div.className = 'buku';
       div.innerHTML = `
        <strong>Judul:</strong> ${buku.title}<br>
        <strong>Penulis:</strong> ${buku.author_name ? buku.author_name.join(', ') : 'Tidak diketahui'}<br>
        ${buku.cover_i 
            ? `<img src="https://covers.openlibrary.org/b/id/${buku.cover_i}-M.jpg" alt="Cover buku" style="height: 150px;">`
            : '<em>(Sampul tidak tersedia)</em>'}
        `;

        resultsDiv.appendChild(div);
      });
    })
    .catch(error => {
      resultsDiv.innerText = 'Gagal mengambil data dari API.';
      console.error(error);
    });
}
