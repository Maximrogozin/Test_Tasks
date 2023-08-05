const inputDistance = document.querySelector(".input-distance");
const convertToUnit = document.querySelector(".convert-to-unit");
const inputNumber = document.querySelector(".input-number");
const p = document.querySelector(".par");

const convertRules = {
  m: {
    cm: 100,
    in: 39.3701,
    ft: 3.28084,
    mm: 1000,
    yd: 1.09361,
    km: 0.001,
  },
  cm: {
    m: 0.01,
    in: 0.393701,
    ft: 0.0328084,
    mm: 10,
    yd: 0.0109361,
    km: 0.00001,
  },
  in: {
    m: 0.0254,
    cm: 2.54,
    ft: 0.0833333,
    mm: 25.4,
    yd: 0.0277778,
    km: 0.0000254,
  },
  ft: {
    m: 0.3048,
    cm: 30.48,
    in: 12,
    mm: 304.8,
    yd: 0.333333,
    km: 0.0003048,
  },
};

fetch("convertRules.json")
  .then((response) => response.json())
  .then((data) => {
    Object.assign(convertRules, data);
    for (const key in convertRules) {
      if (convertRules.hasOwnProperty(key)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        inputDistance.appendChild(option);
      }
    }
  })
  .catch((error) => console.log(error));

inputDistance.addEventListener("change", function () {
  convertToUnit.innerHTML = "";

  const selectedValue = convertRules[inputDistance.value];
  for (const key in selectedValue) {
    if (selectedValue.hasOwnProperty(key)) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      convertToUnit.appendChild(option);
    }
  }
  convert();
});

inputNumber.addEventListener("input", convert);

function convert() {
  const selectedValue = convertRules[inputDistance.value][convertToUnit.value];
  const inputValue = parseFloat(inputNumber.value);

  if (isNaN(inputValue)) {
    p.textContent = "Введите число";
  } else {
    const computedResult = selectedValue * inputValue;
    const roundedResult = Math.round(computedResult * 100) / 100;
    p.textContent = `{"unit": "${convertToUnit.value}", "value": ${roundedResult}}`;
  }
}
