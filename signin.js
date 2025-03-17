document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon'); // Get the icon element

    // Load theme preference from local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-sun'); // Change icon to moon if dark mode
        themeIcon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);

        // Toggle icon
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Add event listener to the sign-in form (for demonstration)
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log('Email:', email, 'Password:', password); // Log for demonstration
        // In a real application, you would send this data to your server
    });

    // Add hrefs to social sign-in buttons (replace # with actual URLs)
    document.querySelector('.google-signin').href = '#google-signin';
    document.querySelector('.outlook-signin').href = '#outlook-signin';
    document.querySelector('.email-signin').href = '#email-signin';
});

document.getElementById('google-signin').addEventListener('click', function() {
    // Redirect to Google OAuth login
    window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email profile';
});

document.getElementById('outlook-signin').addEventListener('click', function() {
    // Redirect to Microsoft OAuth login
    window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_MICROSOFT_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URI&scope=openid profile email';
});