# 4.4. Step 3: Slide Generation & The AI Editor

This is the final stage where the refined outline is transformed into a complete, editable slide deck.

### 4.4.1. Presentation Generation
*   **F-SG-01 (Sequential Generation):** The AI generates slides sequentially, one after another, creating a dynamic experience as the user watches the presentation come to life.
*   **F-SG-02 (Generation Progress & Pacing):** The UI clearly indicates which slide is currently being created. To manage API rate limits and enhance the creative process, a randomized delay (7-13 seconds) is enforced between each slide generation, communicated to the user via a countdown timer.
*   **F-SG-03 (Live UI Population):** The presentation editor is populated in real-time as each slide is completed, with thumbnails appearing in a sidebar and the main view updating to the newly generated slide.
*   **F-SG-04 (Evolving Visual Narrative):** The AI creates a cohesive visual narrative using an image evolution technique. For each slide after the first, it uses the image from the *previous* slide as a base and intelligently evolves it to match the new slide's content, ensuring a smooth visual transition.

### 4.4.2. The AI Editor Interface
*   **F-ED-01 (Editor Layout):** The editor features a two-column layout: a slide thumbnail sidebar for quick navigation and a large detail view for the selected slide.
*   **F-ED-02 (Slide Reordering):** Users can drag and drop slide thumbnails in the sidebar to reorder the presentation sequence.
*   **F-ED-03 (AI Tools Menu):** A central "AI Tools & Actions" menu provides access to a comprehensive suite of post-generation editing features.

### 4.4.3. AI Content Tools
*   **F-ED-04 (Natural Language Editing):** Users can edit any slide by providing a natural language prompt (e.g., "make the title catchier," "create a bar chart showing Q1 sales"). The AI interprets the request and updates the slide's content, layout, or visuals.
*   **F-ED-05 (Chart Generation):** If a user's edit prompt contains data or requests a visualization, the AI will autonomously generate a chart (bar, line, or pie) and replace the slide's content with it.
*   **F-ED-06 (Generate Speaker Notes):** The AI generates detailed talking points and additional context for any selected slide.
*   **F-ED-07 (Generate Key Takeaway):** The AI distills the core message of a slide into a single, impactful sentence.
*   **F-ED-08 (Expand Slide):** The AI can take a single slide's content and expand it into 2-3 new, more detailed slides, which are then inserted into the presentation.
*   **F-ED-09 (Adapt for Audience):** Users can rewrite a slide's content for a different target audience (e.g., "explain this to a 5th grader," "rewrite for a technical expert").

### 4.4.4. AI Analysis Tools
*   **F-ED-10 (Fact-Check):** The AI uses Google Search to verify the information on a slide. It presents a side-by-side comparison of the original content and suggested corrections, which the user can apply with one click.
*   **F-ED-11 (Design Suggestions):** The AI captures an image of the current slide and provides a critique of its design, offering actionable suggestions for improving layout, color, and visual hierarchy.

### 4.4.5. The Visuals Studio
A dedicated modal for all visual-related tasks on a slide.
*   **F-VS-01 (Generate):** Generate a new image from a text prompt. Includes options for negative prompts, applying various art styles, and incorporating the user's Brand Kit colors.
*   **F-VS-02 (Apply Style to All):** Apply the current prompt's art style and brand color settings to regenerate images for all other slides in the presentation.
*   **F-VS-03 (Edit):** Edit the slide's current image using a natural language prompt (e.g., "add a sun in the sky").
*   **F-VS-04 (Suggestions):** The AI generates three alternative image suggestions based on the slide's content.
*   **F-VS-05 (Search):**
    *   **AI Search:** Displays royalty-free images found by the AI during the initial outline research.
    *   **Stock Photos:** Allows the user to perform a manual search for stock photos using a mock API.
*   **F-VS-06 (Video Generation):** Generate a short, dynamic video clip from a text prompt. A progress indicator is shown during the generation, which can take several minutes.
