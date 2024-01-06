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
<div class="hero-container">
  <div class="event-content-container">
    <h2 class="event-title">${userEvent.eventName} <span class="event-status">(${userEvent.state})</span></h2>
    <p id="event-description">${userEvent.eventDescription} <br><br><span>The event date is ${userEvent.eventDate}. ${userEvent.participants} will be there and the event will be organize by ${userEvent.organizer}. The registration will end on ${userEvent.registrationDeadline}.</span></p>
  </div>

  <div class="event-image-container">
    <img src="${userEvent.image}" alt="Event Img" id="hero-event-image">
  </div>  
</div>
 `;

  // Insert the event details HTML into the page
  document.getElementById("clientEventsDetails").innerHTML = eventDetailsHtml;
} else {
  // Handle the case where no event with the given index exists
}
