document.querySelectorAll(".select-wrapper").forEach(wrapper => {
    const select = wrapper.querySelector("select");
    const arrow = wrapper.querySelector(".arrow");

    let abierto = false;

    select.addEventListener("click", () => {
        abierto = !abierto;

        if (abierto) {
            arrow.style.transform = "translateY(-50%) rotate(180deg)";
        } else {
            arrow.style.transform = "translateY(-50%) rotate(0deg)";
        }
    });

    select.addEventListener("blur", () => {
        abierto = false;
        arrow.style.transform = "translateY(-50%) rotate(0deg)";
    });
});

