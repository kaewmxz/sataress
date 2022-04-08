test("Convert English mood into Thai mood and add emoji key value to dictionary", () => {
  const data = [
    { mood: "Happy" },
    { mood: "Stressed" },
    { mood: "Sad" },
    { mood: "Surprised" },
    { mood: "Fearful" },
    { mood: "Disgusted" },
    { mood: "Neutral" },
    { mood: "Angry" },
  ];
  const countResult = data.map((o) => {
    if (o.mood == "Happy") {
      o.mood = "มีความสุข";
      o.emoji = "😊";
    } else if (o.mood == "Stressed") {
      o.mood = "เครียด";
      o.emoji = "😣";
    } else if (o.mood == "Sad") {
      o.mood = "เศร้า";
      o.emoji = "😭";
    } else if (o.mood == "Surprised") {
      o.mood = "ประหลาดใจ";
      o.emoji = "😯";
    } else if (o.mood == "Fearful") {
      o.mood = "หวาดกลัว";
      o.emoji = "😰";
    } else if (o.mood == "Disgusted") {
      o.mood = "รังเกียจ";
      o.emoji = "🤢";
    } else if (o.mood == "Neutral") {
      o.mood = "เฉยๆ";
      o.emoji = "😶";
    } else if (o.mood == "Angry") {
      o.mood = "โกรธ";
      o.emoji = "😡";
    }
    return o;
  });
  expect(countResult).toStrictEqual([
    { mood: "มีความสุข", emoji: "😊" },
    { mood: "เครียด", emoji: "😣" },
    { mood: "เศร้า", emoji: "😭" },
    { mood: "ประหลาดใจ", emoji: "😯" },
    { mood: "หวาดกลัว", emoji: "😰" },
    { mood: "รังเกียจ", emoji: "🤢" },
    { mood: "เฉยๆ", emoji: "😶" },
    { mood: "โกรธ", emoji: "😡" },
  ]);
});

test("Convert English mood into Thai mood and add emoji key value to dictionary1", () => {
  const data = [
    { mood: ["Happy", "Stressed"], intensity: [10, 9] },
    { mood: ["Stressed"], intensity: [10] },
    { mood: ["Sad"], intensity: [10] },
    { mood: ["Surprised"], intensity: [10] },
    { mood: ["Fearful"], intensity: [10] },
    { mood: ["Disgusted"], intensity: [10] },
    { mood: ["Neutral"], intensity: [10] },
    { mood: ["Angry"], intensity: [10] },
  ];
  let rows = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].mood.length; j++) {
      if (data[i].mood[j] == "Happy") {
        data[i].mood[j] = "มีความสุข😊";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      } else if (data[i].mood[j] == "Sad") {
        data[i].mood[j] = "เศร้า😭";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      } else if (data[i].mood[j] == "Stressed") {
        data[i].mood[j] = "เครียด😣";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      } else if (data[i].mood[j] == "Surprised") {
        data[i].mood[j] = "ประหลาดใจ😯";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      } else if (data[i].mood[j] == "Fearful") {
        data[i].mood[j] = "หวาดกลัว😰";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      } else if (data[i].mood[j] == "Disgusted") {
        data[i].mood[j] = "รังเกียจ🤢";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      } else if (data[i].mood[j] == "Neutral") {
        data[i].mood[j] = "เฉยๆ😶";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      } else if (data[i].mood[j] == "Angry") {
        data[i].mood[j] = "โกรธ😡";
        data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
      }
    }
    rows.push({ mood: data[i].mood });
  }
  expect(rows).toStrictEqual([
    { mood: ["มีความสุข😊(10)", "เครียด😣(9)"] },
    { mood: ["เครียด😣(10)"] },
    { mood: ["เศร้า😭(10)"] },
    { mood: ["ประหลาดใจ😯(10)"] },
    { mood: ["หวาดกลัว😰(10)"] },
    { mood: ["รังเกียจ🤢(10)"] },
    { mood: ["เฉยๆ😶(10)"] },
    { mood: ["โกรธ😡(10)"] },
  ]);
});

test("Calculate average intensity of each mood", () => {
  const arr = [{ Happy: 10 }, { Happy: 2 }, { Stressed: 4 }, {Disgusted: 6}, {Sad: 5}, {Sad: 7}, {Neutral: 6}];

  var avg = Array.from(
    arr.reduce(
      (acc, obj) =>
        Object.keys(obj).reduce(
          (acc, key) =>
            typeof obj[key] == "number"
              ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
              : acc,
          acc
        ),
      new Map()
    ),
    ([mood, values]) => ({
      mood,
      average: values.reduce((a, b) => a + b) / values.length,
    })
  );
  expect(avg).toStrictEqual([
    { mood: "Happy", average: 6 },
    { mood: "Stressed", average: 4 },
    { mood: "Disgusted", average: 6},
    { mood: "Sad", average: 6},
    { mood: "Neutral", average: 6},
  ]);
});
