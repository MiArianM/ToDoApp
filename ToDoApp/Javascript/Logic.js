//Global Variables
let trs = document.querySelectorAll("tr");
let th = document.querySelector("th");
let butts = document.querySelector(".FlexxButts").children;
let inputs = document.querySelectorAll(".di");
let donebutt = document.querySelector(".custom-btn");
let addplaceparent = document.querySelector(".rightinserting").parentNode;
let addplace = document.querySelector(".rightinserting");
let actionbutton = document.querySelectorAll(".raise");
let taskname = document.querySelector(".taskname");
let taskdate = document.querySelector(".date-input");
let i = 0;
let j = 0;
let evento1;
let evento2;
let typeSpeed = 100;
let taskmassage = "Bring Your New Task Name !";
let Datemassage = "Pick a Right Date !";
//........... Some LOGICS
window.addEventListener("load", () => {
  new Calendar(".date-input");
  categorizing();
  Calendar.DoneButton();
  actioningbuttonoff();
  try {
    plus.addEventListener("click", plusToggle);
  } catch (error) {}
});
class Calendar {
  constructor(inputSelector) {
    this.nameinput = document.querySelector(".taskname");
    this.input = document.querySelector(inputSelector);
    this.form = this.input.parentElement;
    this.popupContainer = null;
    this.monthContainer = null;
    this.tableContainer = null;
    this.table = document.createElement("table");
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
    this.buildCalendar();
    this.setMainEventListener();
    Calendar.DoneButton();
  }
  //Main Functions
  buildCalendar() {
    this.popupContainer = document.createElement("div");
    this.popupContainer.classList.add("calendar-popup");
    this.form.appendChild(this.popupContainer);
    this.monthContainer = document.createElement("div");
    this.monthContainer.classList.add("month-and-year");
    this.monthContainer.innerHTML = `<h4>${this.getMonth()} ◻️ ${this.getYear()}</h4>`;
    this.popupContainer.appendChild(this.monthContainer);
    this.createButtons();
    this.populateTable(this.selectedMonth, this.selectedYear);
  }
  createButtons() {
    const prev = document.createElement("button");
    prev.classList.add("button", "prev");
    prev.innerHTML = "<i class='fas fa-chevron-left'></i>";
    const next = document.createElement("button");
    next.classList.add("button", "next");
    next.innerHTML = "<i class='fas fa-chevron-right'></i>";

    prev.addEventListener("click", (e) => {
      e.preventDefault();
      this.updateMonth(this.selectedMonth - 1);
    });

    next.addEventListener("click", (e) => {
      e.preventDefault();
      this.updateMonth(this.selectedMonth + 1);
    });

    this.popupContainer.appendChild(prev);
    this.popupContainer.appendChild(next);
  }
  static DoneButton() {
    i = 0;
    j = 0;
    deletething();
    taskname.value = "";
    taskdate.value = "";
    taskname.setAttribute("placeholder", " Write Your Task !");
    taskdate.setAttribute("placeholder", " Pick a date !");
    donebutt.children[0].innerText = "Add !";
    donebutt.children[1].innerText = "Done ?";
    donebutt.addEventListener("click", Calendar.adddontbutton, false);
  }
  //Other Functions
  static adddontbutton() {
    let tasknamex = inputs[0].value;
    let taskdatex = inputs[1].value;
    let fi = document.createTextNode(tasknamex);
    let s = document.createTextNode(taskdatex);
    let t = document.createTextNode("Pending");
    let Editbutton = document.createElement("button");
    let Onbutton = document.createElement("button");
    let Removebutton = document.createElement("button");
    let newrow = document.createElement("tr");
    let newcell1 = document.createElement("td");
    let newcell2 = document.createElement("td");
    let newcell3 = document.createElement("td");
    let newcell4 = document.createElement("td");
    let newcells = [newcell1, newcell2, newcell3, newcell4];
    Editbutton.classList = "raise ed mr";
    Editbutton.textContent = "Edit";
    Onbutton.classList = "raise ou";
    Onbutton.textContent = "On";
    Removebutton.classList = "raise dl";
    Removebutton.textContent = "Delete";
    newcell1.appendChild(fi);
    newcell2.appendChild(s);
    newcell3.appendChild(t);
    newcell4.append(Editbutton, Onbutton, Removebutton);
    newcells.forEach((cell) => {
      newrow.append(cell);
    });
    addplaceparent.insertBefore(newrow, addplace.nextSibling);
    categorizing(newrow);
    taskname.value = "";
    taskdate.value = "";
    actioningbuttonon(newrow);
    console.dir(tasknamex);
  }

