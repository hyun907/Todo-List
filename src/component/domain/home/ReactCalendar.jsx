import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";
import moment from "moment";

function ReactCalendar({ onDateSelect }) {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)
  const activeDate = moment(value).format("YYYY-MM-DD"); // 클릭한 날짜 (년-월-일))
  const monthOfActiveDate = moment(value).format("YYYY-MM");
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  const getActiveMonth = (activeStartDate) => {
    const newActiveMonth = moment(activeStartDate).format("YYYY-MM");
    setActiveMonth(newActiveMonth);
  };

  const handleDateChange = (newValue) => {
    onChange(newValue);

    // 날짜 선택 시 부모 컴포넌트에 알림
    if (onDateSelect) {
      const month = moment(newValue).format("M"); // 월 (1-12)
      const day = moment(newValue).format("D"); // 일 (1-31)
      onDateSelect(month, day);
    }
  };

  return (
    <div>
      <Calendar
        locale="en"
        onChange={handleDateChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format("D")}
        showNeighboringMonth={false}
        onActiveStartDateChange={({ activeStartDate }) =>
          getActiveMonth(activeStartDate)
        }
      />
    </div>
  );
}

export default ReactCalendar;
