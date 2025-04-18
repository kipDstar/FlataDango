# FlataDango
Week 3 Code Challenge

FlataDango is a web-based movie ticketing application that allows users to browse available movies, view details, purchase tickets, and manage movie listings.

## Features

### Core Deliverables As Per Instructions Provided

- **View Movie Details:**
  - Displays the first movie's details (poster, title, runtime, showtime, and available tickets) when the page loads.
  - Available tickets are calculated as `capacity - tickets_sold`.
  - Uses `GET /films/1` to retrieve the movie details.

- **Movie List:**
  - Lists all movies on the left sidebar.
  - Uses `GET /films` to fetch movie data and populate the list.

- **Buying Ticket Functionality:**
  - Clicking the **Buy Ticket** button decreases the available tickets count.
  - Prevents ticket purchase if the show is sold out.
  - Updates ticket count on the server using:
    ```
    PATCH /films/:id
    Content-Type: application/json
    {
      "tickets_sold": updated_count
    }
    ```

- **Movie Deletion:**
  - Each movie in the list has a **Delete** button.
  - Clicking it removes the movie from the list and server.
  - Uses:
    ```
    DELETE /films/:id
    ```

- **Sold Out Indication:**
  - If a movie sells out, updates the UI by:
    - Changing the buy button text to **Sold Out**.
    - Adding the `.sold-out` class to the movie item.

### Bonus Features

- **Switch Movie Details:**
  - Clicking on any movie in the list updates the displayed details.
  - Uses an additional `GET` request to fetch new movie data.

## How I Executed Installation & Setup

1. I cloned the repository:
   ```sh
   git clone https://github.com/yourusername/flataDango.git
   cd flataDango
   ```

2. Start the JSON Server to simulate the backend:
   ```sh
   json-server --watch db.json
   ```

3. Open `index.html` in the browser to run the application and inspect it using Chrome DevTools.

4. Access the application via the hosted link provided by the JSON Server. By default, the JSON Server runs on `http://localhost:3000`. Open the following link in your browser:
   ```
   http://localhost:3000
   ```

## Using Virtual Server (JSON)

The application uses a JSON Server to simulate a backend. The `db.json` file contains the movie data, and the server provides RESTful API endpoints for interacting with the data.

To start the JSON Server, run:
```sh
json-server --watch db.json
```

## Technologies I Used In My Code
- **HTML**
- **CSS** 
- **JavaScript** 
- **JSON Server** (I used the provided json files)

## Trial API Endpoints

| Method | Endpoint          | Description |
|--------|------------------|-------------|
| GET    | `/films`         | Fetch all movies |
| GET    | `/films/:id`     | Fetch a single movie |
| PATCH  | `/films/:id`     | Update tickets sold count |
| DELETE | `/films/:id`     | Delete a movie |

## Possible Improvements
- Implement user authentication for ticket purchases.
- Add a search/filter feature for movies.
- Enhance UI with animations and improved design.
- Realized that deleting a movie removes it completely from the server list, could benefit from a initialization set-up to revert changes e.g. deletions.
- Also having a highlight shading stay in place of the selected movies in the list would be beneficial.

