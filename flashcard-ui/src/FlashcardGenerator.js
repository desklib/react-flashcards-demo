import React, { useState } from 'react';
import axios from 'axios';
import { FlashCardArray } from 'react-flashcards'; // Update the import statement

const FlashcardGenerator = () => {
    const [text, setText] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/generate_flashcards/", { text });
            console.log(response.data);
            const formattedFlashcards = response.data.flashcards.map((flashcard, index) => ({
                id: index + 1,
                showTimer: false,
                frontHtml: (<p>{flashcard.front}</p>),
                backHtml: (<p>{flashcard.back}</p>),
                // Add other properties if needed
            }));
            setFlashcards(formattedFlashcards);
        } catch (error) {
            console.error("Error generating flashcards:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Welcome to react-flashcards demo</h1>
            <p>Add content below to create flashcards.</p>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter text to generate flashcards" 
                    rows="10" 
                    cols="50"
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Generating..." : "Generate Flashcards"}
                </button>
            </form>
            <h2>Generated Flashcards</h2>
            {loading && <p>Loading...</p>}
            {flashcards.length > 0 && !loading && (
                <FlashCardArray
                    cards={flashcards}
                    controls={true}
                    showCount={true}
                    onCardChange={(id, index) => console.log(`Card change detected: ID ${id}, Index: ${index}`)}
                    onCardFlip={(id, index, state) => console.log(`Card flipped: ID ${id}, Index: ${index}, Flipped: ${state}`)}
                />
            )}
        </div>
    );
};

export default FlashcardGenerator;