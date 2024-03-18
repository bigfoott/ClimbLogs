var historyTable;
var dhModal;
var dhModalInner;

function onLoadHistory()
{
    historyTable = document.getElementById("history-table");
    dhModal = document.getElementById("dh-modal");
    dhModalInner = document.getElementById("dh-modal-inner");

    loadSessionHistory();
    populateHistoryTable();
}

function populateHistoryTable()
{
    historyTable.innerHTML = "";
    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    sessionHistory.slice().reverse().forEach(session => {
        var date = new Date(session.date).toLocaleDateString("en-US", dateOptions);
        historyTable.innerHTML += `<tr><td>${session.id}</td><td>${date}</td><td>${session.sends.length}</td><td>${session.sends.length + session.attempts.length}</td><td><a onclick="deleteHistory(${session.id})" class="button" style="color: black"><i class="gg-trash"></i></a></td></tr>`
    });
}

function closeDeleteHistoryModal()
{
    dhModal.classList.remove("is-active")
}

function deleteHistory(id)
{
    dhModal.classList.add("is-active")
    dhModalInner.innerHTML = `<a class="button is-danger" onclick="confirmDeleteHistory(${id})">Confirm deletion of session '${id}'?</a>`
}


function confirmDeleteHistory(id)
{
    sessionHistory = sessionHistory.filter(session => session.id !== id);
    saveSessionHistory();
    closeDeleteHistoryModal();
    populateHistoryTable();
}