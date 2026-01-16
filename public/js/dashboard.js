function showSection(id) {
    // Afeno ny section rehetra
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    // Asehoy ilay voafidy
    document.getElementById(id).style.display = 'block';
    
    if(id === 'members') loadMembers();
}

async function loadMembers() {
    const res = await fetch('/api/members');
    const data = await res.json();
    const list = document.getElementById('memberList');
    list.innerHTML = data.map(m => `<li><strong>${m.username}</strong> (${m.mmm_id})</li>`).join('');
}

function sendMsg() {
    alert("Nalefa ny hafatry! (Hamboarintsika ny server handray izany avy eo)");
}

