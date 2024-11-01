const names = ["John Doe", "Jane Smith", "Bob Brown", "Charlie White", "Max Power", "Patty Cake", "Sammy Syntax", "Ella Vator", "Wade Wilson"];
const diplomas = ["Diploma in Information Technology", "Diploma in Big Data & Analytics", "Common ICT Programme", "Diploma in Applied Artificial Intelligence", "Diploma in Cyber Security & Digital Forensics", "Diploma in Immersive Media & Game Development"];
const modules = ["COMT", "UXID", "DAVA", "LOMA", "CYFUN", "ADEV", "DBAV", "DSAG", "NECT", "MBAP", "CADV", "AMDT", "FWEB", "DEVOPS", "MLDP", "ITAD"]
const modules_full = ["Computational Thinking", "User Experience and Interface Design", "Data Visualisation and Analytics", "Logic and Mathematics", "Cybersecurity Fundamentals", "Application Development Project", "Database Application Development", "Data Structure and Algorithms", "Network and Cloud Technology", "Mobile App Development", "Cloud Application Development", "Agile Methodology and Design Thinking", "Full Stack Web Development", "DevOps Essentials", "Machine Learning for Developers", "IoT Application Development"];

document.getElementById("blur").style.opacity = "1";

document.getElementById("strength_collapse").addEventListener("click", function () {
    var content = document.getElementById("strength_content");
    
    if (content) {
        if (window.getComputedStyle(content).display === "flex") {
            localStorage.setItem("modules_strength", "hide");
            document.getElementById("strength_collapse").style.transform = "rotate(-90deg)";
            content.style.opacity = "0";
            content.addEventListener("transitionend", function () {
                content.style.display = "none";
            }, { once: true });
        } else {
            localStorage.setItem("modules_strength", "show");
            document.getElementById("strength_collapse").style.transform = "rotate(0deg)";
            content.style.display = "flex";
            setTimeout(() => {
                content.style.opacity = "1";
            }, 10);
        }
    } else {
        console.warn("Content element not found.");
    }
});

document.getElementById("weakness_collapse").addEventListener("click", function () {
    var content = document.getElementById("weakness_content");

    if (content) {
        if (window.getComputedStyle(content).display === "flex") {
            localStorage.setItem("modules_weakness", "hide");
            document.getElementById("weakness_collapse").style.transform = "rotate(-90deg)";
            content.style.opacity = "0";
            content.addEventListener("transitionend", function () {
                content.style.display = "none";
            }, { once: true });
        } else {
            localStorage.setItem("modules_weakness", "show");
            document.getElementById("weakness_collapse").style.transform = "rotate(0deg)";
            content.style.display = "flex";
            setTimeout(() => {
                content.style.opacity = "1";
            }, 10);
        }
    } else {
        console.warn("Content element not found.");
    }
});

const searchBar = document.getElementById('searchBar');
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        searchBar.style.display = 'block';
        searchBar.focus();
    }
});

document.querySelectorAll('.tabs > div').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tabs > div').forEach(tab => {
            tab.classList.remove('active');
        });
        tab.classList.add('active');
    });
})

const radios = document.querySelectorAll('input[name="tabs"]');
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        document.querySelectorAll('.student_container').forEach(section => {
            section.style.display = 'none';
            section.style.opacity = '0';
        });

        const selectedSectionId = radio.id;
        const selectedSection = document.getElementById(`${selectedSectionId}_container`);
        if (!selectedSection) {
            console.error(`Section with ID ${selectedSectionId} not found.`);
            return;
        }
        selectedSection.style.display = 'flex';
        setTimeout(() => {
            selectedSection.style.opacity = '1';
        }, 10);

        const filter_options =  document.querySelector(".search").nextElementSibling;
        if (selectedSectionId === "explore") {
            filter_options.style.display = "flex";
            setTimeout(() => {
                filter_options.style.opacity = "1";
            }, 200);
        } else if (selectedSectionId === "schedule") {
            updateEventStyles();
        } else {
            filter_options.style.opacity = "0";
            filter_options.addEventListener("transitionend", () => {
                filter_options.style.display = "none";
            }, { once: true });
        }
    });
});

