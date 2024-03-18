var vxContainer;
var mainContainer;

var navBurger;
var navMenu;
var endSessionButton;

var climbGrades = [
    { "name": "V0", "category": "beginner" },
    { "name": "V1", "category": "beginner" },
    { "name": "V2", "category": "beginner" },
    { "name": "V3", "category": "intermediate" },
    { "name": "V4", "category": "intermediate" },
    { "name": "V5", "category": "intermediate" },
    { "name": "V6", "category": "intermediate" },
    { "name": "V7", "category": "advanced" },
    { "name": "V8", "category": "advanced" },
    { "name": "V9", "category": "advanced" },
    { "name": "V10", "category": "pro" },
    { "name": "V11", "category": "pro" },
    { "name": "V12", "category": "pro" },
    { "name": "V13", "category": "pro" },
    { "name": "V14", "category": "insane" },
    { "name": "V15", "category": "insane" },
    { "name": "V16", "category": "insane" },
    { "name": "V17", "category": "insane" }
];

function onLoad()
{
    vxContainer = document.getElementById("vx-container");
    mainContainer = document.getElementById("main-container");
    navBurger = document.getElementById("nav-burger");
    navMenu = document.getElementById("nav-menu");
    endSessionButton = document.getElementById("endsession-button");

    loadSettings();
    loadSessionHistory();

    if (localStorage.getItem("sessionRunning") == "TRUE")
    {
        loadExistingSession();
        startSession(false);
    }
    else
    {
        populateLastSession();
    }
}

function startSession(first = true)
{
    populateVX();
    mainContainer.style.display = "none";
    endSessionButton.style.display = "block";
    document.getElementById("last-stats-container").style.display = "none";
    sessionRunning = true;

    if (first)
    {
        localStorage.setItem("sessionRunning", "TRUE");
        initializeSession();
    }
}

function endSession()
{
    vxContainer.innerHTML = "";
    mainContainer.style.display = "block";
    endSessionButton.style.display = "none";
    document.getElementById("last-stats-container").style.display = "block";
    
    sessionRunning = false;
    localStorage.setItem("sessionRunning", "FALSE");

    sessionHistory.push(currentSession);
    saveSessionHistory();
    currentSession = [];

    populateLastSession();
}