import React from "react";

const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");

export type AsciiArtProps = {
    text: string;
};
export const AsciiArt = (props: AsciiArtProps) => {
    return <Gradient name="rainbow">
        <BigText text={props.text} />
    </Gradient>;
};
