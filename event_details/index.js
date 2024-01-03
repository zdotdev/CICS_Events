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
   <h2>${userEvent.eventName}</h2>
   <p>${userEvent.eventDescription}</p>
   <img src="${userEvent.image}" alt="${userEvent.eventName}">
   <!-- ...and so on for the rest of the event data -->
 `;

  // Insert the event details HTML into the page
  document.getElementById("clientEventsDetails").innerHTML = eventDetailsHtml;
} else {
  // Handle the case where no event with the given index exists
}
