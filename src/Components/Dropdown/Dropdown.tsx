import React, { useEffect, useState, useRef } from 'react';
import { ManagerInterface } from '../../types/types';
import './Dropdown.css';

interface DropdownProps {
    onSelection: (test: any) => void;
    optionsList: ManagerInterface[];
    value?: ManagerInterface;
    placeholder?: string;
}


const Dropdown = (props: DropdownProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<ManagerInterface[]>([])
    const [preselectOption, setPreselectOption] = useState<number>(0)

    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (!!props.value) {
            setSearchValue(`${props.value.firstName} ${props.value.lastName}`)
        }
    }, [props.value])

    useEffect(() => {
        if (searchValue.length > 0 && props.optionsList.length > 0) {
            let test = props.optionsList.filter(item => {
                let finalSearchValue = searchValue.replaceAll(' ', '').toLowerCase()
                let fullname = item.firstName + item.lastName;
                fullname = fullname.replaceAll(' ', '');
                fullname = fullname.toLowerCase();
                if (fullname.includes(finalSearchValue)) {
                    return true;
                }
            })
            setFilteredOptions([...test])
        } else (
            setFilteredOptions(props.optionsList)
        )

    }, [props.optionsList, searchValue])

    const selectionHandler = () => {
        if (filteredOptions.length > 0) {
            let tempSelection = { ...filteredOptions[preselectOption] }
            setSearchValue(`${tempSelection.firstName} ${tempSelection.lastName}`)
            inputBlurHandler()
            props.onSelection({ ...filteredOptions[preselectOption] })
        }
    }

    const inputBlurHandler = () => {
        inputRef.current?.blur()
        setIsFocused(false)
    }

    const inputFocusHandler = () => {
        setIsFocused(true)
        setPreselectOption(0)
    }

    const listItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        evt.preventDefault();
        evt.stopPropagation()
        selectionHandler()
    }

    const keyPressHandler = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        switch (evt.key) {
            case "Enter":
                selectionHandler()
                break;
            case "ArrowUp":
                setPreselectOption(prevState => prevState > 0 ? prevState - 1 : prevState)
                listRef.current?.scrollBy(0, -70)
                break;
            case "ArrowDown":
                if (preselectOption < filteredOptions.length - 1) {
                    listRef.current?.scrollBy(0, 70)
                    setPreselectOption(prevState => prevState + 1)
                }
                break;
            default:
                break;
        }
    }

    const renderArrowIcon = () => (<svg className={`arrow-icon ${isFocused ? "arrow-up" : ''}`} width="10" height="5" viewBox="-2.5 -5 75 60" preserveAspectRatio="none">
        <path d="M0,0 l35,50 l35,-50" fill="none" stroke="black" strokeLinecap="round" strokeWidth="15" />
    </svg>)

    const renderOptionsList = () => {
        return (<>
            {filteredOptions.length > 0 &&
                <ul ref={listRef}
                    data-testid={"list"}
                >
                    {filteredOptions.map((item, index) =>
                        <li
                            data-testid={"listItem"}
                            onMouseEnter={() => { setPreselectOption(index) }}
                            onMouseDown={(evt) => listItemClickHandler(evt, index)}
                            key={item.id}
                            className={`list-item ${index === preselectOption ? "preselected" : ''}`} >
                            <div className="list-item-wrapper">
                                <div className="short-name">
                                    <p>{item.firstName.charAt(0).toUpperCase()}{item.lastName.charAt(0).toUpperCase()}</p>
                                </div>
                                <div className="fullname-and-email">
                                    <p className="fullname">{item.firstName} {item.lastName}</p>
                                    <p className="email">{item.email}</p>
                                </div>
                            </div>
                        </li>)}
                </ul>}
        </>)
    }

    return (
        <div className="dropdown-container"
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
        >
            <div className="input-wrapper">
                <input
                    onBlur={(evt) => { evt.preventDefault() }}
                    placeholder={props.placeholder ? `${props.placeholder}` : "Search..."}
                    onChange={(evt) => setSearchValue(evt.target.value)}
                    onKeyDown={(evt) => keyPressHandler(evt)}
                    ref={inputRef}
                    value={searchValue}
                />
                {renderArrowIcon()}

            </div>
            {isFocused ? renderOptionsList() : null}
        </div>);
}

export default Dropdown;