
const timetable = {
    "Rapid1":   { "A": "08:00", "B": "08:15", "D": "08:30" },
    "Local1":   { "B": "08:20", "C": "08:35", "D": "08:50", "E": "09:05" },
    "Local2":   { "A": "07:50", "B": "08:10", "C": "08:25", "D": "08:40" },
    "Express1": { "A": "07:45", "C": "08:10", "E": "08:30" },
    "Local3":   { "C": "08:40", "D": "08:55", "E": "09:10" },
    "Rapid2":   { "B": "08:25", "D": "08:40", "E": "08:55" }
  };
  
  function findTransferRoutes(start, goal, timetable) {
    const queue = [];
    const visited = new Set();
    const results = [];
  
    // Initial state: Explore all trains stopping at the departure station
    for (const [train, stops] of Object.entries(timetable)) {
      if (stops[start]) {
        queue.push({
          path: [{ train, from: start, time: stops[start], to: null }],
          currentStation: start,
          currentTime: stops[start],
          currentTrain: train
        });
      }
    }
  
    while (queue.length > 0) {
      const { path, currentStation, currentTime, currentTrain } = queue.shift();
      const key = `${currentTrain}-${currentStation}-${currentTime}`;
      if (visited.has(key)) continue;
      visited.add(key);
  
      const schedule = timetable[currentTrain];
      const stations = Object.keys(schedule);
      const currentIndex = stations.indexOf(currentStation);
  
      // 1. Move to the next station with the same train
      for (let i = currentIndex + 1; i < stations.length; i++) {
        const nextStation = stations[i];
        const nextTime = schedule[nextStation];
  
        const newPath = [...path];
        newPath[newPath.length - 1].to = nextStation;
        newPath.push({ train: currentTrain, from: nextStation, time: nextTime, to: null });
  
        if (nextStation === goal) {
          results.push(newPath);
        } else {
          queue.push({
            path: newPath,
            currentStation: nextStation,
            currentTime: nextTime,
            currentTrain: currentTrain
          });
        }
      }
  
      // 2. Transfer to another train
      for (const [otherTrain, otherSchedule] of Object.entries(timetable)) {
        if (otherTrain === currentTrain) continue;
        if (!otherSchedule[currentStation]) continue;
  
        const otherTime = otherSchedule[currentStation];
        if (otherTime > currentTime) {
          const newPath = [...path];
          newPath[newPath.length - 1].to = currentStation;
          newPath.push({ train: otherTrain, from: currentStation, time: otherTime, to: null });
  
          queue.push({
            path: newPath,
            currentStation: currentStation,
            currentTime: otherTime,
            currentTrain: otherTrain
          });
        }
      }
    }
  
    // Extract the fastest route
    results.sort((a, b) => {
      const timeA = a[a.length - 1].time;
      const timeB = b[b.length - 1].time;
      if (timeA !== timeB) return timeA.localeCompare(timeB);
      return a.length - b.length;
    });
  
    return results[0];
  }
  
  const startStation = process.argv[2];
  const endStation = process.argv[3];
  
  if (!startStation || !endStation) {
    console.error('Usage: node route.js <startStation> <endStation>');
    process.exit(1);
  }
  
  const bestRoute = findTransferRoutes(startStation, endStation, timetable);
  
  console.log('Best Route:');
  console.log(bestRoute);
  bestRoute.forEach(segment => {
    console.log(`${segment.train} from ${segment.from} (Departing at ${segment.time}) to ${segment.to}`);
  });

function generateTrainInstructions(connections) {
  console.log(connections);
  if (!connections || connections.length === 0) {
    return "";
  }

  let instructions = `この駅で、${connections[0].train}にご乗車のうえ${connections[0].to}で`;

  for (let i = 1; i < connections.length - 1; i++) {
    instructions += `${connections[i].train}にお乗り換えいただき、${connections[i].to}で`;
  }

  if (connections.length > 1) {
    instructions += `${connections[connections.length - 1].train}にお乗り換えください。`;
  } else {
    instructions += `そのままお乗りください。`;
  }

  
  //const connections = [{from:"A",to:"B",train:"express1"},{from:"B",to:"C",train:"semi.exp1"},{from:"C",to:"D",train:"local1"}];
const output = generateTrainInstructions(connections);
console.log(output); // 出力: この駅で、express1にご乗車のうえBでsemi.exp1にお乗り換えいただき、Cでlocal1にお乗り換えください。

const singleConnection = [{from:"X",to:"Y",train:"rapid"}];
const outputSingle = generateTrainInstructions(singleConnection);
console.log(outputSingle); // 出力: この駅で、rapidにご乗車のうえYでそのままお乗りください。

const noConnections = [];
const outputEmpty = generateTrainInstructions(noConnections);
console.log(outputEmpty); // 出力:
return output;
//return instructions;
}

