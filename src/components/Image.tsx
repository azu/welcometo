import React from "react";
import { Box } from "ink";

const termImg = require("term-img");
const terminalImage = require("terminal-image");

export type ImageProps = {
    src: string;
    width: string;
    height: string;
}

export const Image = (props: ImageProps) => (
    <Box paddingLeft={25}>
        {termImg.string(props.src, {
            width: props.width,
            height: props.height,
            fallback: async () => {
                return await terminalImage.file(props.src);
            }
        })}
    </Box>
);
