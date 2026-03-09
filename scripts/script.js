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
        holder.innerHTML = ""; // clear existing cards

        issues.forEach(issue => {
            createCard(issue);
        });

    } catch (error) {
        console.log("Error fetching issues:", error);
    }
}



function createCard(issue) {

    const holder = document.getElementById("cardHolder");

    const card = document.createElement("div");

    card.className = "card bg-base-100 shadow-sm p-4 border-t-4 border-green-600";

    card.innerHTML = `
        <div class="flex items-center justify-between">

            <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
                <img src="assets/Open-Status.png" class="w-full h-full object-cover">
            </div>

            <div class="badge badge-soft badge-secondary w-20">
                ${issue.priority.toUpperCase()}
            </div>

        </div>

        <div class="mt-3">

            <h2 class="card-title">
                ${issue.title}
            </h2>

            <p class="text-[#64748B] mt-2">
                ${issue.description}
            </p>

            <div class="card-actions mt-3">
                ${issue.labels.map(label =>
        `<div class="badge badge-outline">${label.toUpperCase()}</div>`
    ).join("")}
            </div>

            <div class="border-t border-[#E4E4E7] text-[#64748B] text-[12px] pt-4 flex flex-col gap-2 mt-3">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>

        </div>
    `;

    holder.appendChild(card);
}


//comment at last
//will use it at login
loadIssues();