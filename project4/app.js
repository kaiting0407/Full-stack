let start = document.querySelector(".start");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();
//parameter1 是要控制的對象
// parameter2 是duration
//parameter3 是控制對象的原始狀態
//parameter4 是控制對象的動畫結束後的狀態

time_line
  .fromTo(
    start,
    0.5,
    { height: "0%" },
    { height: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    start,
    0.6,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    0.5,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=0.6"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

window.setTimeout(function () {
  animation.style.pointerEvents = "none";
}, 1400);

//讓整個網站enter沒辦法用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//防止form內部的botton(垃圾桶,升降序,+)送出表單
let allButton = document.querySelectorAll("button");
allButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//評分顏色
let Allselect = document.querySelectorAll("select");
Allselect.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target); //e.target就是<select>
  });
});
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    // target.style.color="black";
  } else if (
    target.value == "B+" ||
    target.value == "B-" ||
    target.value == "B"
  ) {
    target.style.backgroundColor = "yellow";
  } else if (
    target.value == "C+" ||
    target.value == "C-" ||
    target.value == "C"
  ) {
    target.style.backgroundColor = "orange";
  } else if (
    target.value == "D+" ||
    target.value == "D-" ||
    target.value == "D"
  ) {
    target.style.backgroundColor = "red";
  } else if (target.value == "F") {
    target.style.backgroundColor = "black";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}
function setGPA() {
  //let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0;
  let creditTotal = 0;
  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditTotal += credits[i].valueAsNumber;
      //console.log(creditTotal);
      sum += credits[i].valueAsNumber * convert(selects[i].value);
    }
  }
  //console.log(sum);
  
  let result = (sum / creditTotal).toFixed(2);
  if (creditTotal == 0) {
    result = 0;
  }
  document.getElementById("total").innerText = result;
}
function convert(grade) {
  switch (grade) {
    case "A":
      return 4;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1;
    case "D-":
      return 0.7;
    case "F":
      return 0;
    default:
      return 0;
  }
}


let addButton = document.querySelector(".plus-btn");


let newform = document.querySelector(".f1");



addButton.addEventListener("click", () => {
  //console.log(document.querySelector(".all-inputs"));
  newform = newform.cloneNode(true);
  newform.querySelectorAll("input,select").forEach(function (input) {
    input.value = "";
    // 对于文本输入框和其他类型，设置为空字符串
  });
  changeColor(newform.select);
  document.querySelector(".all-inputs").appendChild(newform);
  
  
  
  

  newform.querySelector(".trash-button").addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  newform.style.animation = "scaleUp 0.5s ease forwards";
  Allselect = document.querySelectorAll("select");
  Allselect.forEach((select) => {
    select.addEventListener("change", (e) => {
      console.log(e);
      setGPA();
      changeColor(e.target); //e.target就是<select>
    });
  });
  credits = document.querySelectorAll(".class-credit");
  credits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });
});
/*var originalFormHTML = document.querySelector("form").outerHTML;
let addButton=document.querySelector(".plus-btn");
addButton.addEventListener("click",()=>{
       
            // 使用缓存的HTML创建一个新的表单元素
            let newForm = document.createElement('div');
            newForm.innerHTML = originalFormHTML;
            newForm = newForm.firstChild;

            // 将新表单添加到页面的指定容器中
            let container = document.querySelector(".all-inputs");
            container.appendChild(newForm);
        
      });*/


let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
  });
  allTrash.forEach((trash) => {
    let form = trash.parentElement.parentElement;
    form.addEventListener("transitionend", (e) => {
      e.target.remove();
      setGPA();
      
    });
  });
});



// 排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSort("descending");
});
btn2.addEventListener("click", () => {
  handleSort("ascending");
});
function handleSort(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; // class category
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
    }
  }

  // 取得object array後,我們可以把成績String換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convert(objectArray[i].class_grade);
  }
  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";
  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
        <input
        type="text"
        placeholder="class category"
        class="class-type"
        list="opt"
        value=${objectArray[i].class_name}
        /><!--
        --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
        /><!--
        --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
        /><!--
        --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
        ><!--
        --><button class="trash-button">
        <i class="fas fa-trash"></i>
        </button>
    </div>
    </form>`;
  }


  //SELECT可直接用JS更改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }
  // select事件監聽
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  // credit事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // 垃圾桶
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
