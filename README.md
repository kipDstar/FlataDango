# FlataDango
Week 3 Code Challenge
# FlataDango

FlataDango is a web-based movie ticketing application that allows users to browse available movies, view details, purchase tickets, and manage movie listings.

## Features

### Core Deliverables

- **View Movie Details:**
  - Displays the first movie's details (poster, title, runtime, showtime, and available tickets) when the page loads.
  - Available tickets are calculated as `capacity - tickets_sold`.
  - Uses `GET /films/1` to retrieve the movie details.

- **Movie List:**
  - Lists all movies on the left sidebar.
  - Uses `GET /films` to fetch movie data and populate the list.

- **Buy Ticket Functionality:**
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

## How I executed Installation & Setup

1. I Cloned the repository:
   ```sh
   git clone https://github.com/yourusername/flataDango.git
   cd flataDango
   ```

2. Open `index.html` in the browser to run the application and inspect it using chrome dev tools.

## Technologies I Used in my code
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

## Possible  Improvements
- Implement user authentication for ticket purchases.
- Add a search/filter feature for movies.
- Enhance UI with animations and improved design.
- Realized that deleting a movie removes it completely from the server list, could benefit from a initialization set-up to revert changes e.g. deletions.
- Also having a highlight shading stay in place of the selected movies in the list would be beneficial.

