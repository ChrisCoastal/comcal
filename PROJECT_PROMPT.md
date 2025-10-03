##Scheduler Project Overview

###Core Purpose
The Scheduler application will support the coordination, scheduling, and task management of various kinds of communications (events, news releases, social media) between the user's organization and the public.

###Target Users
Users will include:

- event owners (core and primary users who create and update entries within the calendar)
- scheduler admins (users who review and approve entries)
- executive (users who view scheduled entries from a high level, such as a dashboard, for a broad overview and situational awareness)

##Functional Requirements
This will be a full stack application that gives real-time updates to multiple user clients. The app UI must be responsive and key information presented clearly for mobile and desktop users.

###Communications Object
Each entry created consists of the data:
Overview

- Category `<string union>` _dropdown_ type of entry being created (e.g. event, news release, social media); type Category = "event" | "news release" | "tv" | "radio" | "social media" | "observance" | "conference" | "fyi" | "placeholder" | "other"
- Title `<string>` _input_ title of entry
- Related to `<string>` _dropdown_ a reference to another existing entry; type RelatedTo = "parent" | "child" | "related"
- Summary `<string>` _textarea_ 1-2 paragraph description of entry
- Issue `<boolean>` _checkbox_ denotes if the entry is particularly sensitive or important
- Significance `<string>` _textarea_ why the entry is relevant and needs to be communicated
- Lead Organization `<string>` _dropdown_ the organization that is directing the communication being entered; type LeadOrganization = "federal" | "provincial" | "crown corp" | "other"
  Planning
- Comms Contact `<string>` _dropdown_ user creating/owning the entry; type CommsContact = Pick(User, "Firstname" | "Lastname")
- Comms Material `<string array>` _dropdown multiselect_ a list of comms materials that are a part of the entry; type CommsMaterials = "news release" | "backgrounder" | "speaking notes"
- Notes `<string>` _textarea_ an open text area for notes by the user
  Schedule
- Schedule status `<string union>` _dropdown_ how 'known' or firmed-up the date/time are; type ScheduleStatus = "unknown" | "tentative" | "confirmed"
- Start date/time `<datetime>` _date/time picker_ the date and time the communication will start
- End date/time `<datetime>` _date/time picker_ the date and time the communication will end
- All day `<boolean>` _checkbox_ a boolean to indicate it is an all day event
- Scheduling notes `<string>` _textarea_ a textarea for user notes related to scheduling
  Event
- Representatives `<string union>` _dropdown multiselect_ who will be at the event; type Representatives = "Joe", "Jane", "David", "Ella"
- Location `<object>` _multiple inputs_ where event will take place; interface Location = {address: string; city: string;}

#### Example Entry

json
{
"category": "event",
"title": "Community Town Hall",
"summary": "Public town hall with Q&A and representative taking questions from the media.",
"issue": false,
"significance": "Community outreach",
"leadOrganization": "City Council",
"commsContact": "jane.doe@example.com",
"commsMaterial": ["press release", "speaking notes"],
"scheduleStatus": "tentative",
"startDate": "2025-10-01T18:00:00Z",
"endDate": "2025-10-01T20:00:00Z",
"allDay": false,
"representatives": ["Mayor"],
"location": {"address": "123 Main St", "city": "Springfield"}
}

###Core User Flow
Phase one of the app build will focus on the flow of _event owners_. The flow goes through basic crud actions:

1. User views list of current entries (sortable and filterable table)
2. User clicks to create a new entry
3. User fills in form to fulfill above Communications Object
4. User reviews their entry to confirm accuracy and submits form
5. New entry is added to list of entries
6. User updates entry as needed by navigating to the entry detail page

###Notifications and Collaboration
There are multiple intersecting user flows within the application. However, phase 1 will only focus on the core user flow above.

##Technical Architecture
###Platform
This application will be a web app used by desktop and mobile devices. It will use the following technologies:
####Frontend

- Next.js 15 (SSR patterns)
- Tanstack Query
- Tanstack Table
- Shadcn
- React-Hook-Form
- Zod
- Tailwind
- GraphQL
- Websockets for live updates

####Server

- Nest.js
- GraphQL

###DB

- Supabase postgres

###Auth
For now, mock users can be assumed. Replace later with Supabase or NextAuth.js.

##UI/UX
###Information Architecture (Key Views)
There will only be 4 pages for phase 1 of the build:

1. Entries list (landing page; a paginated, tabular list view using Tanstack Table of all the entries currently in the application; filterable and sortable; clicking on an entry in the table will navigate to the `Entry detail` page)
2. Entries calendar (a calendar view of all the entries in the application; has day/week/month toggle and is filterable; essentially a different view layout of the same data as the `Entries list` page)
3. New entry form (a form to create a new entry; fulfills the `Communications Object` schema)
4. Entry detail (a detail view of a created entry; follows the logical hierarchy and grouping of information in the `Communications Object`; users can update or delete the entry from this view)

###Responsiveness
The web application must be responsive. Particular care and consideration needs to be given for handling tabular entries and calendar views for mobile screens, while maintaining usability and exceptional UX for mobile users.

###UI Styling
Use Tailwind for styling whenever possible, keeping classes reusable and avoiding duplication.

###UX and Accessibility

- All CRUD must be real-time synced via WebSockets.
- Table and calendar data must update in real-time.
- Aim for a minimum of WCAG 2.1 AA and warn of any possible issues.
