import {
  onExit,
  onPrint,
  onInput,
  setGameOptions,
  getGameState,
  gameMain,
} from "./superstartrek.mjs";

var term = new Terminal({
  fontSize: 14,
  cols: 80,
  rows: 50,
});
term.open(document.getElementById("terminal"));
term.focus();

onExit(function exit() {
  // TODO: reset the game without a reload.
  window.location.reload();
});

onPrint(function print(...messages) {
  //console.log(messages.join(""));
  term.write(messages.join("") + "\r\n");
});

onInput(function input(prompt) {
  return new Promise((resolve) => {
    let str = "";
    term.write(`${prompt}? `);
    const initialX = term._core.buffer.x;
    const disposeOnData = term.onData((data) => {
      if (data == "\n" || data == "\r") {
        term.write("\r\n");
        disposeOnData.dispose();
        resolve(str);
      } else if (/^[a-zA-Z0-9,\.]+$/.test(data)) {
        str += data;
        term.write(data);
      } else if (data == "\u007F" && str.length > 0) {
        str = str.slice(0, -1);
        term.write("\b \b");
      }
    });
  });
});

gameMain().then(console.log).catch(console.log);
