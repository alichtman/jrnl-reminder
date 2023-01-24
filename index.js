#!/usr/bin/env node

const execa = require("execa");
const nodeNotifier = require('node-notifier');
const jrnl = (...args) => execa("jrnl", args);

(async () => {
    const desiredFrequency = "1 minute"
    const recentEntries = (await jrnl("-from", `${desiredFrequency} ago`)).stdout;
    if (recentEntries != "") {
        console.log(`jrnl has entries within the last ${desiredFrequency}`);
        return;
    }

    var notifier = new nodeNotifier.Notification();
    notifier.notify({
        title: "jrnl reminder",
        message: "You haven't added a jrnl entry in a while. Write one now?",
        closeLabel: "Not now",
        reply: true,
        wait: true,
        timeout: 60
    },
        function (err, response, metadata) {
            jrnl(response);
        }
    );
})();
