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
  <div class="image-container">
  <img src="${userEvent.image}" alt="Event Img" id="hero-event-image">
</div>
<h2 class="title">${userEvent.eventName}</h2>

<div class="container_1">
  <p id="description">${userEvent.eventDescription}</p>
</div>
<div class="container_2">
  <strong class="date">${userEvent.eventDate}</strong>
  <strong class="participants">${userEvent.participants}</strong>
  <strong class="organizers">${userEvent.organizer}</strong>
  <strong class="regisDeadline">${userEvent.eventDate}</strong>
  <strong class="state ${userEvent.state}">${userEvent.state}</strong>
</div>
 `;

  // Insert the event details HTML into the page
  document.getElementById("clientEventsDetails").innerHTML = eventDetailsHtml;
} else {
  // Handle the case where no event with the given index exists
}
