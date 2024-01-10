// import "./styles.css";

// Get references to various elements in the DOM
const dialog = document.querySelector("#addEvent");
const showDialogButton = document.querySelector("#addEventBtn");
const cancelButton = document.querySelector("#cancelButton");
const saveButton = document.querySelector("#saveButton");

// Event listener for showing the dialog when the button is clicked
showDialogButton.addEventListener("click", () => {
  dialog.showModal();
  // Starts with a blank form by resetting all form fields
  const formFields = dialog.querySelectorAll("input, textarea");
  formFields.forEach((field) => (field.value = ""));
});

// Event listener for canceling the form submission and closing the dialog
cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

// Event listener for saving the form data
saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  
  // Create a new FormData instance to gather form data
  const formData = new FormData(event.target.parentNode);

  // Initialize an empty object to hold the form data
  const eventObject = {};

  // Iterate over the form data entries and assign them to the event object
  for (let pair of formData.entries()) {
    eventObject[pair[0]] = pair[1];
  }

  // Determine the state based on the checked radio button
  let state;
  if (document.querySelector("#stateCancelled").checked) {
    state = "Cancelled";
  } else if (document.querySelector("#stateOngoing").checked) {
    state = "Ongoing";
  } else if (document.querySelector("#stateDone").checked) {
    state = "Done";
  } else if (document.querySelector("#stateUpcoming").checked) {
    state = "Upcoming";
  }
  eventObject.state = state;

  // Read the selected image file and convert it to base64
  const imageFile = document.querySelector("#image").files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    const base64String = reader.result;

    // Store the base64 string in the event object
    eventObject.image = base64String;

    // Save the new event to local storage
    saveEvent(eventObject);

    // Reload the list of events
    loadAllEvents();
  };
  reader.readAsDataURL(imageFile);

  // Close the dialog after saving
  dialog.close();
  console.log("Save button clicked");
});

// Get references to the form and the container for all events
const allEventsContainer = document.getElementById("allEvents");

// Load existing events from local storage or create an empty array
let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to load all events and display them on the page
function loadAllEvents() {
  // Clear the current list of events
  allEventsContainer.innerHTML = "";

  // Sort events by date
  events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  // Loop through all events and add them to the page
  events.forEach(function (event, index) {
    const eventElement = document.createElement("div");
    eventElement.classList.add("adminEventCard");
    eventElement.innerHTML = `
    <img src="${event.image}" alt="${event.eventName}">
    <h2>Title: ${event.eventName}</h2>
    <!-- Display other event details... -->
    <button onclick="editEvent(${index})">Edit</button>
    <button onclick="deleteEvent(${index})">Delete</button>
    `;
    allEventsContainer.appendChild(eventElement);
  });
}

// Function to save an event to local storage
function saveEvent(event, index) {
  // If an index is provided, replace the event at that index
  if (index !== undefined) {
    events[index] = event;
  }
  // Otherwise, push a new event onto the array
  else {
    events.push(event);
  }

  // Save the events in local storage
  localStorage.setItem("events", JSON.stringify(events));
}

// Function to edit an existing event
window.editEvent = function (index) {
  const event = events[index];

  // Populate the #editEventForm with the event data
  // (Omitted for brevity)

  // Show the #editEvent dialog
  const dialog = document.querySelector("#editEvent");
  dialog.showModal();

  // Event listeners for cancel and save buttons in the edit dialog
  const editCancelButton = document.querySelector("#cancelButtonEdit");
  const editSaveButton = document.querySelector("#saveButtonEdit");

  editCancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
  });

  editSaveButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    // Similar to the saveButton event listener, create a new FormData instance
    const formData = new FormData(event.target.parentNode);

    // Initialize an empty object to hold the form data
    const eventObject = {};

    // Iterate over the form data entries and assign them to the event object
    for (let pair of formData.entries()) {
      eventObject[pair[0]] = pair[1];
    }

    // Read the selected image file and convert it to base64
    const imageFile = document.querySelector("#imageEdit").files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64String = reader.result;

      // Store the base64 string in the event object
      eventObject.image = base64String;

      // Replace the old event with the updated event
      events[index] = eventObject;

      // Save the updated event
      saveEvent(eventObject, index);

      // Reload the list of events
      loadAllEvents();
    };
    reader.readAsDataURL(imageFile);

    // Close the dialog after saving
    dialog.close();
  });
};

// Function to delete an event from local storage
window.deleteEvent = function (index) {
  // Ask the user for confirmation
  if (!confirm("Are you sure you want to delete this event?")) {
    // If the user clicks "Cancel", exit the function
    return;
  }

  // If the user clicks "OK", remove the event from the array
  events.splice(index, 1);

  // Update the local storage
  localStorage.setItem("events", JSON.stringify(events));

  // Reload the list of events
  loadAllEvents();
};

// Function to handle page load
window.onload = () => {
  loadAllEvents(); // Load existing events from local storage
  // localStorage.clear();
};
