import React from 'react';
import { toggleDarkMode } from "../components/todo/utils"
import "./darkMode.css";

export const DarkModeToggle = () => {
    return (<div className="tdnn" onClick={toggleDarkMode}>
        <div className="moon">
        </div>
    </div>)
}