import React from "react";

export const ValidatedInput = ({
                                   value,
                                   error,
                                   handleChange,
                                   type = "text",
                                   name,
                                   placeholder,
                               }) => {
    return (
        <>
            <input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                name={name}
                type={type}
                className="input mt-52px"
            />
            {error && <span className="error-message">{error}</span>}
        </>

    )
}
