var watson = require('watson-developer-cloud');
var readline = require('readline');

var dialog_service = watson.dialog({
    // replace the username and password to your Bluemix service credentials
    username: 'b5e095a1-5653-4d82-a051-11a8c94dc1c7',
    password: 'tyzA5wVGs0Wy',
    version: 'v1'
});

var params = {
    conversation_id: '',
    dialog_id: 'bf72469a-48fd-407c-bd38-9b410d735080',
    client_id: '',
    input: 'hi'
};

var watson_prompt = "Watson: ";
var me_prompt = "Me: ";

var conversation_id;
var client_id;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt(me_prompt);

rl.prompt();

rl.on('line', (input) => {
    if (input === "quit" || input === "bye") {
        console.log("Quiting...");
        rl.close();
    }

    params.input = input;
    params.conversation_id = conversation_id;
    params.client_id = client_id;

    dialog_service.conversation(params, function(err, conversation) {
        if (err)
            console.log(err);
        else {
            for (var i = 0; i < conversation.response.length; i++) {
                if (i===0) console.log(watson_prompt+conversation.response[i]);
                else console.log(conversation.response[i]);
            }
        }

        if (conversation_id!==null) {
            conversation_id = conversation.conversation_id;
            client_id = conversation.client_id;
        }
        rl.prompt();
    });
});

rl.on('close', function() {
    console.log('bye bye!');
    process.exit(0);
});
