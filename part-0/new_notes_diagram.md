# 0.4: New note diagram

**Create a diagram** depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button.

```mermaid
    sequenceDiagram
        participant browser
        participant server
        
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        note left of server: 200 OK
        server-->>browser: HTML document is rendered
        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_notes
        note left of server: 302 redirect (browser refreshes page)
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        note left of server: 200 OK
        server-->>browser: HTML document
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        note left of server: 200 OK
        server-->>browser: CSS style is rendered
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        note left of server: 200 OK
        server-->>browser: Javascript is executed
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        note left of server: 200 OK
        server-->>browser: JSON file is parsed
        browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
        note left of server: 200 OK
        server-->>browser: Favicon is rendered in document

```