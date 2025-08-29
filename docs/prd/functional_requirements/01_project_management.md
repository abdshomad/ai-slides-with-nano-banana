# 4.1. Project Management

*   **F-PM-01:** Users can view a list of all their created presentations on the main dashboard.
*   **F-PM-02:** The list shall be sorted by the last modified date, with the most recent at the top.
*   **F-PM-03:** Users can create a new, blank presentation project. A default title (e.g., "Untitled Presentation X") is assigned.
*   **F-PM-04:** Users can select any presentation from the list to open it in the editor.
*   **F-PM-05:** Users can delete any presentation from the list, with a confirmation prompt to prevent accidental deletion.
*   **F-PM-06:** Users can rename the presentation by clicking on the title within the editor view.
*   **F-PM-07:** All project data, including the full version history, is persisted in the browser's Local Storage, ensuring work is not lost between sessions.
*   **F-PM-08:** The UI shall display a non-intrusive auto-save status indicator in the header (e.g., "Saving...", "All changes saved") to provide feedback on data persistence.

### 4.1.1. Brand Kit Management
*   **F-PM-09:** Users can access a "Brand Kit" manager from the main dashboard to define a consistent visual identity for all their presentations.
*   **F-PM-10:** Users can upload a company or personal logo (PNG, JPG, SVG). The logo is stored as a base64 data URL.
*   **F-PM-11:** Users can define a primary (for headings) and secondary (for body text) color for their brand using an interactive color picker.
*   **F-PM-12:** Users can select a primary and secondary font from a curated list of professional, web-safe fonts.
*   **F-PM-13:** Users can set a default "Visual Style" (e.g., Photorealistic, Vector Art) to be used for AI image generation, ensuring a consistent aesthetic.
*   **F-PM-14:** The configured Brand Kit is saved locally and is automatically applied to all presentations during PPTX export.
