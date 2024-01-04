import "./style.css";

const allEventsContainer = document.getElementById("clientEvents");

// Load existing events from local storage
let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to load all events
function loadAllEvents() {
  // Clear the current list of events
  allEventsContainer.innerHTML = "";

  // Loop through all events and add them to the page
  events.forEach(function (event, index) {

    const eventElement = document.createElement("div");
    eventElement.classList.add("event-card");
    eventElement.innerHTML = `
    <div class="event-card-background-filter">
    <h2 class="event-card-title postponed">${event.eventName}</h2>
    <ul class="event-card-list">
      <li class="event-card-date">${event.eventDate}</li>
      <li class="event-card-participants">${event.eventParticipant}</li>
    </ul>
    <p class="event-card-info">${event.eventDescription}</p>
  </div>
  `;
    // Add a click event listener to the event div
    eventElement.addEventListener("click", function () {
      // Redirect to the event details page with the event index as a query parameter
      window.location.href = "event_details/index.html?eventIndex=" + index;
    });

    allEventsContainer.appendChild(eventElement);
  });
  if(allEventsContainer.innerHTML != ""){
    document.getElementById('prev-slide').classList.toggle('active');
    document.getElementById('next-slide').classList.toggle('active');
  }
}
window.onload = () => {
  loadAllEvents();
};

function menu (){
  const menuButton = document.getElementById('menu-button');
  const closeMenuButton = document.getElementById("close-button");
  const facultyMenuButton = document.getElementById("faculty-menu-button");
  const cicssoOfficersMenuButton = document.getElementById("cicsso-officers-menu-button");
  const eventsMenuButton = document.getElementById("events-menu-button");
  const newsAndAnnouncementenuButton = document.getElementById("news-and-announcement-menu-button");
  const backgroundCoverField = document.getElementById('background-cover-field');
  const menuContainerField = document.getElementById('menu-container-field');
  const removeBodyOverflow = document.getElementById('body');

  menuButton.onclick =  function() {
    backgroundCoverField.classList.toggle('active');
    menuContainerField.classList.toggle('active');
    removeBodyOverflow.classList.toggle('inactive');
  };
  
    function closeContainers() {
    backgroundCoverField.classList.remove('active');
    menuContainerField.classList.remove('active');
    removeBodyOverflow.classList.remove('inactive');
  };

  closeMenuButton.onclick = closeContainers;
  newsAndAnnouncementenuButton.onclick = closeContainers;
  eventsMenuButton.onclick = closeContainers;
  cicssoOfficersMenuButton.onclick = closeContainers;
  facultyMenuButton.onclick = closeContainers;
};

function showMonth(){
  const month = new Date();

  const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  document.getElementById("show-month").innerHTML = monthsList[month.getMonth()];
};

function carousel(){
  const slideButtons = document.querySelectorAll(".slide-button");
  const eventList = document.querySelector(".clientEvents");

  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;

      const scrollAmount = eventList.clientWidth * direction;
      eventList.scrollBy({ left: scrollAmount, behavior: "smooth"});
    });
  });
};

window.onload = () => {
  loadAllEvents();
  menu();
  showMonth();
  carousel();
};