document.getElementById("fontawesome").onload = function() {
    this.media = "all";
};

window.onload = () => {
    if (localStorage.getItem("modules_strength") === "hide") {
        document.getElementById("strength_collapse").style.transform = "rotate(-90deg)";
        document.getElementById("strength_content").style.opacity = "0";
        document.getElementById("strength_content").addEventListener("transitionend", function () {
            document.getElementById("strength_content").style.display = "none";
        }, { once: true });
    }

    if (localStorage.getItem("modules_weakness") === "hide") {
        document.getElementById("weakness_collapse").style.transform = "rotate(-90deg)";
        document.getElementById("weakness_content").style.opacity = "0";
        document.getElementById("weakness_content").addEventListener("transitionend", function () {
            document.getElementById("weakness_content").style.display = "none";
        }, { once: true });
    }

    if (document.querySelectorAll(".pair").length === 0) {
        document.getElementById("empty").style.display = "flex";
        document.getElementById("empty").textContent = "You have not paired anyone yet."
    }

    modules.forEach(module => {
        const new_option_element = document.createElement("option");
    
        new_option_element.value = module;
        new_option_element.textContent = module;
        document.getElementById("module_selection").appendChild(new_option_element);
    })

    document.getElementById("blur").style.display = "none";
    document.getElementById("spinner").style.display = "none";
}

document.getElementById("current_container").style.display = "none";
document.getElementById("schedule_container").style.display = "none";

const stickyElement = document.querySelector('.student_container:has(.pair) > div:nth-of-type(1)');
const container = document.querySelector('.student_container:has(.pair)');

container.addEventListener('scroll', () => {
    if (container.scrollTop > 0) {
        stickyElement.classList.add('scrolled');
    } else {
        stickyElement.classList.remove('scrolled');
    }
});

function allPairsHidden() {
    const pairs = document.querySelectorAll('.pair');
    return Array.from(pairs).every(pair => getComputedStyle(pair).display === 'none');
}

document.querySelectorAll(".pair > span").forEach(button => {
    button.addEventListener("click", () => {
        const pair_element = button.closest(".pair");
        
        if (pair_element) {
            pair_element.setAttribute("data-hidden", true);
            pair_element.style.opacity = "0";
            pair_element.addEventListener("transitionend", () => {
                pair_element.style.display = "none";

                console.log(allPairsHidden())
                if (allPairsHidden()) {
                    document.getElementById("empty").style.display = "flex";
                    document.getElementById("empty").style.opacity = "1";
                }
            }, { once: true });
        }
    });
});

document.querySelector("#empty > button").addEventListener("click", () => {
    const empty_element = document.getElementById("empty");
    empty_element.style.opacity = "0";
    empty_element.addEventListener("transitionend", () => {
        empty_element.style.display = "none";
    }, { once: true })

    document.querySelectorAll(".pair").forEach(pair => {
        pair.setAttribute("data-hidden", false);
        pair.style.display = "grid";
        setTimeout(() => {
            pair.style.opacity = "1";
        }, 10);
    })
})

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

document.getElementById("searchBar").addEventListener("input", debounce(() => {
    if (window.getComputedStyle(document.getElementById("current_container")).display === "flex") {
        filterItems();
    }
}, 300));

