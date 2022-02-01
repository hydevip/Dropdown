import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Dropdown from './Dropdown'

const LIST_MOCK = [
    {
        "firstName": "Harriet",
        "lastName": "McKinney",
        "email": "harriet.mckinney@test.com",
        "id": 323
    },
    {
        "firstName": "Harriet",
        "lastName": "Banks",
        "email": "harriet.banks@test.com",
        "id": 139
    },
    {
        "firstName": "Mathilda",
        "lastName": "Summers",
        "email": "mathilda.summers@test.com",
        "id": 142
    },
    {
        "firstName": "Eugene",
        "lastName": "Wong",
        "email": "eugene.wong@test.com",
        "id": 140
    },
    {
        "firstName": "New",
        "lastName": "Manager",
        "email": "new.manager@test.com",
        "id": 340
    },
    {
        "firstName": "Marguerite",
        "lastName": "Ryan",
        "email": "marguerite.ryan@test.com",
        "id": 145
    },
    {
        "firstName": "Donald",
        "lastName": "Butler",
        "email": "donald.butler@test.com",
        "id": 171
    },
    {
        "firstName": "Jim",
        "lastName": "Carlson",
        "email": "jim.carlson@test.com",
        "id": 151
    },
    {
        "firstName": "Alta",
        "lastName": "Maxwell",
        "email": "alta.maxwell@test.com",
        "id": 141
    }
]


describe('Dropdown Component ', ()=>{
    
    beforeEach(() => {
        let dropdownCallback:jest.Mock;

        dropdownCallback = jest.fn()
        render(<Dropdown onSelection={dropdownCallback} optionsList={LIST_MOCK} placeholder={'Choose test'} />
        )
    })

    test('renders properly', async ()=> {
        let dropdownInput = await screen.findByPlaceholderText(/choose test/i)
        expect(dropdownInput).toBeInTheDocument()
    })

    test("has the correct placeholder", async ()=>{
        let dropdownInput = await screen.findByPlaceholderText(/choose test/i);
        expect(await dropdownInput.getAttribute("placeholder")).toBe("Choose test")
    })

    test("allows the user to input a search value", async ()=>{
        let dropdownInput = await screen.findByPlaceholderText(/choose test/i)
        userEvent.type(dropdownInput,'Paul Lungu')
        expect(dropdownInput).toHaveValue('Paul Lungu')
    })
    test('renders the list with options when the input is focused', async ()=>{
        
        let dropdownInput = await screen.findByPlaceholderText(/choose test/i);
        let list= await screen.queryByTestId("list")
        
        expect(list).not.toBeInTheDocument()
        userEvent.click(dropdownInput)

        list= await screen.findByTestId("list")
        expect(list).toBeInTheDocument()
    })
    test('selects a manager when the user types a value within INPUT and hits ENTER', async ()=>{
        let dropdownInput = await screen.findByPlaceholderText(/choose test/i);

        userEvent.type(dropdownInput,'tmck{enter}')

        expect(dropdownInput).toHaveValue('Harriet McKinney')
    })
})