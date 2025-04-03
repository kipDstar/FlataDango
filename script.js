const BASE_URL = "http://localhost:3000";

// Fetch and display the first movie's details
function fetchFirstMovie() {
    fetch(`${BASE_URL}/films`)
        .then(response => response.json())
        .then(movie => displayMovieDetails(movie));
}

// Display movie details in the UI
function displayMovieDetails(movie) {
    document.getElementById("movie-poster").src = movie.poster;
    document.getElementById("movie-title").textContent = movie.title;
    document.getElementById("movie-description").textContent = movie.description;
    document.getElementById("movie-runtime").textContent = `Runtime: ${movie.runtime} minutes`;
    document.getElementById("movie-showtime").textContent = `Showtime: ${movie.showtime}`;
    updateAvailableTickets(movie);

    document.getElementById("buy-ticket").onclick = () => buyTicket(movie);
    document.getElementById("delete-movie").onclick = () => deleteMovie(movie.id);
}

// Update the available tickets display
function updateAvailableTickets(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;
    const ticketElement = document.getElementById("movie-available-tickets");
    ticketElement.textContent = `Available Tickets: ${availableTickets}`;
    
    const buyButton = document.getElementById("buy-ticket");
    if (availableTickets <= 0) {
        buyButton.textContent = "Sold Out";
        buyButton.disabled = true;
    } else {
        buyButton.textContent = "Buy Ticket";
        buyButton.disabled = false;
    }
}

// Fetch and display the movie list
function fetchMovieList() {
    fetch(`${BASE_URL}/films`)
        .then(response => response.json())
        .then(movies => {
            const filmsList = document.getElementById("films");
            filmsList.innerHTML = ""; // Clear placeholder

            movies.forEach(movie => {
                const li = document.createElement("li");
                li.textContent = movie.title;
                li.className = "film item";
                li.addEventListener("click", () => fetchMovieDetails(movie.id));
                filmsList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching movie list:", error));
}

// Fetch movie details when clicked from list
function fetchMovieDetails(movieId) {
    fetch(`${BASE_URL}/films/${movieId}`)
        .then(response => response.json())
        .then(movie => displayMovieDetails(movie));
}

// Handle ticket purchase
function buyTicket(movie) {
    if (movie.tickets_sold < movie.capacity) {
        const updatedTickets = movie.tickets_sold + 1;
        fetch(`${BASE_URL}/films/${movie.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tickets_sold: updatedTickets })
        })
        .then(response => response.json())
        .then(updatedMovie => {
            movie.tickets_sold = updatedMovie.tickets_sold;
            updateAvailableTickets(movie);
            updateSoldOutStatus(movie);
            saveTicketPurchase(movie.id);
        });
    }
}

// Save ticket purchase to /tickets endpoint
function saveTicketPurchase(movieId) {
    fetch(`${BASE_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ film_id: movieId })
    })
    .then(response => response.json())
    .then(data => console.log("Ticket purchase recorded:", data));
}

// Update sold-out status in the movie list
function updateSoldOutStatus(movie) {
    const filmsList = document.getElementById("films").children;
    for (let li of filmsList) {
        if (li.textContent === movie.title) {
            if (movie.capacity - movie.tickets_sold === 0) {
                li.classList.add("sold-out");
            } else {
                li.classList.remove("sold-out");
            }
        }
    }
}

// Delete a movie from the server and UI
function deleteMovie(movieId) {
    fetch(`${BASE_URL}/films/${movieId}`, {
        method: "DELETE"
    })
    .then(() => {
        document.getElementById("films").querySelectorAll("li").forEach(li => {
            if (li.textContent === document.getElementById("movie-title").textContent) {
                li.remove();
            }
        });
        document.getElementById("movie-details").innerHTML = "<p>Movie deleted.</p>";
    });
}

// Initialize the application
fetchFirstMovie();
fetchMovieList();
