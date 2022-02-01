import React, { useEffect } from 'react';
import { RootState } from './redux-store/store';
import { useSelector, useDispatch } from 'react-redux';
import { newSelection, addManagersList } from './redux-store/slices/managersSlice';
import Dropdown from './Components/Dropdown/Dropdown';
import { MANAGERS } from './managers'
import './App.css';
import { ManagerInterface } from './types/types';


function App() {

  const selectedManager = useSelector((state: RootState) => state.managers.selectedManager)
  const managersList = useSelector((state: RootState) => state.managers.managersList)
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchManagers = async () => {
      const response = await fetch(`https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json`);

      if (response.status === 200) {
        const fetchedData = await response.json()

        const fetchedManagersList: ManagerInterface[] = fetchedData.data.map((item: any) => (
          {
            firstName: item.attributes.firstName,
            lastName: item.attributes.lastName,
            email: `${item.attributes.firstName.toLocaleLowerCase()}.${item.attributes.lastName.toLocaleLowerCase()}@test.com`,
            id: +item.id
          } as ManagerInterface))

          console.log(fetchedManagersList);
          
        dispatch(addManagersList(fetchedManagersList))
      } else{
        throw "Failed to fetch the managersList";
      }
    }

    try {
      fetchManagers()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const managers: ManagerInterface[] = MANAGERS.data.map(item => (
    {
      firstName: item.attributes.firstName,
      lastName: item.attributes.lastName,
      email: `${item.attributes.firstName.toLocaleLowerCase()}.${item.attributes.lastName.toLocaleLowerCase()}@test.com`,
      id: +item.id
    } as ManagerInterface))

  return (
    <div className="App">
      <div className="dropdown-wrapper">
        {
          !!managersList.length ? <Dropdown placeholder="Choose Manager" value={selectedManager? selectedManager:undefined} onSelection={(manager: ManagerInterface) => dispatch(newSelection(manager))} optionsList={managers ? managers : []} /> : "No managers provided"
        }
      </div>
      <div className="manager-details">
        {selectedManager? JSON.stringify(selectedManager):"Select a manager."}        
      </div>
    </div>
  );
}

export default App;
