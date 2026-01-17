document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('user'));
    if(data) {
        document.getElementById('userName').innerText = data.username;
        document.getElementById('mmmId').innerText = data.mmm_id;
    }
});

function showSec(id) {
    document.querySelectorAll('.box').forEach(b => b.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'mbr') fetchMembers();
}

async function fetchMembers() {
    const res = await fetch('/api/members');
    const members = await res.json();
    document.getElementById('list').innerHTML = members.map(m => 
        `<div style="border-bottom:1px solid #eee; padding:10px;">${m.username} (${m.mmm_id})</div>`
    ).join('');
}

