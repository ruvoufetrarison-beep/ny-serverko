document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return window.location.href = "/";
    
    document.getElementById('uName').innerText = user.username;
    document.getElementById('uId').innerText = user.mmm_id;
    document.getElementById('uSolfo').innerText = (user.solfo || 0).toLocaleString();
});

function openM(id) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(id).classList.add('active');
    if(id === 'mbr') fetchMembers();
}

function closeM() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

function toggleF(el) {
    const ans = el.nextElementSibling;
    ans.style.display = ans.style.display === 'block' ? 'none' : 'block';
}

async function fetchMembers() {
    const res = await fetch('/api/members');
    const data = await res.json();
    document.getElementById('listM').innerHTML = data.map(m => `
        <div style="padding:15px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <div style="font-weight:bold; color:#333;">${m.username}</div>
                <div style="font-size:0.7rem; color:gray;">ID: ${m.mmm_id}</div>
            </div>
            <div style="color:var(--gold); font-weight:bold;">${m.solfo || 0} Ar</div>
        </div>
    `).join('');
}

function hivoaka() {
    localStorage.clear();
    window.location.href = "/";
}

