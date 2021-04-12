const interval = 1;

let systemInfo = {
  cpu: {
    name: "",
    arch: "",
    usage: [],
    total_usage: 0,
  },
  memory: {
    available: 0,
    total: 0,
  },
};

let prevCPUInfo;

let handles = {};
handles.systemInfo = handleSystemInfo;

chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener((req) => callback(port, req));
});

chrome.system.cpu.getInfo(function (info) {
  systemInfo.cpu.name = info.modelName;
  systemInfo.cpu.arch = info.archName;
  prevCPUInfo = info;
});

chrome.alarms.onAlarm.addListener(fetchSystemInfo);
chrome.alarms.create({ periodInMinutes: interval / 60 });

function callback(port, req) {
  if (handles[req.id] != null) {
    handles[req.id](port, req);
  }
}

function handleSystemInfo(port, req) {
  port.postMessage({ id: req.id, data: systemInfo });
}

function fetchSystemInfo() {
  fetchCPUInfo();
  fetchMemoryInfo();
}

function fetchCPUInfo() {
  chrome.system.cpu.getInfo(function (info) {
    let numProcessors = info.numOfProcessors;
    let processorUsage = 0;
    let totalUsage = 0;

    for (let i = 0; i < numProcessors; i++) {
      let usage = info.processors[i].usage;
      let oldUsage = prevCPUInfo.processors[i].usage;

      let diffKernelUsage = usage.kernel - oldUsage.kernel;
      let diffUserUsage = usage.user - oldUsage.user;
      let diffTotal = usage.total - oldUsage.total;

      processorUsage = ((diffKernelUsage + diffUserUsage) / diffTotal) * 100;

      systemInfo.cpu.usage[i] = processorUsage;
      totalUsage += processorUsage;
    }

    systemInfo.cpu.total_usage = totalUsage / info.numOfProcessors;
    prevCPUInfo = info;
  });
}

function fetchMemoryInfo() {
  chrome.system.memory.getInfo(function (info) {
    systemInfo.memory.available = info.availableCapacity * 0.000001;
    systemInfo.memory.total = info.capacity * 0.000001;
  });
}
