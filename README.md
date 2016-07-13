# Irregular Shift Importer
An application to insert an irregular, custom pattern based shift into Google Calendar

The pattern is defined by the scheduler at my girlfriend's work. It is as follows:

 * A8 states a shift starting 07:00, lasting 8 hours
 * D9 states a shift from 10:00 to 19:00
 * Hb72 is a shift from 14:30 to 22:00
 * Hbs0 is the night shift, from 14:30 to 7:30 the next morning

## Why this app?
We keep a shared Google Calendar where she inserts het schedule whenever she gets a new one. As a developer I thought it would be a good idea (and practice) to create an app for her that she could use to do so. The idea is to provide a GUI where she can select a date and insert the shift's pattern, per shift. The app will translate the pattern to a datetime format and provide an 'import' button which imports the schedule to our shared Google Calendar.

For me, this app is just practice. I want to keep up with the latest trends in frontend development. I'm going to use React and maybe later I'll re-create it with Angular 2.0.