async function filterItems() {
    const searchInput = document.getElementById('searchBar');
    const searchValue = searchInput.value.toLowerCase();
    const pairs = document.querySelectorAll('.pair');

    pairs.forEach(pair => {
        const textElements = pair.querySelectorAll('p');
        const divElements = Array.from(pair.querySelectorAll('div')).filter(div => div.children.length === 0);
        const combinedText = Array.from(textElements).map(element => element.textContent.trim().toLowerCase()).concat(Array.from(divElements).map(element => element.textContent.trim().toLowerCase())).join(' ');
        const matches = combinedText.includes(searchValue);

        if (matches) {
            pair.style.display = 'grid';
            setTimeout(() => {
                pair.style.opacity = '1';
            }, 200);
        } else {
            pair.style.opacity = '0';
            pair.addEventListener("transitionend", () => {
                pair.style.display = 'none';
            }, { once: true });
        }
    });
}

document.querySelectorAll("input[name='options'] + label").forEach(input => {
    input.style.display = "none";
    setTimeout(() => {
        input.style.opacity = "0";
    }, 200)
});

document.querySelector("#related + label").addEventListener("click", () => {
    const related_checked = document.getElementById("related").checked;
    const inputs = document.querySelectorAll("input[name='options'] + label");

    if (related_checked) {
        inputs.forEach(input => {
            input.style.opacity = "0";
            input.addEventListener("transitionend", () => {
                input.style.display = "none";
            }, { once: true });
        });
    } else {
        inputs.forEach(input => {
            input.style.display = "block";
            setTimeout(() => {
                input.style.opacity = "1";
            }, 200)
        });
    }
});

document.getElementById("explore_container").addEventListener("mouseover", function(event) {
    if (event.target.classList.contains("fa-link")) {
        const position = event.target.getBoundingClientRect();
        const message = document.getElementById("message")
        message.style.display = "block";
        message.style.top = (position.top + 30) + "px";
        message.style.left = (position.left + (position.width / 2) - (message.offsetWidth / 2)) + "px";
        
        event.target.addEventListener("mouseout", () => {
            message.style.display = 'none';
        });
    }
})

document.getElementById("related").addEventListener("change", function() {
    const my_modules = Array.from(document.querySelectorAll(".strength_subject > p")).map(p => p.textContent.trim().toLowerCase().split("(")[1].replace(")", ""));
    const students = document.querySelectorAll(".student.student1");
    if (this.checked) {
        students.forEach(student => {
            let match_found = false;
            student.querySelectorAll("div:nth-of-type(2) > div").forEach(div => {
                console.log(div.textContent.trim().toLowerCase())
                if (my_modules.includes(div.textContent.trim().toLowerCase())) {
                    match_found = true;
                }
            });

            if (!match_found) {
                student.style.opacity = "0";
                student.addEventListener("transitionend", () => {
                    student.style.display = "none";
                }, { once: true });
            } else {
                student.style.display = "flex";
                setTimeout(() => {
                    student.style.opacity = "1";
                }, 200)
            }
        })
    } else {
        students.forEach(student => {
            student.style.display = "flex";
            setTimeout(() => {
                student.style.opacity = "1";
            }, 200)
        })
    }
})

document.querySelector(".user:has(.user_img)").addEventListener("click", () => {
    const section_width = document.querySelector("body > aside").offsetWidth;
    const userDetailed = document.querySelector(".user_detailed");
    
    if (userDetailed) {
        userDetailed.style.left = (section_width + 20) + "px";
        
        let transform = window.getComputedStyle(userDetailed).transform;
        let translateY = 0;
        const matrix_values = transform.match(/matrix\(([^)]+)\)/);
        if (matrix_values) {
            const values = matrix_values[1].split(',').map(Number);
            translateY = values[5];
        }

        if (translateY !== 0) {
            userDetailed.style.transform = "translateY(0)";
        } else {
            userDetailed.style.transform = "translateY(110%)";
        }
    }
});

let module_to_delete = null;

