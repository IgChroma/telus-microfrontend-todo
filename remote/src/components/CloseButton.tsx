import React from 'react';
import styled from 'styled-components';

interface CloseButtonProps {
    onClick: () => void;
}

const StyledXButton = styled.button`
  border: none; 
  border-radius: 50%;
  height: 32px;
  width: 32px;

  padding: 4px;
  cursor: pointer;
`;

const buttonSVG = <svg width="24px" height="24px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Free-Icons" stroke="none" strokeWidth="1" fill="none">
        <g transform="translate(-229.000000, -156.000000)" id="Group" stroke="darkred" strokeWidth="2">
            <g transform="translate(227.000000, 154.000000)" id="Shape">
                <circle cx="12" cy="12" r="9" />
                <path d="M15,9 L9,15 M15,15 L9,9" />
            </g>
        </g>
    </g>
</svg>

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return (
        <StyledXButton title='Delete' type="button" data-testid="deleteButton" onClick={onClick}>
            {buttonSVG}
        </StyledXButton>
    );
};

export default CloseButton;