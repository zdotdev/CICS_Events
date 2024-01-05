// import "./style.css";
// Parse the URL to get the event index
const urlParams = new URLSearchParams(window.location.search);
const eventIndex = parseInt(urlParams.get("eventIndex"));

// Get the event data from local storage
let events = JSON.parse(localStorage.getItem("events")) || [];
const userEvent = events[eventIndex];
console.log(userEvent.eventName);

if (userEvent) {
  // Create the event details HTML
  const eventDetailsHtml = `
      <main class="mainContainer" id="clientEventsDetails">
      <div class="container_1">
        <img src="${userEvent.image}" alt="Event Img" id="hero-event-image">
        <h1 class="title">${userEvent.eventName}</h1>
        <h3 class="state">Status:<span class="stateColor">${userEvent.state}</span></h3>
        <h3 class="date">Date: ${userEvent.eventDate}</h3>
      </div>
      
      <div class="container_2">
        <p class="description">${userEvent.eventDescription}</p>
        <h3 class="organizers">Organizers: ${userEvent.organizer}</h3>
        <p class="participants">Participants: ${userEvent.participants}</p>
        <p class="regisDeadline">Registration Deadline: ${userEvent.eventDate}</p>
        
      </div>

      </main>

 `;

  // Insert the event details HTML into the page
  document.getElementById("clientEventsDetails").innerHTML = eventDetailsHtml;
} else {
  // Handle the case where no event with the given index exists
}
