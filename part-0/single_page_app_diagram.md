# 0.5: Single page app diagram

Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.


```mermaid
    sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    note left of server: 200 OK
    server-->>browser: HTML document is rendered
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    note left of server: 200 OK
    server-->>browser: CSS style is rendered
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    note left of server: 200 OK
    server-->>browser: Javascript is executed
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    note left of server: 200 OK
    server-->>browser: JSON file is parsed
    browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
    note left of server: 200 OK
    server-->>browser: Favicon is rendered in document

```