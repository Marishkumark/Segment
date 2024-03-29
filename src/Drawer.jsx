import React, { useState } from "react";
import DropDown from "./DropDown";
import { RiArrowDropLeftLine } from "react-icons/ri";

const segmentOpt = [
  {
    label: "First Name",
    value: "first_name",
  },
  {
    label: "Last Name",
    value: "last_name",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Account Name",
    value: "account_name",
  },
  {
    label: "City",
    value: "city",
  },
  {
    label: "State",
    value: "state",
  },
];

const Drawer = ({ show, onClick }) => {
  const [segmentOptions, setSegmentsOpt] = useState(segmentOpt);
  const [showAllSegment, setShowAllSegment] = useState(false);
  const [otherSegments, setOtherSegments] = useState([]);
  const [segmentName, setSehmentName] = useState("");

  const addSegment = (e) => {
    if (e.target.value === "") return;
    const newSegementOpt = segmentOptions.filter(
      (opt) => opt.value !== e.target.value
    );
    const selectedOpt = segmentOptions.filter(
      (opt) => opt.value === e.target.value
    );
    setSegmentsOpt(newSegementOpt);
    const arr = [...otherSegments];
    arr.push(selectedOpt);
    setOtherSegments(arr);
  };

  const removeSegment = (segment) => {
    if (segment === "") {
      setSegmentsOpt(segmentOpt);
      setOtherSegments([]);
      setShowAllSegment(false);
    } else {
      const removedSegment = otherSegments.filter(
        (opt) => opt[0].value !== segment
      );
      setOtherSegments(removedSegment);
      const resetSegmentOpt = segmentOpt.filter((opt) => opt.value === segment);
      const arr = [...segmentOptions];
      arr.push(resetSegmentOpt[0]);
      setSegmentsOpt(arr);
    }
  };

  const sendJsonBody = () => {
    if (segmentName === "") return;
    const schemaArr = [];
    otherSegments.forEach((arr) => {
      schemaArr.push(arr[0]);
    });
    const body = {
      segment_name: segmentName.split(" ").join("_").toLowerCase(),
      schema: schemaArr,
    };
    fetch("https://webhook.site/0510b48c-648c-4aa2-852c-c63f744c388d", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        // console.log(res);
        alert("Data sent successfully");
        onClick();
        setSehmentName("");
        setSegmentsOpt(segmentOpt);
        setOtherSegments([]);
        setShowAllSegment(false);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  return (
    <div
      className={`min-h-screen bg-white fixed top-0 right-0 w-[90%] md:w-[30%] z-[200] shadow-xl ease-out duration-300 ${
        show ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <div className="h-24 bg-main">
        <p className="flex items-center h-full pl-5 text-xl font-medium text-white">
          <span className="mr-[0.1rem] text-5xl">
            <RiArrowDropLeftLine />
          </span>
          Saving Segment
        </p>
      </div>
      <div className="px-5">
        <div className="mb-4">
          <h4 className="text-l mt-10">Enter the Name of the Segment</h4>
          <input
            value={segmentName}
            onChange={(e) => setSehmentName(e.target.value)}
            type="text"
            placeholder="Name of the segment"
            className="border border-gray-400 p-3 w-[90%] my-3"
          />
        </div>
        <div className="mb-4">
          <h4 className="text-l w-[90%]">
            To save your segment, you need to add the schemas to build the query
          </h4>
        </div>
        <div className="flex justify-end space-x-3 w-[90%]">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-green-600 rounded-full" />
            <p className="text-sm font-semibold text-black">- User Traits</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-red-600 rounded-full" />
            <p className="text-sm font-semibold text-black">- Group Traits</p>
          </div>
        </div>
        <div className="h-[500px] my-3 overflow-y-scroll">
          {showAllSegment && (
            <div>
              {otherSegments &&
                otherSegments.map((segment, index) => (
                  <DropDown
                    options={segment}
                    key={index}
                    removeSegment={removeSegment}
                  />
                ))}
              <DropDown
                segment
                options={segmentOptions}
                addSegment={addSegment}
                removeSegment={removeSegment}
              />
            </div>
          )}
          <button
            onClick={() => setShowAllSegment(true)}
            className="font-semibold text-green-600 underline"
          >
            + Add new schema
          </button>
        </div>
      </div>
      <footer className="fixed bottom-0 w-full h-24 bg-gray-100 -mb-32">
        <div className="flex items-center h-full">
          <button
            onClick={sendJsonBody}
            className="p-2 mx-3 font-semibold text-white bg-green-500 rounded hover:shadow-md"
          >
            Save the segment
          </button>
          <button
            onClick={() => {
              onClick();
              setSegmentsOpt(segmentOpt);
              setOtherSegments([]);
              setShowAllSegment(false);
              setSehmentName("");
            }}
            className="p-2 font-semibold text-red-600 bg-white rounded hover:shadow-md"
          >
            Cancel
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Drawer;
