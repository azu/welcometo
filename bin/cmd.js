#!/usr/bin/env node

const meow = require("meow");
const { start } = require("../lib/index");
const cli = meow(`
    Usage
      $ welcometo [@organization]
 
    Input
      @organization GitHub organization name
 
    Examples
      $ npx welcometo github
`, {
    autoHelp: true,
    autoVersion: true
});

const organizationName = cli.input[0];
if (!organizationName) {
    cli.showHelp();
}
start({
    organization: organizationName
}).catch(error => {
    console.error(error);
});
