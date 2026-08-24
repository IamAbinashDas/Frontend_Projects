
    const input = document.getElementById("dateInput");
    const daysContainer = document.getElementById("days");
    const monthLabel = document.getElementById("monthLabel");
    const calendar = document.getElementById("calendar");

    let currentDate = new Date(2022, 11, 1);
    let selectedDate = null;

    function renderCalendar() {
      daysContainer.innerHTML = "";

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      monthLabel.textContent = currentDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric"
      });

      const firstDay = new Date(year, month, 1).getDay();
      const totalDays = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "empty";
        daysContainer.appendChild(empty);
      }

      for (let day = 1; day <= totalDays; day++) {
        const button = document.createElement("button");
        button.textContent = day;

        if (
          selectedDate &&
          selectedDate.year === year &&
          selectedDate.month === month &&
          selectedDate.day === day
        ) {
          button.classList.add("selected");
        }

        button.addEventListener("click", () => {
          selectedDate = { year, month, day };

          const dd = String(day).padStart(2, "0");
          const mm = String(month + 1).padStart(2, "0");

          input.value = `${dd} / ${mm} / ${year}`;
          renderCalendar();
        });

        daysContainer.appendChild(button);
      }
    }

    document.getElementById("prevMonth").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    document.getElementById("calendarButton").addEventListener("click", () => {
      calendar.hidden = !calendar.hidden;
    });

    input.addEventListener("focus", () => {
      calendar.hidden = false;
    });

    renderCalendar();