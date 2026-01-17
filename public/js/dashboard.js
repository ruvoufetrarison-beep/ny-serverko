document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) return window.location.href = "/";
    document.getElementById('uName').innerText = user.username;
    document.getElementById('uId').innerText = user.mmm_id;
    document.getElementById('uSolfo').innerText = (user.solfo || 0).toLocaleString();
});
function openM(id) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(id).classList.add('active');
    if(id === 'mbr') fetchM();
}
function closeM() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}
async function fetchM() {
    const res = await fetch('/api/members');
    const data = await res.json();
    document.getElementById('listM').innerHTML = data.map(m => `
        <div style="padding:10px; border-bottom:1px solid #eee;">
            <b>${m.username}</b> (${m.mmm_id})
        </div>
    `).join('');
}
function hivoaka() { localStorage.clear(); window.location.href = "/"; }

