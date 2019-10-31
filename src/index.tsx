import React from "react";
import { render } from "ink";
import { AsciiArt } from "./components/AsciiArt";
import { Image } from "./components/Image";

const got = require("got");
const isITerm = process.env.TERM_PROGRAM === "iTerm.app";
const fetchAvatarBuffer = async (name: string) => {
    const gitHubAvatarURL = `https://github.com/${encodeURIComponent(name)}.png`;
    if (isITerm) {
        const { body } = await got(gitHubAvatarURL, { encoding: null });
        return body;
    }
    const headResult = await got.head(gitHubAvatarURL);
    const resizeURL = `${headResult.url}&s=48`;
    const { body } = await got(resizeURL, { encoding: null });
    return body;
};
export const start = async ({ organization }: { organization: string }) => {
    const normalizeOrganizationName = organization.replace(/^@/, "").trim();
    const body = await fetchAvatarBuffer(normalizeOrganizationName);
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
