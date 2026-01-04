const terminal = document.getElementById("terminal");

let state = "booting_init";
let inputBuffer = "";
let attempts = 3;

const PASSWORD = "REDACTED";

function remainingTime() {
  const target = new Date("2026-07-17T19:00:00");
  const now = new Date();
  let diff = Math.max(0, target - now);

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= 1000 * 60 * 60 * 24;
  const h = Math.floor(diff / (1000 * 60 * 60));
  diff %= 1000 * 60 * 60;
  const m = Math.floor(diff / (1000 * 60));
  const s = Math.floor((diff / 1000) % 60);

  const currentHour = new Date().getHours();
  const colorClass = currentHour % 2 === 0 ? "green-text" : "red-text";

  return `<span class="${colorClass}">${d} days ${h}h ${m}m ${s}s remaining</span>`;
}

function print(text) {
  terminal.innerHTML += text;
  terminal.scrollTop = terminal.scrollHeight;
}

function glitch(text) {
  return text.replace(/[A-Z]/g, c => Math.random() < 0.08 ? "█" : c);
}

function redirect() {
  print("\n\n[ DISCONNECTING... ]");
  setTimeout(() => {
    window.location.href = "test.html";
  }, 1500);
}

function boot() {
  terminal.innerHTML = "";
  print("WARNING: Unauthorized access is monitored.\n");
  print("Memory corruption detected.\n\n");
  print(remainingTime() + "\n\n");

  print("System booting... 0%");
  let percent = 0;
  state = "booting";

  const interval = setInterval(() => {
    percent += 10;
    terminal.innerHTML = terminal.innerHTML.replace(
      /System booting\.\.\. \d+%/,
      `System booting... ${percent}%`
    );

    if (percent >= 100) {
      clearInterval(interval);
      print("\n\n");
      print("B▮RN⌧Y'S F░L3S [REDACTED]\n");
      print("--------------------------\n");
      print("STATUS: PARTIAL CORRUPTION\n");
      print("FILES: 6 AVAILABLE | 1 DAMAGED\n\n");
      print("Do you wish to access the files? (Y/N)\n> ");
      state = "yn";
    }
  }, 200);
}

function handleCommand(cmd) {
  cmd = cmd.trim().toLowerCase();

  if (cmd === "help") {
    print("Available commands:\n- ls\n- open [file]\n- whoami\n- exit\n");
  } else if (cmd === "ls") {
    print("file_01.log\nfile_02.log\nfile_03.log\nfile_04.log\nfile_05.log\nfile_02.mem\nfile_███.dat (corrupted)\n");
  } else if (cmd === "open file_01.log") {
    print("\n[LOG 01]\nDay 150 of Luma.\nEmbryo in the development stage.\nSynchronization with the Codex at 5%.\nThreat level: 5.\n\n");
  } else if (cmd === "open file_02.log") {
    print("\n[LOG 02]\nDay 153 of Luma.\nThe embryo is responding well to the first tests.\nSynchronization with the Codex at 12%.\nThreat level: 5.\n\n");
  } else if (cmd === "open file_03.log") {
    print("\n[LOG 03]\nDay 155 of Luma.\nThe embryo has surprisingly formed its first limbs.\nSynchronization with the Codex at 25%.\nThreat level: 4.\n\n");
  } else if (cmd === "open file_04.log") {
    print("\n[LOG 04]\nDay 159 of Luma.\nThe newly formed baby is developing faster than we anticipated.\nThe Flower of Life may be a great step forward for humanity!\nSynchronization with the Codex at 50%.\nThreat level: 4.\n\n");
  } else if (cmd === "open file_05.log") {
    print("\n[LOG 05]\nDay 170 of Luma.\nWelcome to life, Ipirus.\nSynchronization with the Codex at 100%.\nThreat level: 3.\n\n");
  } else if (cmd === "open file_02.mem") {
    print(glitch("\n[MEMORY FRAGMENT]\nI didn't die.\nThey needed me broken.\n\n"));
  } else if (cmd.includes(".dat")) {
    print(glitch("\nACCESS VIOLATION\nMEMORY BLEED DETECTED\n\n"));
  } else if (cmd === "whoami") {
    print("IDENTITY: UNKNOWN\nSTATUS: UNSTABLE\n");
  } else if (cmd === "exit") {
    redirect();
  } else {
    print("Command not recognized.\n");
  }
}

document.addEventListener("keydown", e => {
  if (state === "booting" || state === "booting_init" || state === "locked") return;

  if (state === "yn") {
    if (e.key.toLowerCase() === "y") {
      print("Y\nEnter password:\n> ");
      state = "password";
    } else if (e.key.toLowerCase() === "n") {
      print("N\n");
      redirect();
    }
  } else if (state === "password") {
    if (e.key === "Enter") {
      print("\n");
      if (inputBuffer === PASSWORD) {
        print("Access granted.\n\nType 'help' for available commands.\n> ");
        state = "granted";
      } else {
        attempts--;
        print(`Invalid password. Attempts left: ${attempts}\n`);
        if (attempts <= 0) {
          print("SYSTEM LOCKDOWN INITIATED.\n");
          state = "locked";
          setTimeout(redirect, 2000);
        } else {
          print("> ");
        }
      }
      inputBuffer = "";
    } else if (e.key.length === 1) {
      inputBuffer += e.key;
      print("*");
    }
  } else if (state === "granted") {
    if (e.key === "Enter") {
      print("\n");
      handleCommand(inputBuffer);
      inputBuffer = "";
      if (state === "granted") print("> ");
    } else if (e.key === "Backspace") {
      if (inputBuffer.length > 0) {
        inputBuffer = inputBuffer.slice(0, -1);
        terminal.innerHTML = terminal.innerHTML.slice(0, -1);
      }
    } else if (e.key.length === 1) {
      inputBuffer += e.key;
      print(e.key);
    }
  }
});

setTimeout(boot, 1600);
