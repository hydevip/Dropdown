export interface ManagerInterface {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
    // I could have added more details, but I'll keep it simple as this it's just a test.
}

export interface ManagersState{
    managersList: ManagerInterface[];
    selectedManager: null | ManagerInterface
}
