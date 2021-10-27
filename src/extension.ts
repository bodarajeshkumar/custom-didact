
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
export function activate(context: vscode.ExtensionContext) {

	const panel = vscode.window.createWebviewPanel(
		'custom Tutorial',
		'Custom Tutorial',
		vscode.ViewColumn.One,
		{
		  enableScripts: true
		}
	  );

	  panel.webview.html = getWebviewContent();

	  // Handle messages from the webview
	  panel.webview.onDidReceiveMessage(
		async message => {
		 vscode.window.showInformationMessage(message.command);
		  switch (message.command) {
			case 'sendcommand':
				var terminal;
				var terminals = vscode.window.terminals;
				var testterminal = terminals.find(x=>x.name === "testterminal");
				if(!testterminal)
				{
					terminal = vscode.window.createTerminal("testterminal");
				}
				else {
					terminal = terminals.find(x=>x.name === "testterminal");
				}
				if(terminal)
				{
					await terminal.show();
					message.text = message.text.replace("${CHE_PROJECTS_ROOT}","/Users/rajeshkumarboda/Playground/projects");
					await terminal.sendText(decodeURIComponent(message.text));
				}
			  return;
		  }
		},
		undefined,
		context.subscriptions
	  );
  }
  
  function getWebviewContent() {
	let webviewhtml = fs.readFileSync(path.join(__filename, '..', '..', 'resources') + "/webview.html", 'utf8');
	return webviewhtml;
  }