document.querySelectorAll("#weakness_content > .strength_subject > .fa-xmark").forEach(xmark => {
    const messages = ["Look who finally leveled up! Delete this weakness?", "Double-checking: Are you sure you're ready to say goodbye to this flaw?", "Deleting this weakness? Just think of the stories you’ll miss out on!", "Is it time to upgrade? Confirm to officially kick this weakness to the curb!", "Careful! Removing this weakness could make you unstoppable. Proceed?"]
    xmark.addEventListener("click", () => {
        module_to_delete = xmark.previousElementSibling.textContent;
        document.getElementById("blur").style.display = "block";
        document.querySelector(".confirmation").style.display = "flex";
        setTimeout(() => {
            document.getElementById("blur").style.opacity = "1";
            document.querySelector(".confirmation").style.opacity = "1";
            document.querySelector(".confirmation > p").textContent = messages[Math.floor(Math.random() * messages.length)];
        }, 200)
    })
})

document.querySelectorAll("#strength_content > .strength_subject > .fa-xmark").forEach(xmark => {
    const messages = ["Whoa, hold up! Removing this module means giving up your status as a guru. Are you ready to surrender your sage wisdom?", "Thinking of ditching this module? But who will teach the young grasshoppers now?", "You’re about to retire from being the wise sensei in this subject. Shall we throw you a farewell party?"]
    xmark.addEventListener("click", () => {
        module_to_delete = xmark.previousElementSibling.textContent;
        document.getElementById("blur").style.display = "block";
        document.querySelector(".confirmation").style.display = "flex";
        setTimeout(() => {
            document.getElementById("blur").style.opacity = "1";
            document.querySelector(".confirmation").style.opacity = "1";
            document.querySelector(".confirmation > p").textContent = messages[Math.floor(Math.random() * messages.length)];
        }, 200)
    })
})

document.querySelector(".confirmation button:nth-of-type(2)").addEventListener("click", () => {
    document.getElementById("blur").style.opacity = "0";
    document.getElementById("blur").addEventListener("transitionend", () => {
        document.getElementById("blur").style.display = "none";
    }, { once: true });

    document.querySelector(".confirmation").style.opacity = "0";
    document.querySelector(".confirmation").addEventListener("transitionend", () => {
        document.querySelector(".confirmation").style.display = "none";
    }, { once: true });
})

document.querySelector(".confirmation button:nth-of-type(1)").addEventListener("click", () => {
    document.getElementById("blur").style.opacity = "0";
    document.getElementById("blur").addEventListener("transitionend", () => {
        document.getElementById("blur").style.display = "none";
    }, { once: true });

    document.querySelector(".confirmation").style.opacity = "0";
    document.querySelector(".confirmation").addEventListener("transitionend", () => {
        document.querySelector(".confirmation").style.display = "none";
    }, { once: true });

    document.querySelectorAll(".strength_subject > p").forEach(p => {
        if (p.textContent.trim().toLowerCase() === module_to_delete.toLowerCase()) {
            p.parentElement.remove();
        }
    })

    module_to_delete = null;

    if (document.querySelectorAll("#weakness_content > .strength_subject").length === 0) {
        const new_p_element = document.createElement("p");
        new_p_element.textContent = "No wishlist. Add one!";
        document.getElementById("weakness_content").appendChild(new_p_element);
    }

    if (document.querySelectorAll("#strength_content > .strength_subject").length === 0) {
        const new_p_element = document.createElement("p");
        new_p_element.textContent = "Not mentoring anyone?";
        document.getElementById("weakness_content").appendChild(new_p_element);
    }
})

document.querySelector("#add_module > .fa-xmark").addEventListener("click", () => {
    document.querySelector("#add_module").style.opacity = "0";
    document.getElementById("blur").style.opacity = "0";

    document.querySelector("#add_module").addEventListener("transitionend", () => {
        document.querySelector("#add_module").style.display = "none";
        document.getElementById("blur").style.display = "none";
    }, { once: true });
})

