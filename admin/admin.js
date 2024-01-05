import "./styles.css";

const dialog = document.querySelector("#addEvent");
const showDialogButton = document.querySelector("#addEventBtn");
const cancelButton = document.querySelector("#cancelButton");
const saveButton = document.querySelector("#saveButton");

showDialogButton.addEventListener("click", () => {
  dialog.showModal();
  // Starts with blank form
  const formFields = dialog.querySelectorAll("input, textarea");
  formFields.forEach((field) => (field.value = ""));
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
  // Determine the state based on the checked radio button
  let state;
  if (document.querySelector("#stateCancelled").checked) {
    state = "cancelled";
  } else if (document.querySelector("#stateOngoing").checked) {
    state = "ongoing";
  } else if (document.querySelector("#stateDone").checked) {
    state = "done";
  } else if (document.querySelector("#stateUpcoming").checked) {
    state = "upcoming";
  }
  eventObject.state = state;

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
  // Sort events by date
  events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  // Loop through all events and add them to the page
  events.forEach(function (event, index) {
    const eventElement = document.createElement("div");
    eventElement.classList.add("adminEventCard");
    eventElement.innerHTML = `
    <img src="${event.image}" alt="${event.eventName}">
    <h2>Title: ${event.eventName}</h2>
    <p>Description: ${event.eventDescription}</p>
    <p>Date: ${event.eventDate}</p>
    <p>Location: ${event.location}</p>
    <p>Participants: ${event.participants}</p>
    <p>Organizers: ${event.organizers}</p>
    <p>Registration Deadline: ${event.registrationDeadline}</p>
    <p>State: ${event.state}</p>
    <button onclick="editEvent(${index})">Edit</button>
    <button onclick="deleteEvent(${index})">Delete</button>
    `;
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
  if (event.eventName !== null) {
    document.querySelector("#eventNameEdit").value = event.eventName;
  }
  if (event.eventDescription !== null) {
    document.querySelector("#eventDescriptionEdit").value =
      event.eventDescription;
  }
  if (event.eventDate !== null) {
    document.querySelector("#eventDateEdit").value = event.eventDate;
  }
  if (event.location !== null) {
    document.querySelector("#locationEdit").value = event.location;
  }
  if (event.participants !== null) {
    document.querySelector("#participantsEdit").value = event.participants;
  }
  if (event.organizers !== null) {
    document.querySelector("#organizersEdit").value = event.organizers;
  }
  if (event.registrationDeadline !== null) {
    document.querySelector("#registrationDeadlineEdit").value =
      event.registrationDeadline;
  }
  if (event.state === "cancelled") {
    document.querySelector("#stateCancelledEdit").checked = true;
  } else if (event.state === "ongoing") {
    document.querySelector("#stateOngoingEdit").checked = true;
  } else if (event.state === "done") {
    document.querySelector("#stateDoneEdit").checked = true;
  } else if (event.state === "upcoming") {
    document.querySelector("#stateUpcomingEdit").checked = true;
  }
  console.log(event.state);
  // document.querySelector("#imageEdit").value = event.image;
  // document.querySelector("#stateEdit").value = event.state;

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
window.onload = () => {
  loadAllEvents();
  // localStorage.clear();
};
