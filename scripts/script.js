//login section
const login = () => {
    const username = document.getElementById("userName").value.trim();
    const password = document.getElementById("password").value.trim();

    // Default credentials
    const defaultUser = "admin";
    const defaultPass = "admin123";

    const loginForm = document.getElementById("loginform");

    if (username === defaultUser && password === defaultPass) {
        alert("✅ Login successful!");
        loginForm.classList.add("hidden");
    } else {
        alert("❌ Invalid credentials. Please try again.");
    }
};

document.getElementById("signIn").addEventListener("click", login);



// main page section 
// Get references
// const card = document.getElementById("issue_card");
// const modal = document.getElementById("issue_details");

// // Open modal on card click
// card.addEventListener("click", () => {
//     modal.showModal();
// });


async function loadIssues() {
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const result = await res.json();

        const issues = result.data;

        const holder = document.getElementById("cardHolder");
        holder.innerHTML = "";

        issues.forEach(issue => {
            createCard(issue);
        });

    } catch (error) {
        console.log("Error fetching issues:", error);
    }
}



function createCard(issue) {

    const holder = document.getElementById("cardHolder");

    // priority badge style

    let priorityBadge = "";

    if (issue.priority === "high") {
        priorityBadge = `<div class="badge badge-soft badge-error">HIGH</div>`;
    }
    else if (issue.priority === "medium") {
        priorityBadge = `<div class="badge badge-soft badge-warning">MEDIUM</div>`;
    }
    else if (issue.priority === "low") {
        priorityBadge = `<div class="badge badge-ghost">LOW</div>`;
    }

    // stat style
    let borderColor = "border-green-600";
    let statusHTML = `
        <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
            <img src="assets/Open-Status.png" class="w-full h-full object-cover">
        </div>
    `;

    if (issue.status === "closed") {
        borderColor = "border-[#A855F7]";
        statusHTML = `
        <div class="w-6 h-6 rounded-full bg-[#A855F7] flex items-center justify-center overflow-hidden">
            <img src="assets/Closed- Status .png" class="w-full h-full object-cover">
        </div>
        `;
    }

    // label style
    const labelHTML = issue.labels.map(label => {

        if (label === "bug") {
            return `
            <div class="badge badge-error">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"></path></g></svg>
                BUG
            </div>
            `;
        }

        if (label === "help wanted") {
            return `
            <div class="badge badge-warning">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g fill="currentColor"><path d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><line x1="9" y1="6.5" x2="9" y2="10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><path d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"></path></g></svg>
                HELP WANTED
            </div>
            `;
        }

        if (label === "enhancement") {
            return `
            <div class="badge badge-success">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-width="2"></polyline></g></svg>
                ENHANCEMENT
            </div>
            `;
        }



    }).join("");

    const card = document.createElement("div");

    card.className = `card bg-base-100 shadow-sm p-4 border-t-4 ${borderColor}`;

    card.innerHTML = `
        <div class="flex items-center justify-between">
            ${statusHTML}
            ${priorityBadge}
        </div>

        <div class="mt-3">
            <h2 class="card-title">${issue.title}</h2>

            <p class="text-[#64748B] mt-2">
                ${issue.description.slice(0, 80)}...
            </p>

            <div class="card-actions mt-3">
                ${labelHTML}
            </div>

            <div class="border-t border-[#E4E4E7] text-[#64748B] text-[12px] pt-4 flex flex-col gap-2 mt-3">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    `;

    card.addEventListener("click", () => {
        openIssueModal(issue.id);
    });

    holder.appendChild(card);
}


//modal related
async function openIssueModal(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const result = await res.json();

    const issue = result.data;

    populateModal(issue);

    const modal = document.getElementById("issue_details");
    modal.showModal();
}

function populateModal(issue) {

    document.getElementById("modal_title").textContent = issue.title;

    document.getElementById("modal_author").textContent =
        `Opened by ${issue.author}`;

    document.getElementById("modal_date").textContent =
        new Date(issue.createdAt).toLocaleDateString();

    document.getElementById("modal_description").textContent =
        issue.description;

    document.getElementById("modal_assignee").textContent =
        issue.assignee || "Unassigned";


    // STATUS
    let statusHTML = "";

    if (issue.status === "open") {
        statusHTML = `<div class="badge badge-success">Open</div>`;
    }
    else {
        statusHTML = `<div class="badge badge-secondary">Closed</div>`;
    }

    document.getElementById("modal_status").innerHTML = statusHTML;


    // PRIORITY
    let priorityHTML = "";

    if (issue.priority === "high") {
        priorityHTML = `<div class="badge badge-error">High</div>`;
    }
    else if (issue.priority === "medium") {
        priorityHTML = `<div class="badge badge-warning">Medium</div>`;
    }
    else {
        priorityHTML = `<div class="badge badge-ghost">Low</div>`;
    }

    document.getElementById("modal_priority").innerHTML = priorityHTML;


    // LABELS
    const labelContainer = document.getElementById("modal_labels");

    labelContainer.innerHTML = issue.labels.map(label => {

        if (label === "bug") {
            return `<div class="badge badge-outline badge-error">BUG</div>`;
        }

        if (label === "help wanted") {
            return `<div class="badge badge-outline badge-warning">HELP WANTED</div>`;
        }

        if (label === "enhancement") {
            return `<div class="badge badge-outline badge-success">ENHANCEMENT</div>`;
        }

    }).join("");

}

//comment at last
//will use it at login
loadIssues();