  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

   Key Features Implemented:

Input Section:

Form fields for Subject Name, Professor Name, and Hours per Week
Optional constraints for preferred days and time slots
Add multiple subjects with visual cards showing all details
Remove subjects individually
AI Arrangement Algorithm:

<img width="1786" height="868" alt="Screenshot 2026-01-17 185527" src="https://github.com/user-attachments/assets/e835fb2a-83a4-4bbf-aea2-242990a8a15a" />

<img width="1894" height="918" alt="Screenshot 2026-01-17 185326" src="https://github.com/user-attachments/assets/65453426-2c23-4ce4-8acc-1732faa48d32" />

Smart scheduling logic that avoids professor conflicts
Distributes classes evenly across Monday-Friday
Respects preferred days and time slots
Prioritizes subjects with more constraints
Time slots: 9 AM - 5 PM (8 periods)
Output Section:

Beautiful timetable grid with days as columns, time slots as rows
Each cell shows Subject Name + Professor Name
Color-coded subjects with distinct colors
Legend showing all subjects
Export to PDF and Excel functionality
Regenerate button to create new arrangements
Modern UI/UX:

Responsive design for desktop and mobile
Gradient backgrounds and smooth transitions
Shadow effects and hover states
Color-coded subject cards
Toast notifications for user feedback
Statistics cards showing totals
Extra Features:

Local storage - automatically saves your timetable
Edit capability - remove subjects and regenerate
Clear all data option
Smooth scrolling to timetable after generation
Empty state with feature highlights
The scheduling algorithm intelligently:

Prevents professor overlaps
Distributes classes across different days
Respects user preferences
Handles complex constraint scenarios
You can now add subjects, set preferences, and generate a conflict-free timetable that can be exported to PDF or Excel!
