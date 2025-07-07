# Ollaix UI 🤖

**Ollaix** is a modern chatbot-style web interface built with React, TypeScript, Vite, Tailwind CSS, and DaisyUI. Inspired by the ChatGPT user experience, this app enables users to interact with a smart assistant through a clean, responsive, simple, fast and user-friendly.

---

## Demo 🚀

Experience Ollaix live here: [https://ollaix.macktireh.dev](https://ollaix.macktireh.dev)

---

## Features ✨

- 🗣️ **Interactive Chat:** Seamless conversations with a smart AI assistant.
- 💡 **Multiple AI Models:** Choose from various LLM models to tailor your interaction (e.g., Qwen3 4b, Deepseek R1 7b).
- 🔄 **Real-time Streaming:** Enjoy a responsive experience with real-time AI response streaming.
- 🌙 **Theme Switching:** Toggle between light and dark modes for comfortable viewing.
- 📋 **Code Highlighting:** Markdown code blocks are beautifully highlighted for readability.
- ✂️ **Copy Functionality:** Easily copy AI responses or code snippets to your clipboard.
- 🛑 **Stop Generation:** Option to interrupt ongoing AI responses.
- 🌐 **Multilingual Support:** Supports English and French.

---

## Tech Stack 🛠️

Ollaix is built with a modern and robust set of technologies:

- ⚛️ **React 19:** A declarative, component-based JavaScript library for building user interfaces.
- ⚡ **Vite:** A fast build tool that provides a lightning-fast development experience.
- 💨 **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- 💅 **DaisyUI:** A Tailwind CSS component library that simplifies UI development.
- 📚 **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- 🌍 **i18next & react-i18next:** Internationalization framework for adding multi-language support.
- 📝 **react-markdown & remark-gfm:** For rendering Markdown content with GitHub Flavored Markdown support.
- 🎨 **react-syntax-highlighter:** For syntax highlighting code blocks.
- Icons by [Lucide React](https://lucide.dev/icons/)

---

## Getting Started 🚀

Follow these steps to get Ollaix up and running on your local machine.

### Prerequisites ✅

Before you begin, ensure you have the following installed:

- **Node.js:** (LTS version recommended)
- **npm** or **Yarn:** (npm comes with Node.js)

#### 📦 Backend API Required

> \[!IMPORTANT]
> This frontend requires the [Ollaix API backend](https://github.com/Macktireh/ollaix) to function properly.
>
> Make sure the backend is running and accessible via the `VITE_API_BASE_URL` environment variable (default: `http://localhost:8000`).

The backend provides unified access to multiple AI models (including local models via [Ollama](https://ollama.com/) and cloud models like [Google Gemini](https://deepmind.google/technologies/gemini/)) through a modern API built with [Litestar](https://litestar.dev/).

To learn more or get started with the backend, check out the [Ollaix API README](https://github.com/Macktireh/ollaix).

### Installation 💻

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Macktireh/ollaix-ui.git
    cd ollaix-ui
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**

    Create a `.env` file in the root of the project by copying `.env.example`:

    ```bash
    cp .env.example .env
    ```

    Open `.env` and set the `VITE_API_BASE_URL` to your backend API endpoint. For local development, it will likely be:

    ```
    VITE_API_BASE_URL=http://localhost:8000
    ```

> [!WARNING]
> This frontend requires a backend API to function. Ensure your backend is running and accessible at the specified `VITE_API_BASE_URL`.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:3000` (or another port if 3000 is occupied).

### Installation with Docker 🐳

1.  **Build the Docker image:**

    ```bash
    # Adjust the BASE_URL if your backend is not running on http://localhost:8000
    docker build --build-arg BASE_URL=http://localhost:8000 -t ollaix-ui .
    ```

    This command builds the Docker image with the specified base URL for the API. Adjust the `BASE_URL` as needed for your environment (default is `http://localhost:8000`).

2.  **Run the Docker container:**

    ```bash
    docker run -d -p 3000:80 --name ollaix-ui ollaix-ui
    ```

    The application will be available at `http://localhost`.

---

## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

### How to Contribute

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

Please ensure your pull request provides a clear description of the problem and solution. Include the relevant issue number if applicable.

---

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Macktireh](https://github.com/Macktireh)
