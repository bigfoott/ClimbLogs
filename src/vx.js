var vxModal;
var vxModalInner;

function populateVX()
{
    vxContainer.innerHTML = "";
    climbGrades.forEach((c) =>
    {
        if (vx_settings.visible.includes(c.name))
        {
            vxContainer.innerHTML += `<div class="column is-half-touch is-one-quarter-desktop" id="vx-container">
                <a onclick="vxClick('${c.name}')" class="button vx" style="background-color: var(--vx-${c.category})">${c.name}</a></div>`;
        }
    });

    if (vxModal == null)
    {
        vxModal = document.getElementById("vx-modal");
        vxModalInner = document.getElementById("vx-modal-inner");
    }
}

function vxClick(name)
{
    console.log(sessionRunning)
    if (sessionRunning)
    {
        vxModalInner.innerHTML = `<a onclick="vxClickAdd('${name}', true)" class="button vx" style="background-color: green;">SENT</a>
                                  <a onclick="vxClickAdd('${name}', false)" class="button vx" style="background-color: cyan;">ATTEMPTED</a>`;
        vxModal.classList.add("is-active");
    }
}

function vxClickAdd(name, sent)
{
    if (sent)
    {
        currentSession.sends.push({grade: name, date: new Date()})
    }
    else
    {
        currentSession.attempts.push({grade: name, date: new Date()})
    }
    
    saveExistingSession();
    closeVXModal();
}

function closeVXModal()
{
    vxModal.classList.remove("is-active")
}