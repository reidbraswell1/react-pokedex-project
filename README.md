# React Pokemon Index

## Getting Started

- Open your command line and navigate to your repos directory (if you do not have a repos folder, then you can use mkdir repos to create one)
- Use this template repository to start a new project in your repos folder: git clone <repo_name>
  cd repo_name to navigate into your new repo directory
- Make sure to run `npm install` to fetch the dependencies for the project
- Start Visual Studio Code and select 'Open Folder'. Then select repo_name to open the folder in the editor (or just type code . in your terminal inside the repo directory)
- Follow the instructions on the README.md file to complete exercises
- Open the app.js file to get started

## Project

### Objective

- Your objective is to call an API that returns a list of pokemon. You will display the pokemon to the screen. You will provide a few search functionalities for filtering the display of pokemon. You may use class components or react hooks, your preference. Below are instructions:

### Instructions

- Fetch data from this open source JSON (based on the PokemonGO
  game): "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"

- Display the list of Pokemon however you like, making sure to show
  their “name,” “num,” “type,” and “weaknesses.”

- Make this list searchable via a search box. For simplicity, just search through the names of the Pokemon,
  only.

- Also, make this list filterable via the “type” and “weaknesses” fields.

- You should be able to apply multiple filters at a time. This means that the search should narrow by name, or type, or weakness, depending on how the user (or you as the developer) designs the search.

  - For example, I may want to search for type "Grass" and weakness "Fire". The filtered Pokemon should be both of type "Grass" and weakness "Fire"

- NOTE: You may use checkboxes, dropdowns, text input fields, or any other search filter method.

- REMEMBER: The main goal is functionality. You can always come back and style/refactor/optimize/etc.

## BONUS

- Create a generic “Details Page” component for each Pokemon, showing details related to the selected Pokemon

#### Extra

- On each Pokemon's details page, create a link to the details page of the other pokemon (if any) being referenced by that Pokemon object (i.e. “next_evolution”)

- Also, create a link to a Pokemon’s Details Page from their listing
  in your master list.

- Add a Back button from the Details Page to
  return to the index list (main page).

