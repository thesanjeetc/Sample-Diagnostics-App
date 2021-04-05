/* eslint-disable no-undef */
import EventEmitter from "./EventEmitter";
import Config from "../../ConfigFile";

const port = chrome.runtime.connect(Config.extensionID);
port.onMessage.addListener((response) =>
  EventEmitter.update(response.id, response.data)
);

setInterval(() => port.postMessage({ id: "systemInfo" }), Config.interval);

function fetchUsage(callback) {
  EventEmitter.subscribe("systemInfo", (res) => {
    callback(res.cpu.usage);
  });
}

function fetchMemory(callback) {
  EventEmitter.subscribe("systemInfo", (res) => {
    var available = res.memory.available;
    var total = res.memory.total;
    callback([
      Math.floor((100 * (total - available)) / total),
      Math.floor((100 * available) / total),
    ]);
  });
}

export { fetchUsage, fetchMemory };
