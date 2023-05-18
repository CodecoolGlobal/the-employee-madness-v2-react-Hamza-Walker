
1. **On the Create Record page** allow specifying **Years of experience** when the selected role is not *Junior* - when *Junior* is selected, users can't specify this (the input field is not visible).

2. Make sure that **Years of experience** is persisted correctly (0 for *Junior* and the specified amount otherwise).

3. Create a new route in the app that displays **employee records** (just like on the Record List view - no need for edit/delete links) by **Years of experience**, e.g. when a user sees `.../years-of-experience/8` only employees with that much experience are visible.

4. Invalid routes like `.../years-of-experience/-1` or `.../years-of-experience/dogs` should result in users seeing a 404 or error page.

5. Display **Years of experience** on the Record List page in a new "column".

6. Change the default sort order of the Record List page to be descending by **Years of experience**.