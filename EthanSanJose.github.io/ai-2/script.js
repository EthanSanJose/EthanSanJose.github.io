
const modal = document.getElementById("artifactModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const modalAction = document.getElementById("modalAction");

const artifactButtons = document.querySelectorAll(".open-modal");

let previousFocusedElement = null;


// OPEN MODAL
function openModal(button) {
    previousFocusedElement = document.activeElement;

    const title = button.dataset.title;
    const description = button.dataset.description;
    const image = button.dataset.image;

    const actionType = button.dataset.action;
    const actionLabel = button.dataset.actionLabel;
    const actionUrl = button.dataset.actionUrl;

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modalImage.src = image;
    modalImage.alt = title;

    modalAction.textContent = actionLabel;
    modalAction.href = actionUrl;

    // Configure the action button based on artifact type
    modalAction.removeAttribute("download");
    modalAction.removeAttribute("target");
    modalAction.removeAttribute("rel");

    if (actionType === "download") {
        modalAction.setAttribute("download", "");
    }

    if (actionType === "external") {
        modalAction.setAttribute("target", "_blank");
        modalAction.setAttribute("rel", "noopener noreferrer");
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    modalClose.focus();
}


// CLOSE MODAL
function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }
}


// ARTIFACT BUTTON EVENTS
artifactButtons.forEach(button => {
    button.addEventListener("click", () => {
        openModal(button);
    });
});


// CLOSE BUTTON
modalClose.addEventListener("click", closeModal);


// CLOSE WHEN CLICKING OUTSIDE MODAL CONTENT
modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});


// CLOSE WITH ESCAPE KEY
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});
