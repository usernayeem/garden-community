# Garden Community (Client)

## Overview

A React-based community platform where gardening enthusiasts can share tips, discover local gardeners, and connect over shared interests like composting, hydroponics, and balcony gardening.  
This repository contains the client-side React application.

Live Preview:  
https://gardencommunity-5eab2.web.app

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technology Used](#technology-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Testing](#testing)
- [License](#license)
- [Contact / Support](#contact--support)

---

## Project Description

Garden Community (Client) is a responsive ReactJS web application for gardeners to share knowledge, browse community tips, connect based on interests, and build local gardening networks. It emphasizes usability, clean navigation, and a friendly UI with theme support.  
The client integrates Firebase for authentication and interacts with client-side or external APIs for content as configured.

---

## Features

- **Modern Responsive Design:** Fully responsive layout powered by Tailwind CSS utility classes.
- **Routing:** Client-side navigation with React Router.
- **Authentication:** Email/password and Google sign-in via Firebase Authentication.
- **User Profiles:** Dedicated profiles showcasing experience, shared tips, and interests.
- **Tips Browsing and Filtering:** Explore community-submitted gardening tips with difficulty/category filters.
- **Create, Like, and Interact:** Post tips (if authorized), like tips, and see live like counts with toast feedback.
- **Theme Toggle:** Built-in dark/light mode for a personalized experience.
- **Accessibility:** Focus states and semantic markup considerations.
- **Smooth UI Feedback:** Toasts and modals for success/error states.
- **Security Best Practices:** Sensitive keys (Firebase, etc.) are secured with environment variables.

---

## Technology Used

- **React** — Frontend library for building user interfaces
- **React Router DOM** — Declarative routing for React applications
- **Firebase Authentication** — Email/Password and Google sign-in
- **Tailwind CSS** — Utility-first styling with @tailwindcss/vite for Vite
- **DaisyUI** — Component and theme utilities for Tailwind
- **React Toastify** — Non-blocking notifications
- **React Slick + Slick Carousel** — Carousels/sliders for featured content
- **SweetAlert2** — Polished modal dialogs for confirmations and alerts
- **Vite** — Fast development server and build tooling

---

## Installation

### Prerequisites

- [Git](https://git-scm.com/) (to clone the repository)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for dependency management)
- A modern web browser (Chrome, Edge, Firefox, Safari, etc.)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/usernayeem/garden-community.git
   ```

2. Navigate to the project directory:
   ```bash
   cd garden-community
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create and configure environment variables (see Configuration).

5. Run locally:
   ```bash
   npm run dev
   ```
   The development server will start and the app will be available at `http://localhost:5173`.

---

## Usage

- **Sign In / Sign Up:** Authenticate via Email/Password or Google to access community features.
- **Browse Tips:** Explore gardening tips; use filters (e.g., difficulty) to find relevant content.
- **Post & Interact:** Create new tips (if enabled), like posts, and view updated like counts in real time.
- **Profiles:** View gardener profiles to see experience, shared tips, and interests.
- **Theme:** Toggle between dark and light modes from the UI.

Tips:
- Look for toast notifications confirming actions like login, registration, posting, and likes.
- Use the navigation bar to move between pages (home, tips, profile, etc.).

---

## Configuration

Create a `.env` file in the project root with the following environment variables. Replace placeholder values with your own:

```env
# Optional API base (only if you use a separate backend)
VITE_API_BASE_URL=https://your-api.example.com

# Firebase (required for authentication)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

**Styling:**
- Tailwind CSS is configured via the Vite plugin (`@tailwindcss/vite`) and Tailwind v4.
- DaisyUI can be enabled/configured through your Tailwind setup for themes and components.

---

## Contributing

Contributions are welcome! If you would like to contribute to this project, follow these steps:

1. **Fork the Repository**:

   - Navigate to the repository you want to contribute to.
   - Click the **Fork** button in the upper right corner to create a personal copy of the project in your GitHub account.

2. **Clone the Forked Repository**:

   - Open your forked repository on GitHub.
   - Click the "Code" button to get the HTTPS or SSH URL of your forked repository.
   - Open your terminal or command prompt.
   - Use the `git clone` command followed by the URL you copied to clone the repository to your local machine:

     ```bash
     git clone https://github.com/yourusername/garden-community.git
     ```

     Replace `yourusername` with your own Github username.

   - Navigate into the cloned repository directory:
     ```bash
     cd garden-community
     ```

3. **Create a New Branch**: Switch to a new branch where you'll make your changes. You can do this using the following command:

   ```bash
   git checkout -b my-branch
   ```

   Replace `my-branch` with a branch name that describes your work.

4. **Make Your Changes**: Make the necessary changes to the codebase. You can add, modify, or delete files as needed.

5. **Stage Your Changes**: You can use `git add <filename>` to stage specific files or `git add .` to stage all changes.

   ```bash
   git add .
   ```

6. Commit Your Changes: Commit your staged changes with a descriptive message. Follow the imperative style for commit messages (e.g., “Fix bug” instead of “Fixed bug”). For example:

   ```bash
   git commit -m "my commit message"
   ```

   Replace `my commit message` with a meaningful message for your commit.

7. **Push to Your Branch**: Push your changes to the branch you created:

   ```bash
   git push -u origin my-branch
   ```

   Replace `my-branch` with your branch name.

8. **Submit a Pull Request**:
   - Navigate to your forked repository on GitHub.
   - Click the "Compare & pull request" button.
   - Review the changes you're proposing and ensure they are accurate.
   - Add a descriptive title and a detailed description of your contribution.
   - Click the "Create pull request" button to submit your contribution for review.

---

## Testing

- **Automated Testing:**  
  The project can use Vitest and React Testing Library for unit and component testing (if configured).

- **Run Tests:**
  ```bash
  npm test
  ```

- **For manual testing:**
  - Open the app in different browsers and devices.
  - Test authentication flows (email/password, Google).
  - Verify posting, liking, and filtering of tips.
  - Toggle dark/light mode and confirm persistence/behavior.
  - Check responsiveness on various screen sizes.
  - Verify routing and protected/authorized views (if any).
  - Test keyboard navigation and basic accessibility (focus states, ARIA where applicable).

---

## License

This project is licensed under the [MIT](LICENSE) License.

---

## Contact / Support

  - **Author:** [Md Nayeem](https://www.github.com/usernayeem)
- **Repository**: https://github.com/usernayeem/garden-community
- **Issues:** Please use the [GitHub Issues page](https://github.com/usernayeem/garden-community/issues) for bug reports or feature requests.
