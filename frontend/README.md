
# Front End Documentation

The IntelliMart front-end has been implemented with the help of ReactJS, an efficient, declarative, and flexible open-source JavaScript library, developed by Facebook for building interactive User interfaces, as a wireframe. Industry grade design practices have been incorporated in our product. Functionality is the core of IntelliMart as state management has been thoroughly State Management provided by node package modules. Design and Functionality are interwoven to provide a clean and user-friendly front end that performs.

## **Why ReactJS?**

Vanilla HTML, CSS with Javascript along with web development frameworks like Angular, VueJS, Ember are being used for creation of websites nowadays and were considered while deciding upon the Front-End of our project. However, the *declarative* nature of ReactJS also makes designing UI seamless and following reasons:

- **JSX -** JSX is a modified version of JavaScript which makes the syntax almost identical to HTML. This highly increases readability as well as easy to map out the layout of the Website.
- **Server Side rendering -** React running on React DOM (A virtual DOM not needing the direct intervention of the browser for every update) can be rendered on the server-side, which increases the performance of the application.
- **Render Function -** It is easy to know what is being rendered and by which component it takes place due to everything being exported as a function/component. This increases the modularity of the code and makes it reusable and clearer to understand.
- **Huge community support -** For a beginner, it is always troublesome getting into a new language or framework but for almost any kind of problem one might face, there is a dedicated community around to help and provide support. The library and development support is also extensive for ReactJS and it is one of the easiest ones to find support for.

## **Consuming APIs; User sees only what matters:**

An important aspect of linking the Front-End and the Back-End is that data stored in the database should be manipulated with **Components** on the Front-End. For example, a new entry is created in the Users table on every User Registration. Similarly, any user who has ordered food previously would be able to see past orders fetched from the database.

These accesses to the database are done using the APIs and are implemented to the Front-End using ‘**Axios’** module. Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations.

Certain application states need to be available all the time as they can be set in one component and be retrieved in another and transfer of these states using function calls through hierarchy of the application can be both hard to debug as well as affect the performance of application.

## **Application Views:**

The IntelliMart Website has a number of Application views serving User’s each and every need creating a wholesome User Experience. The various views created have been listed below:

- **Home Page:** The Home of IntelliMart, providing the user with a refreshing landing section, and options to Login, Browse and see their cart (if the User is logged in).

    ![image](https://user-images.githubusercontent.com/61727284/119465717-8e313900-bd61-11eb-9249-00c593a47ffd.png)


- **Login/Sign Up Page:**  These pages allow users to Login or Sign Up for an account to avail the IntelliMart services.

    ![image](https://user-images.githubusercontent.com/61727284/119465756-98ebce00-bd61-11eb-8357-58b1ce997b63.png)

- **Contact Us Page:** Powered by typeform, this pages allows users to contact the IntelliMart team for their queries

    ![image](https://user-images.githubusercontent.com/61727284/119465824-aa34da80-bd61-11eb-913b-1fd3fcb1c9da.png)

- **Stores Page:** It contains a list of all stores available on IntelliMart along with relevant information.

    ![image](https://user-images.githubusercontent.com/61727284/119465851-b15be880-bd61-11eb-8498-b1808037064e.png)

- **Cart Page:** Items added to a User’s Cart are displayed and slots for the selected items can be booked on this page.

    ![image](https://user-images.githubusercontent.com/61727284/119465877-b882f680-bd61-11eb-91bb-409c0034c437.png)

## How to run the front end?

- Clone the Repository

    `git clone {repository link}`

- Install Node Package Module Dependencies for the React app to function. 

    `npm install`

- Run the Front End Application on your local server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

    `npm start`
