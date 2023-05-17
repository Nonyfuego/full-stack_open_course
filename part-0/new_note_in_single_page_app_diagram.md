# 0.6: New note in Single page app diagram


Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid
    sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note left of server: 201 Created

```