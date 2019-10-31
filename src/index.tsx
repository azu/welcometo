import React from "react";
import { render } from "ink";
import { AsciiArt } from "./components/AsciiArt";
import { Image } from "./components/Image";

const got = require("got");
export const start = async ({ organization }: { organization: string }) => {
    const normalizeOrganizationName = organization.replace(/^@/, "").trim();
    const gitHubAvatarURL = `https://github.com/${encodeURIComponent(normalizeOrganizationName)}.png`;
    const { body } = await got(gitHubAvatarURL, { encoding: null });
    const App = () => (
        <>
            <AsciiArt text={"WELCOME!"}/>
            <Image src={body} width={"128px"} height={"128px"}/>
        </>

    );
    const app = render(<App/>, {
        exitOnCtrlC: true
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            app.unmount();
            resolve();
        }, 1000 * 10);
    });
};
