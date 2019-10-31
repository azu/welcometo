import React from "react";
import { Box } from "ink";


const termImg = require("term-img");
const terminalImage = require("terminal-image");
export type ImageProps = {
    src: string;
    width: string;
    height: string;
}

export class Image extends React.Component<ImageProps, { image: string }> {
    constructor(props: ImageProps) {
        super(props);
        this.state = {
            image: ""
        };
    }

    componentDidMount() {
        const fallback = () => {
            terminalImage.buffer(this.props.src).then((result: string) => {
                console.log(result);
            });
            return "";
        };
        const result = termImg.string(this.props.src, {
            width: this.props.width,
            height: this.props.height,
            fallback
        });
        if (result) {
            this.setState({
                image: result
            });
        }
    }

    render() {
        return <Box paddingLeft={25}>{this.state.image}</Box>;
    }
}
