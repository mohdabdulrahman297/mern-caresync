import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality, doctors]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div>
      <p className="text-gray-600">Browse through the doctor specialists.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter Sidebar */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <button
            className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
              showFilter ? "bg-emerald-400 text-white" : ""
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>

          <div
            className={`flex-col gap-4 text-sm text-gray-600 ${
              showFilter ? "flex" : "hidden sm:flex"
            }`}
          >
            {specialities.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  speciality === item
                    ? navigate("/doctors")
                    : navigate(`/doctors/${item}`)
                }
                className={`w-[94vw] sm:w-auto text-left pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                  speciality === item ? "bg-emerald-100 text-black" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full flex flex-wrap gap-4 justify-center sm:justify-start">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[250px]"
              key={index}
            >
              <img
                className="bg-blue-50 w-full h-[180px] object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