document.querySelectorAll(".strength .fa-plus").forEach(plus => {
    plus.addEventListener("click", () => {
        document.querySelector("#add_module").style.display = "flex";
        document.querySelector("#add_module > form > select:nth-of-type(2)").style.border = "1px solid black";
        document.getElementById("blur").style.display = "block";
        if (document.querySelector("#add_module > form > p")) {
            document.querySelector("#add_module > form > p").remove();
        }

        document.querySelector("#add_module > form > select:nth-of-type(2)").value = "NIL";
        const click_from_module = event.target.nextElementSibling.id.split("_")[0];
        document.getElementById("type").value = click_from_module;

        setTimeout(() => {
            document.querySelector("#add_module").style.opacity = "1";
            document.getElementById("blur").style.opacity = "1";
        }, 200)
    })
})

document.querySelector("#add_module form").addEventListener("submit", (event) => {
    function show_element(text) {
        if (document.querySelector("#add_module > form > p")) {
            document.querySelector("#add_module > form > p").textContent = text;
        } else {
            const form = document.querySelector("#add_module > form");
            const message = document.createElement("p");
            message.textContent = text;
            message.style.color = "red";
            document.getElementById("module_selection").style.border = "1px solid red";
    
            form.insertBefore(message, document.querySelector("#add_module button"));
    
            document.getElementById("module_selection").addEventListener("change", () => {
                document.getElementById("module_selection").style.border = "1px solid black";
                message.remove();
            })
        }
    }

    event.preventDefault();
    const form = document.querySelector("#add_module > form");
    if (!form.checkValidity() || document.querySelector("#add_module > form > select:nth-of-type(2)").value.toLowerCase() === "nil") {
        show_element("Please select a valid option");
    } else {
        const module_name_to_add = modules_full[modules.indexOf(document.getElementById("module_selection").value)]
        const parent = document.getElementById("type").value.toLowerCase() === "weakness" ? "weakness" : "strength";
        if (Array.from(document.querySelectorAll('.strength_subject > p')).map(item => item.textContent).includes(`${module_name_to_add} (${document.getElementById("module_selection").value})`)) {
            show_element("Module already exists");
        } else {
            const new_p_element = document.createElement("p");
            let html_string = `
                <div class="strength_subject">
                    <i class="fa-solid fa-circle"></i>
                    <p>${module_name_to_add} (${document.getElementById("module_selection").value})</p>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            `;

            document.getElementById(`${parent}_content`).insertAdjacentHTML('beforeend', html_string);
        }
    }
})

async function createTimeElements() {
    for (let hour = 8; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            // Use `await` to make the loop non-blocking
            await new Promise(resolve => setTimeout(resolve, 0)); 
    
            // Format hours and minutes
            let formattedHour = hour.toString().padStart(2, '0');
            let formattedMinute = minute.toString().padStart(2, '0');
            let time = `${formattedHour}${formattedMinute}`;
    
            // Create and append the time element to the body
            let timeElement = document.createElement("div");
            timeElement.textContent = time;
            document.querySelector(".schedule_timings").appendChild(timeElement);
        }
    }
}
  
createTimeElements();

async function createDivs() {
    const parentDivs = document.querySelectorAll("#schedule_container > div:not(.schedule_timings):not(.event):not(#timeline)");

    // Array of days
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    parentDivs.forEach((parentDiv, index) => {
        for (let i = 0; i < 31; i++) {
            const newDiv = document.createElement("div");
            
            // If it's the first div, set the day as the text content
            if (i === 0) {
                newDiv.textContent = days[index % days.length];
                newDiv.classList.add("day_header"); // Optional class for styling day header
            }
            
            // Append the new div to the current parent div
            parentDiv.appendChild(newDiv);
        }
    });
}

createDivs();

