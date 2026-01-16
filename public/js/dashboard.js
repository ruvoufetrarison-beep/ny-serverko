function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'members') loadMembers();
}

async function loadMembers() {
    const listDiv = document.getElementById('memberList');
    try {
        const res = await fetch('/api/members');
        const data = await res.json();
        if (data.length === 0) {
            listDiv.innerHTML = "<p>Tsy misy mpikambana hita.</p>";
            return;
        }
        listDiv.innerHTML = data.map(m => `
            <div class="member-card">
                <strong>${m.username}</strong><br>
                <small>${m.mmm_id || 'Tsy misy ID'}</small>
            </div>
        `).join('');
    } catch (e) {
        listDiv.innerHTML = "<p style='color:red;'>Fahadisoana teo am-pangalana ny lisitra.</p>";
    }
}

function sendMsg() {
    const msg = document.getElementById('msgInput').value;
    if(!msg) return alert("Soraty aloha ny hafatra!");
    alert("Nalefa ny hafatra: " + msg);
    document.getElementById('msgInput').value = "";
}

function logout() {
    window.location.href = "/logout";
}

