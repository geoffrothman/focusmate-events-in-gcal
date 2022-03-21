/**
 * Geoff Rothman grothman@salesforce.com
 *      Processes Gmail Gcal Invites from Focusmate.com and
 *      and Confirms Attendance to Yes, Sets the color to red,
 *      and changes the Title of the Event
 */
function changeIncomingFocusmateEvents() {

  const MILLIS_PER_DAY = 1000 * 60 * 60 * 24; // 24 hrs in milliseconds
  const now = new Date();
  const yesterday = new Date(now.getTime() - 1 * MILLIS_PER_DAY);
  const in3weeks = new Date(now.getTime() + 21 * MILLIS_PER_DAY);


  try {

    // assigns the calendar to the currently logged in users primary/default calendar's id 
    const cal = CalendarApp.getCalendarById('primary');
    
    // hardcoded date example
    //var events = cal.getEvents(new Date("January 1, 2022 00:00:00 CST"), new Date("December 31, 2022 23:59:59 CST"), {search: 'Focusmate Session'});
    
    
    // searches for events 24 hours ago to 3 weeks from today with events having this Title
    // this is the default event title for the calendar invite from focusmate
    const events = cal.getEvents(yesterday, in3weeks, { search: 'Focusmate Session' });

    if (events.length === 0) {
      Logger.log('No upcoming events found at this time');
      return;
    }

    // Update Calendar Entries
    for (let i = 0; i < events.length; i++) {
      let event = events[i];

      // Sets the event color to red, confirms invite with Yes response and changes the Title
      let changeColor = event.setColor("11");
      let changeStatus = event.setMyStatus(CalendarApp.GuestStatus.YES);
      let changeTitle = event.setTitle("Focus Time - Don't Book Over");

    }
    // Log the # of events updated.
    Logger.log('Updated %s events.', events.length.toPrecision(1));

  } catch (err) {
    // TODO (developer) - Handle exception from Calendar API
    Logger.log('Failed with error %s', err.message);
  }
}