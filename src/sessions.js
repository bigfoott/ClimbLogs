var sessionHistory;
var sessionRunning;
var currentSession;

var lastSessionContainer;

var climbGradesEmoji = {};
climbGradesEmoji["V0"] = "🟩";
climbGradesEmoji["V1"] = "🟩";
climbGradesEmoji["V2"] = "🟩";
climbGradesEmoji["V3"] = "🟨";
climbGradesEmoji["V4"] = "🟨";
climbGradesEmoji["V5"] = "🟨";
climbGradesEmoji["V6"] = "🟨";
climbGradesEmoji["V7"] = "🟥";
climbGradesEmoji["V8"] = "🟥";
climbGradesEmoji["V9"] = "🟥";
climbGradesEmoji["V10"] = "🟪";
climbGradesEmoji["V11"] = "🟪";
climbGradesEmoji["V12"] = "🟪";
climbGradesEmoji["V13"] = "🟪";
climbGradesEmoji["V14"] = "🟫";
climbGradesEmoji["V15"] = "🟫";
climbGradesEmoji["V16"] = "🟫";
climbGradesEmoji["V17"] = "🟫";

function session(id, date) {
    this.id = id;
    this.date = date;
    this.sends = [];
    this.attempts = [];
}

function loadSessionHistory()
{
    sessionHistory = JSON.parse(localStorage.getItem("sessionHistory"));
    if (sessionHistory == null)
    {
        sessionHistory = [];

        saveSessionHistory();
    }

    sessionRunning = localStorage.getItem("sessionRunning") == "TRUE";
    if (sessionRunning)
    {
        currentSession = JSON.parse(localStorage.getItem("currentSession"));
    }
}

function saveSessionHistory()
{
    localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
}

function initializeSession()
{
    var newID = 1;
    if (localStorage.getItem("sessionID") != null)
    {
        newID = parseInt(localStorage.getItem("sessionID")) + 1;
    }
    localStorage.setItem("sessionID", newID);

    currentSession = new session(newID, new Date());

    saveExistingSession();
}

function saveExistingSession()
{
    localStorage.setItem("currentSession", JSON.stringify(currentSession));
}

function loadExistingSession()
{
    currentSession = JSON.parse(localStorage.getItem("currentSession"));
}

function populateLastSession()
{
    if (lastSessionContainer == null)
    {
        lastSessionContainer = document.getElementById("last-session");
    }

    if (sessionHistory.length == 0) return;

    var last = sessionHistory[sessionHistory.length - 1];

    console.log(last);

    var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    var grouped = [];
    var groupedGrades = [];

    last.sends.forEach(climb => {
        if (climb.grade in grouped)
        {
            grouped[climb.grade].sends++;
        }
        else
        {
            grouped[climb.grade] = { sends: 1, attempts: 0 };
            groupedGrades.push(climb.grade);
        }
    });

    last.attempts.forEach(climb => {
        if (climb.grade in grouped)
        {
            grouped[climb.grade].attempts++;
        }
        else
        {
            grouped[climb.grade] = { sends: 0, attempts: 1 };
            groupedGrades.push(climb.grade);
        }
    });
    
    groupedGrades.sort();

    var lastSessionHTML = `<div class="has-text-centered"><p>${new Date(last.date).toLocaleString("en-US", dateOptions)}</p></div>
        <div class="table-container"><table class="table is-striped is-fullwidth"><thead><tr><th>Grade</th><th>Sends</th><th>Attempts</th></tr></thead><tbody>`;
    
    groupedGrades.forEach(grade => {
        lastSessionHTML += `<tr><td>${grade}</td><td>${grouped[grade].sends}</td><td>${grouped[grade].sends + grouped[grade].attempts}</td></tr>`;
    });

    lastSessionHTML += `</tbody></table></div>`;

    lastSessionContainer.innerHTML = lastSessionHTML;
}

const copyStats = async () => {
    var last = sessionHistory[sessionHistory.length - 1];

    var grouped = [];
    var groupedGrades = [];

    last.sends.forEach(climb => {
        if (climb.grade in grouped)
        {
            grouped[climb.grade].sends++;
        }
        else
        {
            grouped[climb.grade] = { sends: 1, attempts: 0 };
            groupedGrades.push(climb.grade);
        }
    });

    last.attempts.forEach(climb => {
        if (climb.grade in grouped)
        {
            grouped[climb.grade].attempts++;
        }
        else
        {
            grouped[climb.grade] = { sends: 0, attempts: 1 };
            groupedGrades.push(climb.grade);
        }
    });
    
    groupedGrades.sort();

    var text = "🧗 Climbing stats for " + new Date(last.date).toLocaleDateString();

    var totalSends = totalAttempts = 0;

    groupedGrades.forEach(grade => {
        text += `\n${climbGradesEmoji[grade]} ${grade} - ${grouped[grade].sends}/${grouped[grade].sends + grouped[grade].attempts} climbs sent`;
    });
    
    try {
      await navigator.clipboard.writeText(text);
      console.log(text)
    } catch (err) {
      console.error('Failed to copy stats: ', err);
    }
}