// Function to update event styles
function updateEventStyles() {
    document.querySelectorAll(".event").forEach((event, index) => {
        // Generate a random light color
        const r = Math.floor(Math.random() * 56) + 200;  // Range: 200-255
        const g = Math.floor(Math.random() * 56) + 200;  // Range: 200-255
        const b = Math.floor(Math.random() * 56) + 200;  // Range: 200-255
        
        // Set the background color
        event.style.background = `rgb(${r}, ${g}, ${b})`;

        let day, time_start, duration;

        if (index === 0) {
            day = 0; // 0 = Monday
            time_start = 23; // 1 = 0000
            duration = 4; // 1 = 30 minutes
        } else if (index === 1) {
            day = 4; // 0 = Monday
            time_start = 12; // 1 = 0000
            duration = 3; // 1 = 30 minutes
        } else {
            day = 3; // 0 = Monday
            time_start = 18; // 1 = 0000
            duration = 5; // 1 = 30 minutes
        }
        
        const rect = document.querySelector(".schedule_day > div").getBoundingClientRect();
        const rect1 = document.querySelector(".schedule_day").getBoundingClientRect();
        const schedule_rect = document.querySelector(".schedule_timings").getBoundingClientRect();
        event.style.width = `${rect1.width}px`;
        event.style.height = `${(rect.height + rect.height / 2 - 10) * duration}px`;
        event.style.top = `${(rect.height + 5) * time_start + rect.height / 2}px`;
        event.style.left = `${schedule_rect.width + rect1.width * day}px`;
    });
}

window.addEventListener("resize", () => {
    updateEventStyles();

    const duration = 3000;
    const interval = 100;
    let timePassed = 0;

    const intervalId = setInterval(() => {
        if (timePassed < duration) {
            updateEventStyles();
            timePassed += interval;
        } else {
            clearInterval(intervalId);
        }
    }, interval);

});

function updateTimelinePosition() {
    const start = new Date();
    start.setHours(8, 0, 0);
    const now = new Date();
    const rect = document.querySelector(".schedule_day > div:nth-of-type(2)").getBoundingClientRect();
    const difference = now - start;
    const differenceInMinutes = Math.floor(difference / 60000);
    const timeLinePositionReminder = (differenceInMinutes / 30) % Math.floor(differenceInMinutes / 30);
    const timeLinePositionReminderpx = rect.height * timeLinePositionReminder;
    const timeLine = document.getElementById('timeline');
    timeLine.style.top = `${(rect.height +5) * (Math.floor(differenceInMinutes / 30)) + timeLinePositionReminderpx + rect.height + rect.height / 2 + 5}px`; // Set the top position of the timeline
}

setInterval(updateTimelinePosition, 1000);
updateTimelinePosition();
  

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//     });
// }

window.addEventListener("offline", () => {
    if (!navigator.onLine) {
        document.querySelector(".issues > div:nth-of-type(1)").style.display = "flex";
        document.querySelector(".issues > div:nth-of-type(1)").classList.add("flashAnimation");
    }
})

window.addEventListener("online", () => {
    if (navigator.onLine) {
        document.querySelector(".issues > div:nth-of-type(1)").style.display = "none";
        document.querySelector(".issues > div:nth-of-type(1)").classList.remove("flashAnimation");
    }
})

document.querySelector(".issues > noscript").style.display = "none";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = Array.from({length: 30}, (_, i) => {
    const hour = String(Math.floor(i / 2) + 8).padStart(2, '0');
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
});

