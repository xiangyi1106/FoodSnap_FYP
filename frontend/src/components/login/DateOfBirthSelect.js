export default function DateOfBirthSelect({ selectDay, setSelectDay, setSelectMonth, setSelectYear, selectMonth, selectYear, days, months, years, dateError }) {
    return (
        <div>
            <div className="reg_grid mb-2">
                <select name="bDay" value={selectDay}
                    onChange={(e) => {
                        setSelectDay(e.target.value); // Update the local state
                    }}>
                    {days.map((day, i) => (
                        <option value={day} key={i}>{day}</option>
                    ))}
                </select>

                <select name="bMonth" value={selectMonth}
                    onChange={(e) => {
                        setSelectMonth(e.target.value); // Update the local state
                    }}>
                    {months.map((month, i) => (
                        <option value={month} key={i}>{month}</option>
                    ))}
                </select>
                <select name="bYear" value={selectYear}
                    onChange={(e) => {
                        setSelectYear(e.target.value); // Update the local state
                    }}>
                    {years.map((year, i) => (
                        <option value={year} key={i}>{year}</option>
                    ))}

                </select>

            </div>
            {dateError !== "" && <div className="input_error">{dateError}</div>}
        </div>
    );
}
