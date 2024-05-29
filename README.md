# react-flashcards-demo

This project demonstrates a full-stack application for generating flashcards from text input. It includes a FastAPI backend to process the text and generate flashcards, and a React frontend to interact with the backend and display the generated flashcards using the `react-flashcards` package.

## Features

- Uses the `react-flashcards` package for flashcard presentation
- FastAPI backend to handle text input and serve generated flashcards
- Llama3 (Using Ollama) to generate flashcards from text
- React frontend to input text and display generated flashcards

## Backend Setup (FastAPI, Ollama)

### Prerequisites

- Python 3.8 or later
- Poetry for dependency management
- Ollama with llama3 (Refer: https://github.com/ollama/ollama)

### Installation

1. **Clone the repository:**
    ```sh
    git clone <repository_url>
    cd flashcard_api
    ```

2. **Install dependencies:**
    ```sh
    poetry install
    ```

3. **Run the FastAPI server:**
    ```sh
    poetry run uvicorn main:app --reload
    ```

## Frontend Setup (React)

### Prerequisites

- Node.js and npm

### Installation

1. **Navigate to the React project directory:**
    ```sh
    cd flashcard-ui
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the React development server:**
    ```sh
    npm start
    ```

## Running the Application

1. **Start the FastAPI server:**
    ```sh
    poetry run uvicorn main:app --reload
    ```

2. **Start the React development server:**
    ```sh
    cd flashcard-ui
    npm start
    ```

3. **Visit `http://localhost:3000` in your browser:**

Enter some text and click "Generate Flashcards" to see the flashcards generated and displayed using `react-flashcards`.

## License

This project is licensed under the MIT License.
