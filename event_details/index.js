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
   <h2 class="title">${userEvent.eventName}</h2>
   <div class="container_1">
   <p id="description">${userEvent.eventDescription}</p>
   <h3 class="date">${userEvent.eventDate}<h3>
   </div>
   
   <div class="container_2">
        <p class="participants">${userEvent.participants}</p>
        <h3 class="organizers">${userEvent.organizer}</h3>
        <p class="regisDeadline">${userEvent.eventDate}</p>
        <img src="${userEvent.image}" alt="Event Img" id="hero-event-image">
        <h3 class="state">${userEvent.state}</h3>
      </div>
 `;

  // Insert the event details HTML into the page
  document.getElementById("clientEventsDetails").innerHTML = eventDetailsHtml;
} else {
  // Handle the case where no event with the given index exists
}
