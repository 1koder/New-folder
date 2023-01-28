const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId);//Clears timeout for the toast
    setTimeout(() => toast.remove(), 500);
}

const createToast = (id) => {
    //Below code gets the icon and text for the toast based on id passed
    const {icon, text} = toastDetails[id];
    //Creates a new 'li' element for the toast
    const toast = document.createElement("li");
    //Setting the class name for the toast
    toast.className = `toast ${id}`;
    //Setting the Inner HTML for the Toast
    toast.innerHTML =  `<div class="column">
                            <i class="fa-solid ${icon}"></i>
                            <span>${text}</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    //Append the Toast to the notifications ul                    
    notifications.appendChild(toast);
    //Setting a timer to remove Toast after 5s
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}
//Adding a click event listener to each button to create a toast when clicked
buttons.forEach(btn => {
    btn.addEventListener("click", () => createToast(btn.id));
});
//At this stage, the issue we had was that
//Each click was giving us the Success Toast but CSS was maintained.
const toastDetails = {
    timer: 5000,
    success: {
        icon: "fa-circle-check",
        text: "Success: This is a success toast."
    },
    error: {
        icon: "fa-circle-xmark",
        text: "Error: This is an error toast."
    },
    warning: {
        icon: "fa-triangle-exclamation",
        text: "Warning: This is a warning toast."
    },
    info: {
        icon: "fa-circle-info",
        text: "Info: This is an information toast."
    }
}