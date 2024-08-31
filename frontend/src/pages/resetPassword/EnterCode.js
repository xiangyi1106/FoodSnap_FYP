import React from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useState, useRef } from 'react';

export default function EnterCode({code, setCode, setError}) {

    // Refs to control each digit input element
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.forEach(ref => {
            ref.current.value = '';
        });
        inputRefs[0].current.focus();
        setCode('');
    }

    // // Call our callback when code = 6 chars
    // useEffect(() => {
    //     if (code.length === 6) {
    //         if (typeof callback === 'function') callback(code);
    //         resetCode();
    //     }
    // }, [code]); //eslint-disable-line

    // // Listen for external reset toggle
    // useEffect(() => {
    //     resetCode();
    // }, [reset]); //eslint-disable-line

    function handleInput(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        // Only allow single character input
        if (input.value.length > 1) {
            input.value = input.value.charAt(0);
        }

        // Update code state with single digit
        const newCode = [...code];
        // Convert lowercase letters to uppercase
        if (/^[a-z]+$/.test(input.value)) {
            const uc = input.value.toUpperCase();
            newCode[index] = uc;
            inputRefs[index].current.value = uc;
        } else {
            newCode[index] = input.value;
        }
        setCode(newCode.join(''));

        input.select();

        if (input.value === '') {
            // If the value is deleted, select previous input, if exists
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (nextInput) {
            // Select next input on entry, if exists
            nextInput.current.select();
        }
    }


    // Select the contents on focus
    function handleFocus(e) {
        e.target.select();
        setError("");
    }

    // Handle backspace key
    function handleKeyDown(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput) {
                previousInput.current.focus();
            }
        }
    }

    // Capture pasted characters
    const handlePaste = (e) => {
        const pastedCode = e.clipboardData.getData('text');
        if (pastedCode.length === 6) {
            setCode(pastedCode);
            inputRefs.forEach((inputRef, index) => {
                inputRef.current.value = pastedCode.charAt(index);
            });
        }
    };

    // Clear button deletes all inputs and selects the first input for entry
    const ClearButton = () => {
        return (
            <Tooltip title="Clear all">

                <button
                    onClick={resetCode}
                    style={{ outline: "none", border: "none", backgroundColor: "transparent", marginLeft: "5px" }}
                >
                    <ClearOutlinedIcon />
                </button>
            </Tooltip>
        )
    }
    return (
        <div className='enter_code'>
            <div className='enter_code_wrapper'>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                        key={index}
                        type="number"
                        maxLength={1}
                        onChange={(e) => handleInput(e, index)}
                        ref={inputRefs[index]}
                        autoFocus={index === 0}
                        onFocus={handleFocus}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        min={0}
                        max={9}
                    // disabled={isLoading}
                    />
                ))}
                {
                    code.length
                        ?
                        <ClearButton />
                        :
                        <></>
                }
            </div>
        </div>
    )
}
