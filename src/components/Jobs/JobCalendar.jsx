import { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import { JobsContext } from '../../contexts/JobsContext';
import { ShipsContext } from '../../contexts/ShipsContext';
import '../../styles/main.css';

const JobCalendar = () => {
  const { jobs } = useContext(JobsContext);
  const { ships } = useContext(ShipsContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const jobsOnDate = jobs.filter(job => {
    return new Date(job.scheduledDate).toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="job-calendar">
      <h2>Maintenance Calendar</h2>
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date }) => {
            const hasJobs = jobs.some(
              job => new Date(job.scheduledDate).toDateString() === date.toDateString()
            );
            return hasJobs ? <div className="job-marker">•</div> : null;
          }}
        />
        <div className="jobs-on-date">
          <h3>Jobs on {selectedDate.toDateString()}</h3>
          {jobsOnDate.length > 0 ? (
            <ul>
              {jobsOnDate.map(job => (
                <li key={job.id}>
                  {ships.find(s => s.id === job.shipId)?.name} - {job.type} ({job.status})
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCalendar;