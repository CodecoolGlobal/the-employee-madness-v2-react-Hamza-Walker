# [Question 6:](https://www.notion.so/Question-6)

`the question assumes that there is a years of experience field in the employee model`

Extra task : add years of experience to the employee model and repopulate the data 

## Modify the Employee Update Page

- Make a new number field to add **Years of experience** for the employee.
- When the level is *Junior*, the users can't specify this (the input field is not visible).
- The default value should be 0.
[X]
11 min 30 sec
## Create a New Frontend Route

- Create a new frontend route in the app that displays employee records by **Years of experience** inside the URL.
- For example, when a user enters "../years-of-experience/8", they will see only employees with greater than or equal to that experience.
- The data should be fetched from the backend.
[X]
17 min 30 sec
## Implement Sorting and Filtering

- Implement sorting, both ascending and descending, for the **name** field on the employee records page.
- This sorting can be done either from the frontend or the backend.
[X]
10 min 30 sec
## Handle Invalid Routes

- Invalid routes like "../years-of-experience/-1" or "../years-of-experience/dogs" should result in users seeing a 404 or error page.
- The backend should also return a 404 in this case.
[X]
7 min 53 sec
`some issues with understanding how to return a 404 from the backend`
## Display Years of Experience on the Employees List Page

- Display **Years of experience** as a new "column" on the employees list page.