const allEventsContainer = document.getElementById("clientEvents");

// Load existing events from local storage
let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to load all events
function loadAllEvents() {
  // Clear the current list of events
  // allEventsContainer.innerHTML = "";

  // Loop through all events and add them to the page
  events.forEach(function (event, index) {
    const eventElement = document.createElement("div");
    eventElement.innerHTML = `
  <h2>${event.eventName}</h2>
  <p>${event.eventDescription}</p>
  `;
    // Add a click event listener to the event div
    eventElement.addEventListener("click", function () {
      // Redirect to the event details page with the event index as a query parameter
      window.location.href = "event_details/index.html?eventIndex=" + index;
    });

    allEventsContainer.appendChild(eventElement);
  });
}

function menu (){
  const menuButton = document.getElementById('menu-button');
  const closeMenuButton = document.getElementById('close-button');
  const backgroundCoverField = document.getElementById('background-cover-field');
  const menuContainerField = document.getElementById('menu-container-field');
  const removeBodyOverflow = document.getElementById('body');

  menuButton.onclick =  function() {
    backgroundCoverField.classList.toggle('active');
    menuContainerField.classList.toggle('active');
    removeBodyOverflow.classList.toggle('inactive');
  };
  
  closeMenuButton.onclick = function () {
    backgroundCoverField.classList.remove('active');
    menuContainerField.classList.remove('active');
    removeBodyOverflow.classList.remove('inactive');
  };
};

function showMonth(){
  const month = new Date();
  const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  document.getElementById('show-month').innerHTML = monthsList[month.getMonth()];
};

window.onload = () => {
  loadAllEvents();
  menu();
  showMonth();
};
