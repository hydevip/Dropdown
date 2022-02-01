# Dropdown Component

![image](https://user-images.githubusercontent.com/35841222/152028444-9d2837d6-a213-4d87-a56f-59aba27e688b.png)


This Dropdown Component was built using Node JS v17.2.0, React 17.0.2 and Typescript, and Redux-Toolkit.
The Dropdown component has its own internal state.
As props, the component accepts a list with managers, a value, a callback triggered on selection and a placeholder. The Value/ Placeholder are optional.
The main App component has its own Redux store setup using Redux-Toolkit that has 2 actions :
 1. addManagersList: used to store the fetched list options
 2. newSelection: used to update the store with the last dropdown selection

The App component also displays details abouth the latest selection.
All the below mentioned aspects are covered:

When the user clicks into the input field, he/she sees the full list of managers.
The list shows up to 2 managers, the rest can be seen by scrolling inside the list.
When the user starts typing into the input field, matching results appear in the list.
	
Managers are filtered on both first name and last name.
			
Filtering is case insensitive.	
		
Managers are filtered across first name and last name (eg. “tMc” =&gt; Harriet McKinnley.)
When user confirms the selection with the enter key, the full name of the selected manager is displayed in the input field and the list of available managers hides. (Bonus)
User can navigate the list of managers with arrow up and arrow down keys. (Bonus)

When the input loses focus, the list of available managers disappears and the entered value is being kept.
When the user clicks back into the input field a list of filtered managers by the kept value is shown.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. The project has one suite with 5 tests.
 PASS  src/Components/Dropdown/Dropdown.test.tsx
  Dropdown Component 
    ✓ renders properly (42 ms)
    ✓ has the correct placeholder (12 ms)
    ✓ allows the user to input a search value (104 ms)
    ✓ renders the list with options when the input is focused (29 ms)
    ✓ selects a manager when the user types a value within INPUT and hits ENTER (38 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.997 s, estimated 2 s

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
