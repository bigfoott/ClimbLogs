var vx_settings;

function onLoadSettings()
{
    navBurger = document.getElementById("nav-burger");
    navMenu = document.getElementById("nav-menu");

    loadSettings();

    var vxSettings = document.getElementById("vx-settings");
    vxSettings.innerHTML = "";

    climbGrades.forEach((c) =>
    {
        vxSettings.innerHTML += `<div class="column is-2-mobile is-1-desktop"><label class="checkbox"><input type="checkbox" ${vx_settings.visible.includes(c.name) ? "checked" : ""} onclick="toggleVX('${c.name}')"> ${c.name}</label></div>`;
    });
}

function loadSettings()
{
    vx_settings = JSON.parse(localStorage.getItem("vx_settings"));
    if (vx_settings == null)
    {
        vx_settings = {
            "visible": ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17"],
            "hidden": []
        };

        saveSettings();
    }
    return vx_settings;
}
function saveSettings()
{
    localStorage.setItem("vx_settings", JSON.stringify(vx_settings));
}

function toggleVX(name)
{
    if (vx_settings.visible.includes(name))
    {
        vx_settings.visible.splice(vx_settings.visible.indexOf(name), 1);
        vx_settings.hidden.push(name);
    }
    else
    {
        
        vx_settings.hidden.splice(vx_settings.hidden.indexOf(name), 1);
        vx_settings.visible.push(name);
    }

    saveSettings();
}