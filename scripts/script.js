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