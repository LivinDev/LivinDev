import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "../styles/reservation.scss";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  period: "AM" | "PM";
  guests: string;
  location: string;
  specialRequests: string;
}

const locations: string[] = [
  "Downtown",
  "Uptown",
  "Riverside",
  "Beachfront",
  "Suburbs",
];

const TimeInput: React.FC<{
  value: string;
  period: "AM" | "PM";
  onChange: (time: string, period: "AM" | "PM") => void;
}> = ({ value, period, onChange }) => {
  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, period);
  };

  const togglePeriod = () => {
    onChange(value, period === "AM" ? "PM" : "AM");
  };

  return (
    <div className="time-input">
      <input type="time" value={value} onChange={handleTimeChange} />
      <button type="button" onClick={togglePeriod} className="period-toggle">
        {period}
      </button>
    </div>
  );
};

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    period: "AM",
    guests: "",
    location: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.guests) newErrors.guests = "Number of guests is required";
    if (!formData.location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (time: string, period: "AM" | "PM") => {
    setFormData((prev) => ({ ...prev, time, period }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted with data:", formData);
      // Here you would typically send the data to a server
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form" noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="1234567890"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            max="20"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Number of guests"
          />
          {errors.guests && <span className="error">{errors.guests}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <TimeInput
            value={formData.time}
            period={formData.period}
            onChange={handleTimeChange}
          />
          {errors.time && <span className="error">{errors.time}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        {errors.location && <span className="error">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any special requests or dietary requirements?"
        ></textarea>
      </div>

      <button type="submit" className="submit-btn">
        Make Reservation
      </button>
    </form>
  );
};

export default ReservationForm;
