const buttons = document.querySelectorAll(".scroll-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.target);
        const amount = target.clientWidth * 1.01

        if (btn.classList.contains("left")) {
            target.scrollLeft -= amount;
        } else {
            target.scrollLeft += amount;
        }
    });
});
