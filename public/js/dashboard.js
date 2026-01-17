document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
        document.getElementById('userName').innerText = userData.username;
        document.getElementById('mmmId').innerText = userData.mmm_id;
    } else { window.location.href = "/"; }
});

function show(id) {
    document.querySelectorAll('.box').forEach(b => b.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'mbr') fetchM();
}

async function fetchM() {
    const res = await fetch('/api/members');
    const members = await res.json();
    document.getElementById('list').innerHTML = members.map(m => `
        <div style="padding:10px; border-bottom:1px solid #eee;">
            <strong>${m.username}</strong> (${m.mmm_id})
        </div>`).join('');
}

function hivoaka() { localStorage.removeItem('user'); window.location.href = "/"; }

