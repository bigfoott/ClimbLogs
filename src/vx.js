function populateVX()
{
    vxContainer.innerHTML = "";
    climbGrades.forEach((c) =>
    {
        if (vx_settings.visible.includes(c.name))
        {
            vxContainer.innerHTML += `<div class="column is-half-touch is-one-quarter-desktop" id="vx-container">
                <a class="button vx" style="background-color: var(--vx-${c.category})">${c.name}</a></div>`;
        }
    });
}