  populateTable(month, year) {
    this.table.innerHTML = "";

    const namesRow = document.createElement("tr");
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((name) => {
      const th = document.createElement("th");
      th.innerHTML = name;
      namesRow.appendChild(th);
    });
    this.table.appendChild(namesRow);

    const tempDate = new Date(year, month, 1);
    let firstMonthDay = tempDate.getDay();
    firstMonthDay = firstMonthDay === 0 ? 7 : tempDate.getDay();

    const daysInMonth = this.getDaysInMonth(month, year);
    const j = daysInMonth + firstMonthDay - 1;

    let tr = document.createElement("tr");

    if (firstMonthDay - 1 !== 0) {
      tr = document.createElement("tr");
      this.table.appendChild(tr);
    }

    for (let i = 0; i < firstMonthDay - 1; i++) {
      const td = document.createElement("td");
      td.innerHTML = "";
      tr.appendChild(td);
    }

    for (let i = firstMonthDay - 1; i < j; i++) {
      if (i % 7 === 0) {
        tr = document.createElement("tr");
        this.table.appendChild(tr);
      }

      const td = document.createElement("td");
      td.innerText = i - firstMonthDay + 2;
      td.dayNr = i - firstMonthDay + 2;
      td.classList.add("day");

      td.addEventListener("click", (e) => {
        const selectedDay = e.target.innerHTML;
        this.fillDate(selectedDay);
        this.hideCalendar();
      });
      tr.appendChild(td);
    }
    this.popupContainer.appendChild(this.table);
  }
  fillDate(day) {
    day = day < 10 ? "0" + day : day;
    let month = null;
    month =
      this.selectedMonth < 9
        ? "0" + (this.selectedMonth + 1)
        : this.selectedMonth + 1;
    this.input.value = `${day}/${month}/${this.selectedYear}`;
  }

  updateMonth(month) {
    this.selectedMonth = month;
    if (this.selectedMonth < 0) {
      this.selectedYear--;
      this.selectedMonth = 11;
    } else if (this.selectedMonth > 11) {
      this.selectedYear++;
      this.selectedMonth = 0;
    }
    this.monthContainer.innerHTML = `<h4>${
      this.months[this.selectedMonth]
    } ◻️ ${this.selectedYear}</h4>`;

    this.populateTable(this.selectedMonth, this.selectedYear);
  }

  getMonth() {
    return this.months[this.selectedMonth];
  }

  getYear() {
    return this.selectedYear;
  }

  getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  hideCalendar() {
    this.form.classList.remove("open");
  }

