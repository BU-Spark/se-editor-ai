'use client';

import React from "react";
import '../styles/ActionButton.css';

interface ActionButtonProps {
  text: string;
  onClick: () => void; // Adjust this type if your onClick handler expects any arguments
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick }) => (
    <button onClick={() => {}}>{text}</button>
);

export default ActionButton;
