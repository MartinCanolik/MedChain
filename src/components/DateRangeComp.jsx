import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import React from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import es from "date-fns/locale/es";
import "./DateRange.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeComp = ({ setStay }) => {
	// date state

	const [range, setRange] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: "selection",
		},
	]);
	console.log(range);

	const calendar = useCallback(() => {
		setStay(range);
	}, [range, setStay]);

	useMemo(() => {
		calendar();
	}, [calendar]);

	// const unavailableDate = [
	// 	addDays(new Date(), 8),
	// 	addDays(new Date(), 9),
	// 	addDays(new Date(), 10),
	// ];

	// open close
	const [open, setOpen] = useState(false);

	// get the target element to toggle
	const refOne = useRef(null);

	useEffect(() => {
		// event listeners
		document.addEventListener("keydown", hideOnEscape, true);
		document.addEventListener("click", hideOnClickOutside, true);
	}, []);

	// hide dropdown on ESC press
	const hideOnEscape = (e) => {
		// console.log(e.key)
		if (e.key === "Escape") {
			setOpen(false);
		}
	};

	// Hide on outside click
	const hideOnClickOutside = (e) => {
		// console.log(refOne.current)
		// console.log(refOne.current);
		if (refOne.current && !refOne.current.contains(e.target)) {
			setOpen(false);
		}
	};
	console.log(open);

	return (
		<div className='relative' ref={refOne}>
			<input
				className=' cursor-pointer appearance-none text-sm mt-2 py-2 px-auto w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
				value={[]}
				placeholder={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
					range[0].endDate,
					"dd/MM/yyyy"
				)}`}
				readOnly
				type='text'
				onClick={() => setOpen(!open)}
				ref={refOne}
			/>

			<div>
				{open && (
					<DateRange
						onChange={(item) => setRange([item.selection])}
						editableDateInputs={true}
						moveRangeOnFirstSelection={false}
						ranges={range}
						months={1}
						minDate={new Date()}
						direction='horizontal'
						className='calendarElement'
						color='#06b6d4'
						disabledDates={[]}
						locale={es}
					/>
				)}
			</div>
		</div>
	);
};

export default DateRangeComp;
