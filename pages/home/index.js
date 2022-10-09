let btnText = ["Candidatar", "Remover candidatura"];
let jobsUl = document.querySelector(".jobs-wrapper");
let appliedUl = document.querySelector(".applied-jobs-wrapper");


const jobsData = [
   {
     id: 0,
     title: "Pessoa desenvolvedora front-end - React",
     enterprise: "Kenzie",
     location: "Curitiba",
     description:
       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
     modalities: ["Hibrido", "Presencial"],
   },
   {
     id: 1,
     title: "Pessoa desenvolvedora back-end - Node JS",
     enterprise: "Brazilians in Tech",
     location: "Rio de Janeiro",
     description:
       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
     modalities: ["Home Office", "Presencial"],
   },
   {
     id: 2,
     title: "Pessoa desenvolvedora Fullstack - Node JS",
     enterprise: "Brazilians in Tech",
     location: "Rio de Janeiro",
     description:
       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
     modalities: ["Home Office", "Presencial"],
   },
 ];
 

function state(dataArr) {
  let value = dataArr;

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
  }

  return [getValue, setValue];
}

const [getJobs, setJobs] = state(jobsData);

const [getApplied, setApplied] = state([]);


function renderJobs(jobsArr) {
  jobsUl.innerHTML = "";
  jobsArr.forEach((element) => {
    jobsUl.appendChild(createLi(element));
  });
}

renderJobs(getJobs());

function renderLocalStorageData() {
  let newArr = JSON.parse(localStorage.getItem("appliedJobs"));
  setApplied(newArr);
  renderApplied(getApplied());
}

renderLocalStorageData();

function renderApplied(appliedArr) {
  appliedUl.innerHTML = "";
  let newArrJson = JSON.stringify(appliedArr);
  localStorage.setItem("appliedJobs", newArrJson);
  let newArr = JSON.parse(localStorage.getItem("appliedJobs"));
  if (newArr.length > 0) {
    newArr.forEach((element) => {
      createAppliedLi(element);
    });
  } else {
    createEmptyLi();
  }
}

function createAppliedLi(element) {
   appliedUl.insertAdjacentHTML(
     "beforeend",
     `<li id="${element.id}" class="applied-job">
          <span class="applied-job-title-container">
             <h2 class="applied-job-title">${element.title}</h2>
             <button onClick="{removeApplied(parseInt(event.target.parentElement.parentNode.id))}" class="applied-job-remove-btn">
                <img src="/assets/img/trash.png" alt="trash icon" class="applied-job-remove-img">
             </button>
          </span>
          <span class="applied-job-desc-container">
             <p>${element.enterprise}</p>
             <p">${element.location}</p>
          </span>
       </li>`
   );
 }
 
 function removeApplied(jobID, appliedJobs = getApplied()) {
    let job = appliedJobs.filter((element) => {
      return element.id === jobID;
    });
    let jobIndex = appliedJobs.findIndex((element) => {
      return element === job[0];
    });
  
    appliedJobs.splice(jobIndex, 1);
    renderApplied(getApplied());
    renderJobs(getJobs());
  }

 function createEmptyLi() {
   appliedUl.innerHTML = "";
   appliedUl.insertAdjacentHTML(
     "beforeend",
     `<li class="no-applied-jobs">
          <p class="no-applied-jobs-desc">Você ainda não aplicou para nenhuma vaga</p>
          <span class="desc-bar-wrapper">
             <div class="desc-bar-a"></div>
             <div class="desc-bar-b"></div>
             <div class="desc-bar-c">
                <div class="desc-bar-c-a"></div>
                <div class="desc-bar-c-b"></div>
                <div class="desc-bar-c-c"></div>
             </div>
          </span>
       </li>`
   );
 }

function createLi(element) {
  let li = document.createElement("li");
  let spanA = document.createElement("span");
  let spanB = document.createElement("span");
  let h2 = document.createElement("h2");
  let divA = document.createElement("div");
  let divB = document.createElement("div");
  let pA = document.createElement("p");
  let pB = document.createElement("p");
  let pC = document.createElement("p");
  let btnA = document.createElement("button");
  let btnB = document.createElement("button");
  let btnC = document.createElement("button");

  li.classList.add("job-card");
  spanA.classList.add("job-title-wrapper");
  spanB.classList.add("job-btns-wrapper");
  h2.classList.add("job-title");
  divA.classList.add("job-company-wrapper");
  divB.classList.add("job-type-btn-wrapper");
  pA.classList.add("job-company");
  pB.classList.add("job-location");
  pC.classList.add("job-description");
  btnA.classList.add("job-type-btn");
  btnB.classList.add("job-type-btn");
  btnC.classList.add("job-apply-btn");

  h2.innerText = element.title;
  pA.innerText = element.enterprise;
  pB.innerText = element.location;
  pC.innerText = element.description;
  btnA.innerText = element.modalities[0];
  btnB.innerText = element.modalities[1];
  btnC.innerText = btnText[0];
  li.id = element.id;

  let newArr = JSON.parse(localStorage.getItem("appliedJobs"));

  newArr.forEach((item) => {
    if (item.id === element.id) {
      btnC.innerText = btnText[1];
    }
  });

  btnC.addEventListener("click", (event) => {
    let targetId = parseInt(event.target.parentNode.parentElement.id);
    if (event.target.innerText === btnText[0]) {
      addAppliedJobs(targetId);
      renderJobs(getJobs());
    } else {
      removeApplied(targetId);
    }
  });

  divB.appendChild(btnA)
  divB.appendChild(btnB)
  spanB.appendChild(divB);
  spanB.appendChild(btnC);
  divA.appendChild(pA);
  divA.appendChild(pB);
  spanA.append(h2);
  spanA.append(divA);
  li.appendChild(spanA);
  li.appendChild(pC);
  li.appendChild(spanB);

  return li;
}

function addAppliedJobs(elementId, jobs = getJobs()) {
   let jobsArr = jobs.map((element) => {
     return { ...element };
   });
 
   let job = jobsArr.find((element) => {
     return element.id === elementId;
   });
 
   setApplied([...getApplied(), job]);
 
   renderApplied(getApplied());
 }