  setMainEventListener() {
    this.input.addEventListener("click", (e) => {
      this.form.classList.toggle("open");

      if (!this.form.classList.contains("open")) {
        this.hideCalendar();
      }
    });
  }
}
function categorizing(newrows) {
  newrows = newrows || null;
  for (let index = 0; index < butts.length; index++) {
    butts[index].addEventListener("click", () => {
      const content = butts[index].textContent;
      if (content === "All") {
        if (newrows) {
          newrows.classList = "trow";
        }

        trs.forEach((tr) => {
          tr.style.display = "table-row";
        });
      } else if (content === "Pending") {
        if (newrows) {
          newrows.children[2].innerText === "Pending"
            ? (newrows.style.display = "table-row")
            : (newrows.style.display = "none");
        }

        trs.forEach((tr) => {
          if (tr.children[2].innerText === "Pending") {
            tr.style.display = "table-row";
          } else {
            tr.style.display = "none";
            th.parentElement.style.display = "table-row";
          }
        });
      } else if (content === "Completed") {
        if (newrows) {
          newrows.children[2].innerText === "Completed"
            ? (newrows.style.display = "table-row")
            : (newrows.style.display = "none");
        }

        trs.forEach((tr) => {
          if (tr.children[2].innerText === "Completed") {
            tr.style.display = "table-row";
          } else {
            tr.style.display = "none";
            th.parentElement.style.display = "table-row";
          }
        });
      } else if (content === "Delete All") {
        if (newrows) {
          newrows.remove();
        }
        trs.forEach((tr) => {
          if (tr.classList.value !== "rightinserting") {
            tr.remove();
          }
          th.parentElement.style.display = "table-row";
        });
      }
    });
  }
}
function deletething() {
  donebutt.removeEventListener(
    "click",
    () => {
      evento1.target.parentElement.parentElement.children[0].innerText =
        taskname.value;
      evento1.target.parentElement.parentElement.children[1].innerText =
        taskdate.value;
      evento1 = null;
      Calendar.DoneButton();
      return;
    },
    false
  );
}
function actioningbuttonoff() {
  actionbutton.forEach((abutt) => {
    abutt.addEventListener("click", (event) => {
      console.dir(taskname);
      if (event.target.innerText === "Edit") {
        evento1 = event;
        donebutt.removeEventListener("click", Calendar.adddontbutton);
        changingdonebutt_inputs();
        donebutt.addEventListener(
          "click",
          () => {
            evento1.target.parentElement.parentElement.children[0].innerText =
              taskname.value;
            evento1.target.parentElement.parentElement.children[1].innerText =
              taskdate.value;
            evento1 = null;
            Calendar.DoneButton();
            return;
          },
          false
        );
      } else {
        console.log("hey");
      }
    });
  });
}
function actioningbuttonon(newrows) {
  childbutts = newrows.children[3].children;
  for (let index = 0; index < childbutts.length; index++) {
    childbutts[index].addEventListener("click", (event) => {
      console.dir(taskname);
      if (event.target.innerText === "Edit") {
        evento2 = event;
        donebutt.removeEventListener("click", Calendar.adddontbutton);
        changingdonebutt_inputs();
        donebutt.addEventListener("click", () => {
          evento2.target.parentElement.parentElement.children[0].innerText =
            taskname.value;
          evento2.target.parentElement.parentElement.children[1].innerText =
            taskdate.value;
          evento2 = null;
          Calendar.DoneButton();
          return;
        });
      } else {
        console.log("hey");
      }
    });
  }
}
function tasktypeWriter() {
  if (i < taskmassage.length) {
    msg = taskname.getAttribute("placeholder") + taskmassage.charAt(i);
    taskname.setAttribute("placeholder", msg);
    i++;
    setTimeout(tasktypeWriter, typeSpeed);
  }
}
function DatetypeWriter() {
  if (j < Datemassage.length) {
    msg = taskdate.getAttribute("placeholder") + Datemassage.charAt(j);
    taskdate.setAttribute("placeholder", msg);
    j++;
    setTimeout(DatetypeWriter, typeSpeed);
  }
}
function changingdonebutt_inputs() {
  donebutt.children[0].innerText = "Edit !";
  donebutt.children[1].innerText = "Commited ?";
  taskname.focus();
  taskname.setAttribute("placeholder", "");
  tasktypeWriter();
  taskdate.setAttribute("placeholder", "");
  DatetypeWriter();
}
function wholething() {
  Calendar.DoneButton();
}