function createScheduleGrid() {
    const scheduleGrid = document.getElementById('schedule_table');
    const headerCell = document.createElement('div');
    
    headerCell.textContent = '';
    headerCell.className = 'grid_header';
    scheduleGrid.appendChild(headerCell);

    daysOfWeek.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        dayCell.className = 'grid_header';
        scheduleGrid.appendChild(dayCell);
    });

    timeSlots.forEach(time => {
        const timeCell = document.createElement('time');
        
        timeCell.textContent = time;
        timeCell.className = 'grid_time';
        scheduleGrid.appendChild(timeCell);
        daysOfWeek.forEach(day => {
            const checkboxCell = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${day}-${time}`;
            checkboxCell.appendChild(checkbox);
            scheduleGrid.appendChild(checkboxCell);
        });
    });
}

function saveOptions() {
    const states = {};
    document.querySelectorAll("#schedule_table input[type='checkbox']").forEach((checkbox) => {
        states[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem("checkboxStates", JSON.stringify(states));
}

function loadOptions() {
    const savedStates = JSON.parse(localStorage.getItem("checkboxStates")) || {};
    document.querySelectorAll("#schedule_table input[type='checkbox']").forEach((checkbox) => {
        checkbox.checked = savedStates[checkbox.id] || false;
    });
}

createScheduleGrid();
loadOptions();

document.querySelector("#schedule_table").addEventListener("input", function(event) {
    if (event.target.tagName.toLowerCase() === "input") {
        saveOptions();
    }
});

document.querySelector(".user_availability .fa-xmark").addEventListener("click", () => {
    document.querySelector(".user_availability").style.opacity = "0";
    document.getElementById("blur").style.opacity = "0";
    document.querySelector(".user_availability").addEventListener("transitionend", () => {
        document.querySelector(".user_availability").style.display = "none";
        document.getElementById("blur").style.display = "none";
    }, { once: true });
})

document.querySelector("#user button:nth-of-type(1)").addEventListener("click", () => {
    document.getElementById("blur").style.display = "block";
    document.querySelector(".user_availability").style.display = "flex";
    setTimeout(() => {
        document.getElementById("blur").style.opacity = "1";
        document.querySelector(".user_availability").style.opacity = "1";
    }, 200)
})

// The following code are only the purposes of this assignment.
// In a practical application, these should not exist.

function duplicate_elements(template, container) {
    let count = 0;
    let total_iterations = Number(names.length);

    function get_modules() {
        const modules1 = [...modules];
        const shuffledModules = modules1.sort(() => Math.random() - 0.5);
        const strengthsCount = Math.floor(Math.random() * 4);
        const weaknessesCount = 3 - strengthsCount;
        const selectedModules = shuffledModules.slice(0, strengthsCount + weaknessesCount);
        const selectedStrengths = selectedModules.slice(0, strengthsCount);
        const selectedWeaknesses = selectedModules.slice(strengthsCount, strengthsCount + weaknessesCount);
    
        return {
            strengths: selectedStrengths,
            weaknesses: selectedWeaknesses
        };
    }

    function appendChunk() {
        if (count < total_iterations) {
            const clonedNode = template.content.cloneNode(true);
            const name = clonedNode.querySelector('p:nth-of-type(1)');
            const email = clonedNode.querySelector('p:nth-of-type(2)');
            const diploma = clonedNode.querySelector('p:nth-of-type(3)');
            const modules = clonedNode.querySelector('div:nth-of-type(2)');
            const diploma_index = Math.floor(Math.random() * 6);
            if (name) {
                name.textContent = names[count % names.length];
            }
            if (email) {
                email.textContent = name.textContent.replace(" ", "_") + "@student.tp.edu.sg";
            }
            if (diploma) {
                diploma.textContent = diplomas[diploma_index];
            }
            if (modules) {
                let results = get_modules();
                results.strengths.forEach(strength => {
                    const module = document.createElement("div");
                    module.classList.add("student_strength");
                    module.textContent = strength;
                    modules.insertBefore(module, modules.querySelector(".fa-link"));
                });

                results.weaknesses.forEach(weakness => {
                    const module = document.createElement("div");
                    module.classList.add("student_weakness");
                    module.textContent = weakness;
                    modules.insertBefore(module, modules.querySelector(".fa-link"));
                });
            }
            container.appendChild(clonedNode);
            count++;
            setTimeout(appendChunk, 0);
        }
    }

    appendChunk();
}

duplicate_elements(document.getElementById("popular_template"), document.getElementById("explore_container"));