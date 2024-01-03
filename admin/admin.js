const dialog = document.querySelector("#addEvent");
const showDialogButton = document.querySelector("#addEventBtn");
const cancelButton = document.querySelector("#cancelButton");
const saveButton = document.querySelector("#saveButton");

showDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Create a new FormData instance
  const formData = new FormData(event.target.parentNode);

  // Initialize an empty object to hold the form data
  const eventObject = {};

  // Iterate over the form data entries
  for (let pair of formData.entries()) {
    // Assign each key/value pair to the event object
    eventObject[pair[0]] = pair[1];
  }

  // Read the selected image file
  const imageFile = document.querySelector("#image").files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    // Convert the image file to base64
    const base64String = reader.result;

    // Store the base64 string in the event object
    eventObject.image = base64String;

    // Save the new event
    saveEvent(eventObject);

    // Reload the list of events
    loadAllEvents();
  };
  reader.readAsDataURL(imageFile);
  dialog.close();
  console.log("Save button clicked");
});

// Get the form and the events container
const allEventsContainer = document.getElementById("allEvents");

// Load existing events from local storage
let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to load all events
function loadAllEvents() {
  // Clear the current list of events
  allEventsContainer.innerHTML = "";

  // Loop through all events and add them to the page
  events.forEach(function (event, index) {
    console.log(event);
    const eventElement = document.createElement("div");
    eventElement.innerHTML = `
    <h2>${event.eventName}</h2>
    <p>${event.eventDescription}</p>
    <img src="${event.image}" alt="${event.eventName}">
    <button onclick="editEvent(${index})">Edit</button>
    <button onclick="deleteEvent(${index})">Delete</button>`;
    allEventsContainer.appendChild(eventElement);
  });
}

// Function to save an event
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

window.editEvent = function (index) {
  const event = events[index];

  // Populate the #editEventForm with the event data
  document.querySelector("#eventNameEdit").value = event.eventName;
  document.querySelector("#eventDescriptionEdit").value =
    event.eventDescription;
  // Repeat for all other fields...

  // Show the #editEvent dialog
  const dialog = document.querySelector("#editEvent");
  dialog.showModal();

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

    // Iterate over the form data entries
    for (let pair of formData.entries()) {
      // Assign each key/value pair to the event object
      eventObject[pair[0]] = pair[1];
    }

    // Read the selected image file
    const imageFile = document.querySelector("#imageEdit").files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      // Convert the image file to base64
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
    dialog.close();
    console.log("Save button clicked");
  });
};
window.deleteEvent = function (index) {
  // Remove the event from the array
  events.splice(index, 1);

  // Update the local storage
  localStorage.setItem("events", JSON.stringify(events));

  // Reload the list of events
  loadAllEvents();
};
window.onload = () => {
  loadAllEvents();
  // localStorage.clear();
};
